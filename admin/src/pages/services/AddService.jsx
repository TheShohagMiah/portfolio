import React, { useState, useMemo, useRef, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiLayout,
  FiServer,
  FiLayers,
  FiZap,
  FiCode,
  FiSave,
  FiCheckCircle,
  FiPlus,
  FiX,
  FiSearch,
  FiGrid,
  FiBox,
  FiMonitor,
  FiSmartphone,
  FiDatabase,
  FiCloud,
  FiShield,
  FiCpu,
  FiGlobe,
  FiMail,
  FiSettings,
  FiTool,
  FiTerminal,
  FiPackage,
  FiTrendingUp,
  FiBarChart2,
  FiPieChart,
  FiActivity,
  FiCamera,
  FiImage,
  FiVideo,
  FiMusic,
  FiMic,
  FiHeadphones,
  FiWifi,
  FiBluetooth,
  FiBattery,
  FiAnchor,
  FiAlertCircle,
} from "react-icons/fi";
import {
  MdDesignServices,
  MdOutlineAnalytics,
  MdOutlineIntegrationInstructions,
  MdOutlineAutoAwesome,
  MdOutlineDashboard,
  MdOutlineApi,
  MdOutlineScience,
  MdOutlineRocketLaunch,
  MdOutlineStorage,
  MdOutlineSecurity,
  MdOutlineSpeed,
  MdOutlinePalette,
} from "react-icons/md";
import {
  LuBrainCircuit,
  LuBot,
  LuNetwork,
  LuWorkflow,
  LuGitBranch,
  LuSparkles,
  LuBlocks,
  LuConstruction,
  LuFlame,
  LuAtom,
} from "react-icons/lu";
import {
  TbApi,
  TbBrandReact,
  TbBrandNodejs,
  TbBrandDocker,
  TbBrandFigma,
  TbBrandGithub,
  TbChartDots,
  TbDeviceDesktop,
  TbTestPipe,
  TbBulb,
  TbRocket,
  TbBrandAws,
} from "react-icons/tb";
import { LuLoader } from "react-icons/lu";
import { Field } from "../../components/shared/InputField";
import toast from "react-hot-toast";
import axios from "axios";

