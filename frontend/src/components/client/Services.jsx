import React from "react";
import { motion } from "framer-motion";
import {
  FiLayout,
  FiServer,
  FiLayers,
  FiZap,
  FiArrowUpRight,
} from "react-icons/fi";

const Services = () => {
  const services = [
    {
      title: "Frontend Development",
      description:
        "Crafting visually stunning, high-performance user interfaces using React and Next.js. Focused on core web vitals and seamless user journeys.",
      icon: <FiLayout />,
      tags: ["React", "Next.js", "Tailwind"],
    },
    {
      title: "Backend Architecture",
      description:
        "Designing scalable server-side logic and database schemas. Expertise in RESTful APIs, microservices, and secure authentication flows.",
      icon: <FiServer />,
      tags: ["Node.js", "Express", "MongoDB"],
    },
    {
      title: "Full Stack Solutions",
      description:
        "End-to-end product development from initial wireframing to final deployment. Bridging the gap between design and robust functionality.",
      icon: <FiLayers />,
      tags: ["MERN Stack", "T3 Stack"],
    },
    {
      title: "App Optimization",
      description:
        "Refactoring legacy codebases for speed, SEO, and accessibility. Ensuring your digital products remain modern and maintainable.",
      icon: <FiZap />,
      tags: ["SEO", "Performance", "UX"],
    },
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="services"
      className="py-24 bg-background relative overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20"
          >
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-[2px] w-12 bg-primary"></span>
                <span className="text-primary font-bold uppercase tracking-widest text-xs">
                  What I Offer
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                Solving problems through <br />
                <span className="text-muted-foreground italic font-serif">
                  digital innovation.
                </span>
              </h2>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground max-w-sm mb-2"
            >
              Tailored development services designed to help businesses scale in
              the modern web ecosystem.
            </motion.p>
          </motion.div>

          {/* Services Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="group relative p-8 rounded-[2.5rem] bg-card border border-border hover:border-primary/20 transition-colors duration-500 hover:shadow-2xl hover:shadow-primary/5"
              >
                {/* Icon Circle */}
                <motion.div
                  whileHover={{ rotate: -10, scale: 1.1 }}
                  className="mb-8 w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-3xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500"
                >
                  {service.icon}
                </motion.div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-border/50">
                  {service.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-secondary/50 px-3 py-1 rounded-lg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Decorative Arrow */}
                <div className="absolute top-10 right-10 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500 hidden md:block">
                  <FiArrowUpRight size={24} className="text-primary" />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-20 p-8 md:p-12 rounded-[3rem] bg-secondary/30 border border-border flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
          >
            {/* Subtle background glow for CTA */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl pointer-events-none" />

            <div className="text-center md:text-left relative z-10">
              <h4 className="text-2xl font-bold mb-2">
                Need a custom solution?
              </h4>
              <p className="text-muted-foreground">
                I am currently available for freelance work and full-time roles.
              </p>
            </div>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="px-8 py-4 bg-foreground text-background rounded-2xl font-bold shadow-lg shadow-foreground/10 hover:shadow-primary/20 transition-all z-10"
            >
              Get a Quote
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Services;
