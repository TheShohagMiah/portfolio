import SocialLink from "../models/socialLinks/SocialLinModel.js";

// ✅ GET — সব active social links (Public)
export const getAllSocialLinks = async (req, res) => {
  try {
    const links = await SocialLink.find({ isActive: true })
      .sort({ order: 1 }) // order অনুযায়ী সাজাও
      .select("-__v"); // __v field বাদ দাও

    res.status(200).json({
      success: true,
      count: links.length,
      data: links,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ POST — নতুন social link তৈরি (Admin only)
export const createSocialLink = async (req, res) => {
  try {
    const link = await SocialLink.create(req.body);
    res.status(201).json({ success: true, data: link });
  } catch (error) {
    // Duplicate platform check
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "This platform already exists",
      });
    }
    res.status(400).json({ success: false, message: error.message });
  }
};

// ✅ PUT — Update (Admin only)
export const updateSocialLink = async (req, res) => {
  try {
    const link = await SocialLink.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!link) {
      return res
        .status(404)
        .json({ success: false, message: "Link not found" });
    }
    res.status(200).json({ success: true, data: link });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ✅ DELETE — মুছে ফেলো (Admin only)
export const deleteSocialLink = async (req, res) => {
  try {
    const link = await SocialLink.findByIdAndDelete(req.params.id);
    if (!link) {
      return res
        .status(404)
        .json({ success: false, message: "Link not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Link deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ PATCH — Toggle active/inactive (Admin only)
export const toggleSocialLink = async (req, res) => {
  try {
    const link = await SocialLink.findById(req.params.id);
    if (!link) {
      return res
        .status(404)
        .json({ success: false, message: "Link not found" });
    }
    link.isActive = !link.isActive;
    await link.save();
    res.status(200).json({ success: true, data: link });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
