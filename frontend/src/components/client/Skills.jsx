import React from "react";
import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaPython, FaGitAlt, FaAward } from "react-icons/fa";
import {
  SiJavascript,
  SiTypescript,
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  SiNextdotjs,
  SiRedux,
  SiFirebase,
  SiPostman,
} from "react-icons/si";

const Skills = () => {
  const skillCategories = [
    {
      category: "Frontend Development",
      description: "Building responsive, high-performance user interfaces.",
      icon: <FaReact />,
      skills: [
        { name: "React", level: 90, icon: <FaReact /> },
        { name: "Next.js", level: 85, icon: <SiNextdotjs /> },
        { name: "JavaScript", level: 90, icon: <SiJavascript /> },
        { name: "TypeScript", level: 80, icon: <SiTypescript /> },
        { name: "Tailwind CSS", level: 95, icon: <SiTailwindcss /> },
        { name: "Redux", level: 75, icon: <SiRedux /> },
      ],
    },
    {
      category: "Backend Development",
      description: "Architecting scalable APIs and robust server logic.",
      icon: <FaNodeJs />,
      skills: [
        { name: "Node.js", level: 85, icon: <FaNodeJs /> },
        { name: "Express.js", level: 85, icon: <SiExpress /> },
        { name: "REST APIs", level: 90, icon: <SiPostman /> },
        { name: "MongoDB", level: 85, icon: <SiMongodb /> },
        { name: "Firebase", level: 70, icon: <SiFirebase /> },
      ],
    },
  ];

  const certifications = [
    { title: "Full Stack Web Development", issuer: "Udemy" },
    { title: "React - The Complete Guide", issuer: "Udemy" },
    { title: "Node.js Certification", issuer: "freeCodeCamp" },
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="skills" className="py-24 bg-background overflow-hidden">
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
              <span className="text-primary font-bold uppercase tracking-widest text-sm">
                Expertise
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
              Skills &{" "}
              <span className="text-muted-foreground italic font-serif">
                Technologies.
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              I specialize in building full-stack applications with a focus on
              modern JavaScript ecosystems and scalable cloud architecture.
            </p>
          </motion.div>

          {/* Main Skills Grid */}
          <div className="grid lg:grid-cols-2 gap-12 mb-24">
            {skillCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative p-8 rounded-3xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors group"
              >
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">
                      {category.category}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {category.description}
                    </p>
                  </div>
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl text-primary/20 group-hover:text-primary transition-colors"
                  >
                    {category.icon}
                  </motion.div>
                </div>

                <div className="space-y-6">
                  {category.skills.map((skill, sIdx) => (
                    <div key={sIdx}>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-primary">{skill.icon}</span>
                          <span className="font-semibold text-sm tracking-wide uppercase">
                            {skill.name}
                          </span>
                        </div>
                        <span className="text-xs font-mono text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1.5,
                            ease: "circOut",
                            delay: sIdx * 0.1,
                          }}
                          className="h-full bg-primary"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Lower Grid: Soft Skills & Certs */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Soft Skills */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-2 p-8 rounded-3xl bg-secondary/30 border border-border"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                Professional Soft Skills
              </h3>
              <div className="flex flex-wrap gap-3">
                {[
                  "Problem Solving",
                  "Team Collaboration",
                  "System Design",
                  "Time Management",
                  "Critical Thinking",
                  "Adaptability",
                  "Leadership",
                  "Attention to Detail",
                ].map((skill, i) => (
                  <motion.span
                    key={i}
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: "var(--primary)",
                      color: "var(--primary-foreground)",
                    }}
                    className="px-4 py-2 bg-background border border-border rounded-xl text-sm font-medium transition-all cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-primary text-primary-foreground shadow-xl shadow-primary/20 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 transition-transform duration-700">
                <FaAward size={120} />
              </div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 relative z-10">
                <FaAward className="text-2xl" />
                Certifications
              </h3>
              <ul className="space-y-4 relative z-10">
                {certifications.map((cert, i) => (
                  <motion.li
                    key={i}
                    whileHover={{ x: 5 }}
                    className="group/item"
                  >
                    <p className="font-bold leading-tight group-hover/item:underline cursor-pointer">
                      {cert.title}
                    </p>
                    <p className="text-xs opacity-80 uppercase tracking-tighter mt-1">
                      {cert.issuer}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Minimalist Tech Stack Footer */}
          <div className="mt-24 pt-12 border-t border-border">
            <p className="text-center text-sm font-medium text-muted-foreground uppercase tracking-[0.3em] mb-12">
              Core Tech Stack
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="flex flex-wrap justify-center gap-8 md:gap-16"
            >
              {[
                { Icon: SiNextdotjs, color: "inherit" },
                { Icon: FaReact, color: "#61DAFB" },
                { Icon: SiTypescript, color: "#3178C6" },
                { Icon: FaNodeJs, color: "#339933" },
                { Icon: SiMongodb, color: "#47A248" },
                { Icon: FaPython, color: "#3776AB" },
                { Icon: SiTailwindcss, color: "#06B6D4" },
                { Icon: FaGitAlt, color: "#F05032" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -10, filter: "grayscale(0%)", opacity: 1 }}
                  className="grayscale opacity-40 transition-all duration-300"
                >
                  <item.Icon
                    className="text-4xl"
                    style={{
                      color: item.color === "inherit" ? undefined : item.color,
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