/* ─── Master Icon Registry ──────────────────────────────────────────
   Every entry: { name: string, component: JSX, category: string }
   `name` is what gets saved to the DB.
──────────────────────────────────────────────────────────────────── */
export const ICON_REGISTRY = [
  // ── Dev & Code
  { name: "FiCode", component: <FiCode />, category: "Dev" },
  { name: "FiTerminal", component: <FiTerminal />, category: "Dev" },
  { name: "FiCpu", component: <FiCpu />, category: "Dev" },
  { name: "TbBrandReact", component: <TbBrandReact />, category: "Dev" },
  { name: "TbBrandNodejs", component: <TbBrandNodejs />, category: "Dev" },
  { name: "TbBrandDocker", component: <TbBrandDocker />, category: "Dev" },
  { name: "TbBrandGithub", component: <TbBrandGithub />, category: "Dev" },
  { name: "TbBrandAws", component: <TbBrandAws />, category: "Dev" },
  { name: "TbApi", component: <TbApi />, category: "Dev" },
  { name: "MdOutlineApi", component: <MdOutlineApi />, category: "Dev" },
  { name: "LuGitBranch", component: <LuGitBranch />, category: "Dev" },
  { name: "LuWorkflow", component: <LuWorkflow />, category: "Dev" },
  {
    name: "MdOutlineIntegrationInstructions",
    component: <MdOutlineIntegrationInstructions />,
    category: "Dev",
  },

  // ── Design & UI
  { name: "FiLayout", component: <FiLayout />, category: "Design" },
  { name: "FiGrid", component: <FiGrid />, category: "Design" },
  { name: "FiBox", component: <FiBox />, category: "Design" },
  { name: "FiMonitor", component: <FiMonitor />, category: "Design" },
  { name: "FiSmartphone", component: <FiSmartphone />, category: "Design" },
  { name: "TbBrandFigma", component: <TbBrandFigma />, category: "Design" },
  {
    name: "MdOutlinePalette",
    component: <MdOutlinePalette />,
    category: "Design",
  },
  {
    name: "MdDesignServices",
    component: <MdDesignServices />,
    category: "Design",
  },
  {
    name: "MdOutlineAutoAwesome",
    component: <MdOutlineAutoAwesome />,
    category: "Design",
  },
  { name: "LuSparkles", component: <LuSparkles />, category: "Design" },

  // ── AI & Data
  { name: "LuBrainCircuit", component: <LuBrainCircuit />, category: "AI" },
  { name: "LuBot", component: <LuBot />, category: "AI" },
  { name: "LuAtom", component: <LuAtom />, category: "AI" },
  { name: "MdOutlineScience", component: <MdOutlineScience />, category: "AI" },
  {
    name: "MdOutlineAnalytics",
    component: <MdOutlineAnalytics />,
    category: "AI",
  },
  { name: "TbChartDots", component: <TbChartDots />, category: "AI" },
  { name: "FiBarChart2", component: <FiBarChart2 />, category: "AI" },
  { name: "FiPieChart", component: <FiPieChart />, category: "AI" },
  { name: "FiTrendingUp", component: <FiTrendingUp />, category: "AI" },
  { name: "FiActivity", component: <FiActivity />, category: "AI" },

  // ── Infrastructure
  { name: "FiServer", component: <FiServer />, category: "Infra" },
  { name: "FiDatabase", component: <FiDatabase />, category: "Infra" },
  { name: "FiCloud", component: <FiCloud />, category: "Infra" },
  { name: "FiLayers", component: <FiLayers />, category: "Infra" },
  { name: "FiPackage", component: <FiPackage />, category: "Infra" },
  { name: "LuNetwork", component: <LuNetwork />, category: "Infra" },
  { name: "LuBlocks", component: <LuBlocks />, category: "Infra" },
  {
    name: "MdOutlineStorage",
    component: <MdOutlineStorage />,
    category: "Infra",
  },
  {
    name: "MdOutlineDashboard",
    component: <MdOutlineDashboard />,
    category: "Infra",
  },

  // ── Security & Ops
  { name: "FiShield", component: <FiShield />, category: "Ops" },
  { name: "FiSettings", component: <FiSettings />, category: "Ops" },
  { name: "FiTool", component: <FiTool />, category: "Ops" },
  {
    name: "MdOutlineSecurity",
    component: <MdOutlineSecurity />,
    category: "Ops",
  },
  { name: "MdOutlineSpeed", component: <MdOutlineSpeed />, category: "Ops" },
  { name: "TbTestPipe", component: <TbTestPipe />, category: "Ops" },
  { name: "LuConstruction", component: <LuConstruction />, category: "Ops" },
  { name: "TbDeviceDesktop", component: <TbDeviceDesktop />, category: "Ops" },

  // ── General
  { name: "FiZap", component: <FiZap />, category: "General" },
  { name: "FiGlobe", component: <FiGlobe />, category: "General" },
  { name: "FiMail", component: <FiMail />, category: "General" },
  { name: "FiWifi", component: <FiWifi />, category: "General" },
  { name: "FiAnchor", component: <FiAnchor />, category: "General" },
  { name: "LuFlame", component: <LuFlame />, category: "General" },
  { name: "TbBulb", component: <TbBulb />, category: "General" },
  { name: "TbRocket", component: <TbRocket />, category: "General" },
  {
    name: "MdOutlineRocketLaunch",
    component: <MdOutlineRocketLaunch />,
    category: "General",
  },
  { name: "FiCamera", component: <FiCamera />, category: "General" },
  { name: "FiImage", component: <FiImage />, category: "General" },
  { name: "FiMusic", component: <FiMusic />, category: "General" },
  { name: "FiHeadphones", component: <FiHeadphones />, category: "General" },
];

/* ─── Utility: render any saved icon name back to JSX ──────────────
   Usage: <IconRenderer name="TbBrandReact" className="text-xl" />
──────────────────────────────────────────────────────────────────── */
export const IconRenderer = ({ name, className = "" }) => {
  const found = ICON_REGISTRY.find((i) => i.name === name);
  return <span className={className}>{found?.component ?? <FiLayout />}</span>;
};

const CATEGORIES = ["All", "Dev", "Design", "AI", "Infra", "Ops", "General"];

