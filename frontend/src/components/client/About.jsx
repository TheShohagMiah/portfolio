import React from "react";
import { motion } from "framer-motion";
import { FiAward, FiBookOpen, FiUser, FiZap } from "react-icons/fi";

const About = () => {
  const academicTimeline = [
    {
      year: "2025 — Present",
      title: "Bachelor's Degree",
      subtitle: "Computing & Information Technology",
      institution: "Philips University, Cyprus",
      description:
        "Specializing in software architecture and distributed systems.",
      icon: <FiBookOpen />,
    },
    {
      year: "2016 — 2020",
      title: "Diploma in Engineering",
      subtitle: "Electronics Technology",
      institution: "Shariatpur Polytechnic Institute",
      description:
        "Foundation in hardware-software integration and logic design.",
      icon: <FiAward />,
    },
  ];

  // Animation Variants
  const fadeInRight = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const timelineItem = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="about" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[2px] w-12 bg-primary"></span>
              <span className="text-primary font-bold uppercase tracking-widest text-xs">
                Background
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Design. Code.{" "}
              <span className="text-muted-foreground italic font-serif">
                Iterate.
              </span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-16">
            {/* Left Column: Biography */}
            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="lg:col-span-7 space-y-10"
            >
              <div className="space-y-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border text-sm font-medium w-fit"
                >
                  <FiUser className="text-primary" />
                  <span>My Story</span>
                </motion.div>

                <h3 className="text-3xl font-bold leading-tight">
                  Bridging the gap between <br />
                  <span className="text-primary">complex logic</span> and user
                  experience.
                </h3>

                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    I am a full-stack developer with{" "}
                    <strong className="text-foreground">
                      3.5 years of industry experience
                    </strong>
                    , currently refining my expertise at{" "}
                    <strong className="text-foreground">
                      Philips University, Cyprus
                    </strong>
                    . My approach is simple: I build digital products that are
                    as robust under the hood as they are intuitive on the
                    surface.
                  </p>
                  <p>
                    What started as a fascination with electronics technology
                    has evolved into a career dedicated to the web ecosystem. I
                    don't just write code; I solve problems through{" "}
                    <strong className="text-foreground">
                      scalable architecture
                    </strong>{" "}
                    and{" "}
                    <strong className="text-foreground">clean design</strong>.
                  </p>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8">
                  {[
                    { label: "Experience", value: "3.5+ Years" },
                    { label: "Location", value: "Cyprus" },
                    { label: "Freelance", value: "Available" },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -5 }}
                      className="space-y-1"
                    >
                      <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold">
                        {stat.label}
                      </p>
                      <p className="text-xl font-bold text-foreground">
                        {stat.value}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column: Academic Timeline */}
            <div className="lg:col-span-5 relative">
              <div className="sticky top-24 space-y-8">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border text-sm font-medium"
                >
                  <FiZap className="text-primary" />
                  <span>Academic Excellence</span>
                </motion.div>

                <div className="relative pl-8 space-y-12">
                  {/* Vertical Animated Line */}
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute left-0 top-0 w-[2px] bg-gradient-to-b from-primary via-border to-transparent"
                  />

                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="space-y-12"
                  >
                    {academicTimeline.map((item, index) => (
                      <motion.div
                        key={index}
                        variants={timelineItem}
                        className="relative"
                      >
                        {/* Timeline Dot */}
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ delay: 0.5 + index * 0.2 }}
                          className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-background border-4 border-primary z-10"
                        />

                        <div className="group space-y-3">
                          <span className="text-xs font-mono font-bold text-primary tracking-tighter uppercase">
                            {item.year}
                          </span>
                          <div>
                            <h4 className="text-xl font-bold group-hover:text-primary transition-colors italic font-serif">
                              {item.title}
                            </h4>
                            <p className="text-sm font-semibold text-foreground/80">
                              {item.subtitle}
                            </p>
                          </div>
                          <motion.div
                            whileHover={{ x: 10 }}
                            className="p-5 rounded-2xl bg-card border border-border group-hover:border-primary/30 transition-all shadow-sm"
                          >
                            <p className="text-sm font-bold mb-1">
                              {item.institution}
                            </p>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {item.description}
                            </p>
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
