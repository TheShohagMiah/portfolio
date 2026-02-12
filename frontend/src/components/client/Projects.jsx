import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiExternalLink, FiArrowRight } from "react-icons/fi";

const Projects = () => {
  const [filter, setFilter] = useState("All");

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "A full-stack e-commerce application with user authentication, product management, and Stripe integration.",
      image: "/projects/ecommerce.jpg",
      category: "Full Stack",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      github: "#",
      live: "#",
    },
    {
      id: 2,
      title: "Task Management App",
      description:
        "Collaborative tool with real-time updates and drag-and-drop team collaboration features.",
      image: "/projects/taskmanager.jpg",
      category: "Full Stack",
      technologies: ["Next.js", "Prisma", "Socket.io", "Tailwind"],
      github: "#",
      live: "#",
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description:
        "Real-time weather application with location forecasts and interactive maps using OpenWeather API.",
      image: "/projects/weather.jpg",
      category: "Frontend",
      technologies: ["React", "TypeScript", "Chart.js"],
      github: "#",
      live: "#",
    },
  ];

  const categories = ["All", "Full Stack", "Frontend", "Backend"];

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
    <section
      id="projects"
      className="py-20 md:py-32 bg-background relative overflow-hidden"
    >
      {/* Background Accent Animation */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-1/4 -right-20 w-96 h-96 bg-primary rounded-full blur-[120px] pointer-events-none"
      />

      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header & Filter */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <span className="h-[2px] w-12 bg-primary"></span>
                <span className="text-primary font-bold uppercase tracking-widest text-xs">
                  Portfolio
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                Selected{" "}
                <span className="text-muted-foreground italic font-serif">
                  Works.
                </span>
              </h2>
              <p className="text-muted-foreground max-w-md leading-relaxed text-lg">
                A curated selection of digital experiences built with clean code
                and purpose.
              </p>
            </motion.div>

            {/* Filter Tabs with Layout Transitions */}
            <div className="flex flex-wrap gap-2 bg-secondary/30 backdrop-blur-md p-1.5 rounded-2xl border border-border w-fit">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className="relative px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors"
                >
                  <span
                    className={`relative z-10 ${filter === cat ? "text-primary" : "text-muted-foreground"}`}
                  >
                    {cat}
                  </span>
                  {filter === cat && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-background rounded-xl shadow-sm ring-1 ring-border"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid with AnimatePresence */}
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    transition: { duration: 0.2 },
                  }}
                  whileHover={{ y: -10 }}
                  className="group relative flex flex-col bg-card rounded-[2.5rem] border border-border overflow-hidden shadow-sm"
                >
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-5 left-5 px-4 py-1.5 bg-background/80 backdrop-blur-md border border-border rounded-full text-[10px] font-bold uppercase tracking-widest">
                      {project.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors italic font-serif">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="text-[10px] font-bold text-muted-foreground border border-border px-3 py-1 rounded-lg uppercase"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="flex gap-4 items-center">
                      <motion.a
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        href={project.github}
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-secondary/50 text-sm font-bold hover:bg-secondary transition-colors"
                      >
                        <FiGithub /> Github
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        href={project.live}
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-foreground text-background text-sm font-bold"
                      >
                        <FiExternalLink /> Live
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* View More CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-20 flex flex-col items-center gap-6"
          >
            <div className="h-px w-20 bg-border" />
            <motion.a
              whileHover={{ x: 5 }}
              href="https://github.com/shohag"
              className="group flex items-center gap-3 text-lg font-bold hover:text-primary transition-colors"
            >
              Explore Full Archive on GitHub
              <FiArrowRight className="transition-transform group-hover:translate-x-2" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