/* ─── Icon Picker Modal ─────────────────────────────────────────── */
const IconPickerModal = ({ value, onChange, onClose }) => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const searchRef = useRef(null);

  // Auto-focus search on open
  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const filtered = useMemo(() => {
    return ICON_REGISTRY.filter((icon) => {
      const matchesQuery = icon.name
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesCategory = category === "All" || icon.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(4px)",
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 16 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="bg-card border border-border rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-border">
          <div>
            <h2 className="font-bold text-foreground tracking-tight">
              Icon Picker
            </h2>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">
              {filtered.length} icons available
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl bg-secondary hover:bg-destructive/10 hover:text-destructive transition-all"
          >
            <FiX size={16} />
          </button>
        </div>

        {/* Search */}
        <div className="px-6 pt-4">
          <div className="relative">
            <FiSearch
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search icons... e.g. react, cloud, shield"
              className="w-full pl-9 pr-4 py-2.5 bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-all placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 px-6 pt-3 pb-2 overflow-x-auto scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`shrink-0 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                category === cat
                  ? "text-brand-fg"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
              style={
                category === cat ? { backgroundColor: "var(--brand)" } : {}
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Icon Grid */}
        <div className="px-6 pb-6 pt-2 max-h-72 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground gap-3">
              <FiAlertCircle size={24} className="opacity-40" />
              <p className="text-xs font-medium">No icons match "{query}"</p>
            </div>
          ) : (
            <div className="grid grid-cols-8 gap-2">
              {filtered.map((icon) => (
                <motion.button
                  key={icon.name}
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title={icon.name}
                  onClick={() => {
                    onChange(icon.name);
                    onClose();
                  }}
                  className={`aspect-square flex items-center justify-center rounded-xl text-lg border transition-all ${
                    value === icon.name
                      ? "border-transparent text-brand-fg shadow-brand"
                      : "bg-secondary border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                  style={
                    value === icon.name
                      ? {
                          backgroundColor: "var(--brand)",
                          boxShadow: "0 0 12px var(--brand-glow)",
                        }
                      : {}
                  }
                >
                  {icon.component}
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ─── Semantic Input Styling ────────────────────────────────────── */
export const inputCls = (hasError) =>
  `w-full bg-secondary border rounded-2xl py-3 px-4 text-sm text-foreground 
   placeholder:text-muted-foreground focus:outline-none transition-all
   ${hasError ? "border-destructive/50" : "border-border focus:border-primary/50"}`;

/* ─── Live Preview Card ─────────────────────────────────────────── */
const PreviewCard = ({ title, description, tags, iconName }) => (
  <motion.div
    layout
    className="group relative bg-card p-8 rounded-[2.5rem] border border-border hover:border-primary/30 transition-all duration-500 shadow-xl"
  >
    <div className="mb-8 w-14 h-14 rounded-2xl bg-secondary border border-border flex items-center justify-center text-2xl text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-all">
      <IconRenderer name={iconName} />
    </div>
    <div className="space-y-3">
      <h3 className="text-xl font-bold text-foreground group-hover:italic transition-all">
        {title || "Capability Title"}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed min-h-[3rem] font-sans">
        {description || "Define your professional edge here..."}
      </p>
    </div>
    <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-border">
      {tags.map(
        (t, i) =>
          t.value && (
            <span
              key={i}
              className="px-3 py-1 rounded-lg bg-secondary text-[10px] font-bold uppercase tracking-widest text-muted-foreground border border-border"
            >
              {t.value}
            </span>
          ),
      )}
    </div>
  </motion.div>
);

/* ─── Main Component ────────────────────────────────────────────── */
const AddService = () => {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    setError,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      icon: "FiLayout",
      tags: [{ value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "tags" });
  const watchAll = watch();
  const selectedIcon = watchAll.icon;

  const onSubmit = async (data) => {
    try {
      const formattedData = {
        ...data,
        tags: data.tags.map((t) => t.value),
      };
      const response = await axios.post(
        "http://localhost:5000/api/services",
        formattedData,
        { withCredentials: true },
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setSubmitSuccess(true);
        reset();
        setTimeout(() => setSubmitSuccess(false), 5000);
      }
    } catch (error) {
      console.error("Backend Error Data:", error.response?.data);
      const backendMessage =
        error.response?.data?.message || "Validation Error";
      const backendErrors = error.response?.data?.errors;
      if (backendErrors) {
        Object.keys(backendErrors).forEach((key) => {
          setError(key, { type: "server", message: backendErrors[key] });
        });
      } else if (backendMessage.toLowerCase().includes("title")) {
        setError("title", { message: backendMessage });
      }
      toast.error(backendMessage);
    }
  };

  return (
    <section className="py-8 min-h-screen text-foreground">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tighter">
            Service{" "}
            <span className="text-muted-foreground italic font-serif text-3xl">
              Factory.
            </span>
          </h1>
          <p className="text-muted-foreground text-sm mt-2 font-sans">
            Deploy a new professional module to your public portfolio.
          </p>
        </div>

        <AnimatePresence>
          {submitSuccess && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 overflow-hidden"
            >
              <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-chart-2/10 border border-chart-2/20 text-chart-2">
                <FiCheckCircle size={18} />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">
                  Service Protocol Published
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8 bg-card p-10 rounded-[3rem] border border-border shadow-sm"
          >
            <div className="space-y-6">
              <Field
                label="Service Title"
                required
                error={errors.title?.message}
              >
                <input
                  {...register("title", { required: "Title is required" })}
                  placeholder="e.g. Quantum Analytics Suite"
                  className={inputCls(!!errors.title)}
                />
              </Field>

              <div className="space-y-2">
                <div className="flex justify-between items-end px-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Scope Description
                  </label>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {watchAll.description?.length || 0}/220
                  </span>
                </div>
                <textarea
                  rows={3}
                  {...register("description", {
                    required: true,
                    maxLength: 220,
                  })}
                  className={`${inputCls(!!errors.description)} resize-none font-sans`}
                />
              </div>

              {/* ── Dynamic Icon Picker ──────────────────────────── */}
              {/* Hidden input keeps the value in react-hook-form */}
              <input type="hidden" {...register("icon")} />

              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
                  Visual Anchor (Icon)
                </label>

                {/* Trigger Button */}
                <button
                  type="button"
                  onClick={() => setPickerOpen(true)}
                  className="w-full flex items-center gap-4 px-5 py-4 bg-secondary border border-border rounded-2xl hover:border-primary/50 transition-all group"
                >
                  {/* Selected icon preview */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 text-brand-fg"
                    style={{ backgroundColor: "var(--brand)" }}
                  >
                    <IconRenderer name={selectedIcon} />
                  </div>

                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-foreground">
                      {selectedIcon}
                    </p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">
                      Click to browse {ICON_REGISTRY.length}+ icons
                    </p>
                  </div>

                  <FiSearch
                    size={16}
                    className="text-muted-foreground group-hover:text-primary transition-colors shrink-0"
                  />
                </button>
              </div>
              {/* ─────────────────────────────────────────────────── */}

              <div className="space-y-4">
                <Field
                  label="Technologies"
                  hint="List all technologies used in this project."
                  required
                >
                  <div className="flex flex-wrap gap-3 p-6 bg-secondary/30 rounded-[2rem] border border-border shadow-inner">
                    <AnimatePresence>
                      {fields.map((field, index) => (
                        <motion.div
                          key={field.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          className="flex flex-col"
                        >
                          <div
                            className={`flex items-center bg-card rounded-xl px-4 py-2 border transition-colors shadow-sm ${
                              errors.tags?.[index]?.value
                                ? "border-destructive/50"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <input
                              {...register(`tags.${index}.value`, {
                                required: "Technology name is required",
                              })}
                              placeholder="e.g. React"
                              className="bg-transparent text-xs font-medium focus:outline-none w-24"
                            />
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="ml-2 text-muted-foreground hover:text-destructive transition-colors"
                            >
                              <FiX size={14} />
                            </button>
                          </div>
                          {errors.tags?.[index]?.value && (
                            <span className="text-[10px] text-destructive mt-1 ml-1">
                              {errors.tags[index].value.message}
                            </span>
                          )}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    <button
                      type="button"
                      onClick={() => append({ value: "" })}
                      className="group flex items-center gap-2 px-5 py-2 rounded-xl border-2 border-dashed border-primary/20 text-primary text-xs font-bold hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all active:scale-95"
                    >
                      <FiPlus size={16} /> ADD TECH
                    </button>
                  </div>
                </Field>
              </div>
            </div>

            <div className="pt-8 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={`h-1.5 w-1.5 rounded-full ${isDirty ? "bg-chart-3 animate-pulse" : "bg-chart-2"}`}
                />
                <span className="text-[10px] font-mono uppercase tracking-tighter text-muted-foreground">
                  {isDirty ? "Unsaved Changes" : "State Synced"}
                </span>
              </div>
              <button
                disabled={isSubmitting}
                className="flex items-center gap-3 px-8 py-3.5 bg-primary text-primary-foreground rounded-2xl text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-xl shadow-primary/10 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <LuLoader className="animate-spin" />
                ) : (
                  <FiSave />
                )}
                Publish Module
              </button>
            </div>
          </form>

          {/* Live Preview */}
          <div className="lg:sticky lg:top-8 space-y-6">
            <div className="flex items-center gap-4 px-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                Live Telemetry
              </span>
              <div className="h-[1px] flex-1 bg-border" />
            </div>
            <PreviewCard
              title={watchAll.title}
              description={watchAll.description}
              tags={watchAll.tags}
              iconName={watchAll.icon}
            />
            <div className="p-6 rounded-3xl bg-secondary/50 border border-border">
              <p className="text-[10px] leading-relaxed text-muted-foreground font-sans">
                <span className="font-bold text-foreground">Note:</span>{" "}
                Publishing will update your public "Services" section instantly
                via the API node. Ensure all tags are correctly spelled for SEO.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Icon Picker Modal (portal-like, rendered at bottom of tree) */}
      <AnimatePresence>
        {pickerOpen && (
          <IconPickerModal
            value={selectedIcon}
            onChange={(name) => setValue("icon", name, { shouldDirty: true })}
            onClose={() => setPickerOpen(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default AddService;
