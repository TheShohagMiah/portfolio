import { sendEmail } from "../config/mailer.js";
import Contact from "../models/contact/contactModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// ─── @desc    Send Contact Message
// ─── @route   POST /api/contact
// ─── @access  Public
export const sentMessage = asyncHandler(async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  const newContact = await Contact.create({
    name,
    email,
    phone: phone || null,
    subject,
    message,
    ipAddress: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
  });

  if (!newContact) {
    res.status(500);
    throw new Error("Failed to save your message. Please try again.");
  }

  await sendEmail(
    process.env.SMTP_USER_EMAIL,
    `📬 New Message: ${subject}`,
    `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 24px;">
      <h2 style="color: #4f46e5;">📬 New Contact Form Submission</h2>
      <hr style="border: none; border-top: 1px solid #e0e0e0;" />
      <p><strong>👤 Name:</strong> ${name}</p>
      <p><strong>📧 Email:</strong> ${email}</p>
      <p><strong>📞 Phone:</strong> ${phone || "N/A"}</p>
      <p><strong>📝 Subject:</strong> ${subject}</p>
      <p><strong>💬 Message:</strong></p>
      <div style="background: #f4f4f4; padding: 12px; border-radius: 6px; color: #333;">
        ${message}
      </div>
      <hr style="border: none; border-top: 1px solid #e0e0e0; margin-top: 24px;" />
      <p style="font-size: 12px; color: #999;">Received on: ${new Date().toLocaleString()}</p>
    </div>
    `,
  );

  await sendEmail(
    email,
    `✅ Thanks for reaching out, ${name}!`,
    `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 24px;">
      <h2 style="color: #4f46e5;">Hi ${name}, Thanks for contacting me! 👋</h2>
      <p style="color: #555;">I've received your message and will get back to you as soon as possible.</p>
      <hr style="border: none; border-top: 1px solid #e0e0e0;" />
      <p><strong>Your Message:</strong></p>
      <div style="background: #f4f4f4; padding: 12px; border-radius: 6px; color: #333;">${message}</div>
      <hr style="border: none; border-top: 1px solid #e0e0e0; margin-top: 24px;" />
      <p style="color: #999; font-size: 12px;">If you did not submit this form, please ignore this email.</p>
      <p style="margin-top: 16px;">Best regards,<br/><strong>Your Name</strong></p>
    </div>
    `,
  );

  res.status(201).json({
    success: true,
    message: "Your message has been sent successfully!",
    data: {
      id: newContact._id,
      name: newContact.name,
      email: newContact.email,
      subject: newContact.subject,
      createdAt: newContact.createdAt,
    },
  });
});

// ─── @desc    Get All Messages
// ─── @route   GET /api/contact
// ─── @access  Private (Admin)
export const getMessages = asyncHandler(async (req, res) => {
  const messages = await Contact.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    total: messages.length,
    data: messages,
  });
});

// ─── @desc    Get Single Message
// ─── @route   GET /api/contact/:id
// ─── @access  Private (Admin)
export const getMessage = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Message not found.");
  }

  // Mark as read when admin opens it
  if (!contact.isRead) {
    await contact.markRead();
  }

  res.status(200).json({
    success: true,
    data: contact,
  });
});

// ─── @desc    Reply to a Message
// ─── @route   POST /api/contact/reply/:id
// ─── @access  Private (Admin)
export const replyMessage = asyncHandler(async (req, res) => {
  const { replyMessage } = req.body;

  // ── 1. Validate reply text ────────────────────────────────────────────────
  if (!replyMessage || replyMessage.trim().length < 5) {
    res.status(400);
    throw new Error("Reply message must be at least 5 characters.");
  }

  // ── 2. Find the original message ─────────────────────────────────────────
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Message not found.");
  }

  // ── 3. Check if already replied ──────────────────────────────────────────
  if (contact.isReplied) {
    res.status(400);
    throw new Error("You have already replied to this message.");
  }

  // ── 4. Send Reply Email to User ───────────────────────────────────────────
  await sendEmail(
    contact.email,
    `Re: ${contact.subject}`,
    `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 24px;">
      
      <h2 style="color: #4f46e5;">Hi ${contact.name}! 👋</h2>
      <p style="color: #555; font-size: 15px;">
        Thank you for reaching out. Here is my response to your message:
      </p>

      <hr style="border: none; border-top: 1px solid #e0e0e0;" />

      <p><strong>📝 Reply:</strong></p>
      <div style="background: #f0f4ff; padding: 14px; border-radius: 6px; color: #333; font-size: 15px; line-height: 1.6;">
        ${replyMessage}
      </div>

      <hr style="border: none; border-top: 1px solid #e0e0e0; margin-top: 24px;" />

      <p><strong>📌 Your Original Message:</strong></p>
      <div style="background: #f4f4f4; padding: 12px; border-radius: 6px; color: #888; font-size: 13px;">
        <p><strong>Subject:</strong> ${contact.subject}</p>
        <p>${contact.message}</p>
      </div>

      <hr style="border: none; border-top: 1px solid #e0e0e0; margin-top: 24px;" />

      <p style="margin-top: 16px; color: #333;">
        Best regards,<br/>
        <strong>Shohag Miah</strong>
      </p>

      <p style="font-size: 11px; color: #bbb; margin-top: 16px;">
        This is a reply to your contact form submission on ${new Date(contact.createdAt).toLocaleString()}.
      </p>
    </div>
    `,
  );

  // ── 5. Update Message in DB using instance method ─────────────────────────
  await contact.markReplied(replyMessage);

  // ── 6. Success Response ───────────────────────────────────────────────────
  res.status(200).json({
    success: true,
    message: `Reply sent successfully to ${contact.email}`,
    data: {
      id: contact._id,
      name: contact.name,
      email: contact.email,
      subject: contact.subject,
      reply: contact.reply,
      replyDate: contact.replyDate,
    },
  });
});

// ─── @desc    Delete a Message
// ─── @route   DELETE /api/contact/:id
// ─── @access  Private (Admin)
export const deleteMessage = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Message not found.");
  }

  await contact.deleteOne();

  res.status(200).json({
    success: true,
    message: "Message deleted successfully.",
    data: { id: req.params.id },
  });
});
