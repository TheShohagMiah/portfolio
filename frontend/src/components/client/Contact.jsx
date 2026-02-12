import React from "react";
import { motion } from "framer-motion";
import {
  FiMail,
  FiMapPin,
  FiPhone,
  FiSend,
  FiMessageSquare,
} from "react-icons/fi";

const Contact = () => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const contactItems = [
    {
      icon: <FiMail />,
      label: "Email",
      value: "your.email@example.com",
      href: "mailto:your.email@example.com",
    },
    {
      icon: <FiPhone />,
      label: "Phone",
      value: "+357 00 000 000",
      href: "tel:+35700000000",
    },
    {
      icon: <FiMapPin />,
      label: "Location",
      value: "Nicosia, Cyprus",
      href: "#",
    },
  ];

  return (
    <section
      id="contact"
      className="py-24 bg-background relative overflow-hidden"
    >
      {/* Decorative background element */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -z-10"
      />

      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[2px] w-12 bg-primary"></span>
              <span className="text-primary font-bold uppercase tracking-widest text-xs">
                Get In Touch
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Let's start a{" "}
              <span className="text-muted-foreground italic font-serif">
                conversation.
              </span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Contact Form */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-7 bg-card border border-border p-8 md:p-12 rounded-[2.5rem] shadow-sm"
            >
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full bg-secondary/30 border border-border focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none rounded-2xl px-6 py-4 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full bg-secondary/30 border border-border focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none rounded-2xl px-6 py-4 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="Project Inquiry"
                    className="w-full bg-secondary/30 border border-border focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none rounded-2xl px-6 py-4 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">
                    Message
                  </label>
                  <textarea
                    rows="5"
                    placeholder="Tell me about your project..."
                    className="w-full bg-secondary/30 border border-border focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none rounded-2xl px-6 py-4 transition-all resize-none"
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="group w-full md:w-auto flex items-center justify-center gap-3 bg-primary text-primary-foreground px-10 py-4 rounded-2xl font-bold hover:opacity-90 shadow-lg shadow-primary/20 transition-all"
                >
                  Send Message
                  <FiSend className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </motion.button>
              </form>
            </motion.div>

            {/* Right Column: Contact Info */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-5 space-y-8 lg:pl-8"
            >
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Contact Information</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Have a specific inquiry or just want to say hi? Fill out the
                  form or reach out via the channels below.
                </p>
              </div>

              <div className="space-y-4">
                {contactItems.map((item, i) => (
                  <motion.a
                    key={i}
                    variants={itemVariants}
                    href={item.href}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-5 p-6 rounded-[2rem] border border-border bg-secondary/20 hover:border-primary/30 hover:bg-secondary/40 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                        {item.label}
                      </p>
                      <p className="font-semibold">{item.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Instant Chat Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="p-8 rounded-[2rem] bg-foreground text-background"
              >
                <div className="flex items-center gap-4 mb-4">
                  <FiMessageSquare className="text-2xl" />
                  <h4 className="font-bold">Instant Connect</h4>
                </div>
                <p className="text-sm opacity-80 mb-6 italic">
                  "Prefer a quicker chat? I'm usually active on LinkedIn during
                  business hours."
                </p>
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="#"
                  className="block text-center py-3 rounded-xl bg-background text-foreground font-bold text-sm"
                >
                  Message on LinkedIn
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
