import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiSave, FiPlusCircle, FiBarChart2, FiLayers } from "react-icons/fi";
import { FaReact, FaNodeJs } from "react-icons/fa";

const AddSkill = () => {
  const [formData, setFormData] = useState({
    name: "",
    level: 80,
    category: "Frontend Development",
    iconName: "FaReact", // Store icon name as string for dynamic rendering
  });

  const categories = [
    "Frontend Development",
    "Backend Development",
    "Tools & Technologies",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving Skill to DB:", formData);
    // Add your API call here (e.g., axios.post('/api/skills', formData))
    alert("Skill added successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">
          Add New Skill
        </h1>
        <p className="text-muted-foreground mt-2">
          Define technical expertise and proficiency levels for your portfolio
          expertise section.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-card p-8 rounded-3xl border border-border shadow-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Skill Name */}
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  Skill Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Next.js"
                  className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              {/* Category Dropdown */}
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  Category
                </label>
                <select
                  className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none appearance-none cursor-pointer"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Proficiency Level */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  Proficiency Level
                </label>
                <span className="text-primary font-mono font-bold bg-primary/10 px-3 py-1 rounded-full text-xs">
                  {formData.level}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                value={formData.level}
                onChange={(e) =>
                  setFormData({ ...formData, level: parseInt(e.target.value) })
                }
              />
            </div>

            {/* Icon Identifier */}
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Icon Component Name
              </label>
              <input
                type="text"
                placeholder="e.g. SiNextdotjs"
                className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all"
                value={formData.iconName}
                onChange={(e) =>
                  setFormData({ ...formData, iconName: e.target.value })
                }
              />
              <p className="text-[10px] text-muted-foreground">
                Enter React-Icon name (e.g., FaReact, SiTailwindcss)
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground py-4 rounded-2xl font-bold hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-[0.98]"
            >
              <FiPlusCircle size={20} />
              Publish to Portfolio
            </button>
          </form>
        </div>

        {/* Live Preview Sidebar */}
        <div className="space-y-6">
          <div className="bg-card p-6 rounded-3xl border border-dashed border-border flex flex-col items-center justify-center text-center space-y-4">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mb-2 flex items-center gap-2">
              <FiBarChart2 className="text-primary" /> Live Preview
            </h4>

            <div className="w-full p-4 rounded-2xl bg-secondary/20 border border-border">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    {formData.category.includes("Frontend") ? (
                      <FaReact />
                    ) : (
                      <FaNodeJs />
                    )}
                  </div>
                  <span className="font-bold text-sm uppercase tracking-wide">
                    {formData.name || "Skill Name"}
                  </span>
                </div>
                <span className="text-xs font-mono text-muted-foreground">
                  {formData.level}%
                </span>
              </div>
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${formData.level}%` }}
                />
              </div>
            </div>
            <p className="text-[10px] italic text-muted-foreground">
              This is how it will appear in the "{formData.category}" card.
            </p>
          </div>

          <div className="bg-primary/5 p-6 rounded-3xl border border-primary/10">
            <h4 className="text-sm font-bold flex items-center gap-2 mb-3">
              <FiLayers className="text-primary" /> Note
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Proficiency levels should be honest. <b>90%+</b> indicates expert
              knowledge, while <b>70%</b> indicates comfortable working
              knowledge.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSkill;
