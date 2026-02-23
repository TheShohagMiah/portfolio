import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlus,
  FiSave,
  FiX,
  FiUploadCloud,
  FiGithub,
  FiExternalLink,
  FiCode,
  FiInfo,
} from "react-icons/fi";
import { LuLoader } from "react-icons/lu";
import { Field } from "../../components/shared/InputField";

/* ─── Shared Styling ─────────────────────────────────────────── */
const inputCls = (hasError) =>
  `w-full px-4 py-3 rounded-2xl bg-secondary border text-sm text-foreground
   placeholder:text-muted-foreground focus:outline-none focus:ring-2 
   focus:ring-primary/20 focus:border-primary transition-all duration-200
   ${hasError ? "border-destructive/50" : "border-border hover:border-primary/30"}`;

const AddProject = () => {
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      slug: "",
      githubLink: "",
      liveLink: "",
      tags: [{ value: "React" }, { value: "Tailwind" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tags",
  });

  const watchedTitle = watch("title");

  // Logic: Real-time Slug Generation
  useEffect(() => {
    const slug = (watchedTitle || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setValue("slug", slug, { shouldValidate: true });
  }, [watchedTitle, setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    // Mimic API Latency
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Vault Deployment Initiated:", data);
  };

  return (
    <section className="py-12 min-h-screen text-foreground selection:bg-primary/30">
      <div className="max-w-4xl mx-auto px-6">
        {/* ── Header ────────────────────────────────────────────── */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[2px] w-8 bg-primary" />
            <span className="text-primary font-bold uppercase tracking-[0.3em] text-[10px]">
              Archive Expansion
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">
            Add New{" "}
            <span className="text-primary italic font-serif">Project.</span>
          </h1>
          <p className="text-muted-foreground mt-3 text-sm max-w-md leading-relaxed">
            Populate your digital vault with fresh work. High-quality thumbnails
            and precise tags improve discovery.
          </p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pb-20">
          {/* ── Image Upload: Visual Identity ──────────────────────── */}
          <div className="group relative border-2 border-dashed border-border rounded-[2.5rem] p-4 bg-card hover:bg-secondary/50 hover:border-primary/50 transition-all cursor-pointer">
            <div className="flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden rounded-[2rem]">
              {preview ? (
                <>
                  <img
                    src={preview}
                    alt="Preview"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => setPreview(null)}
                      className="p-4 bg-destructive text-destructive-foreground rounded-full shadow-xl hover:scale-110 transition-transform"
                    >
                      <FiX size={24} />
                    </button>
                  </div>
                </>
              ) : (
                <label className="cursor-pointer flex flex-col items-center text-center p-8">
                  <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:rotate-12 transition-transform">
                    <FiUploadCloud size={40} />
                  </div>
                  <span className="text-lg font-bold">Drop your thumbnail</span>
                  <span className="text-muted-foreground text-xs mt-2 font-mono">
                    1200 x 630 recommended (Max 2MB)
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </label>
              )}
            </div>
          </div>

          <div className="bg-card border border-border rounded-[2.5rem] p-8 md:p-12 space-y-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <FiCode size={120} />
            </div>

            {/* Section: Core Metadata */}
            <div className="space-y-8 relative z-10">
              <div className="flex items-center gap-3 border-b border-border pb-4">
                <FiInfo className="text-primary" />
                <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Identity & Path
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                <Field
                  label="Project Title"
                  required
                  error={errors.title?.message}
                >
                  <input
                    {...register("title", { required: "Title is required" })}
                    placeholder="e.g. Quantum Analytics Suite"
                    className={inputCls(!!errors.title)}
                  />
                </Field>

                <Field label="System Slug" error={errors.slug?.message}>
                  <div className="relative">
                    <input
                      {...register("slug")}
                      readOnly
                      className={`${inputCls(!!errors.slug)} bg-secondary/50 text-muted-foreground cursor-not-allowed italic`}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-mono opacity-40 uppercase">
                      Auto
                    </span>
                  </div>
                </Field>
              </div>
            </div>

            {/* Section: Deployment Links */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 border-b border-border pb-4">
                <FiExternalLink className="text-primary" />
                <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Source & Live
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                <Field
                  label="Repository Link"
                  error={errors.githubLink?.message}
                >
                  <div className="relative">
                    <FiGithub className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      {...register("githubLink")}
                      placeholder="github.com/shohag/repo"
                      className={`${inputCls(!!errors.githubLink)} pl-12`}
                    />
                  </div>
                </Field>

                <Field label="Live URL" error={errors.liveLink?.message}>
                  <div className="relative">
                    <FiExternalLink className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      {...register("liveLink")}
                      placeholder="project-demo.com"
                      className={`${inputCls(!!errors.liveLink)} pl-12`}
                    />
                  </div>
                </Field>
              </div>
            </div>

            {/* Section: Taxonomy (Tags) */}
            <div className="space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
                Stack Taxonomy
              </label>
              <div className="flex flex-wrap gap-3 p-6 bg-secondary/30 rounded-[2rem] border border-border shadow-inner">
                <AnimatePresence>
                  {fields.map((field, index) => (
                    <motion.div
                      key={field.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="flex items-center bg-card rounded-xl px-4 py-2 border border-border hover:border-primary/50 transition-colors shadow-sm"
                    >
                      <input
                        {...register(`tags.${index}.value`)}
                        className="bg-transparent text-xs font-medium focus:outline-none w-20"
                        placeholder="Tech..."
                      />
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="ml-2 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <FiX size={14} />
                      </button>
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
            </div>

            {/* Section: Narrative */}
            <Field
              label="Technical Narrative"
              required
              error={errors.longDes?.message}
            >
              <textarea
                rows={6}
                {...register("longDes", {
                  required: "Description is required",
                })}
                placeholder="Break down the architecture, user experience, and pivotal challenges solved..."
                className={`${inputCls(!!errors.longDes)} resize-none leading-relaxed`}
              />
            </Field>

            {/* Footer: Control Strip */}
            <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-3">
                <div
                  className={`w-2.5 h-2.5 rounded-full ${isDirty ? "bg-chart-3 animate-pulse" : "bg-primary"}`}
                />
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  {isDirty ? "Payload Modified" : "System Ready"}
                </p>
              </div>

              <div className="flex gap-4 w-full md:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    reset();
                    setPreview(null);
                  }}
                  disabled={!isDirty || isSubmitting}
                  className="flex-1 md:flex-none px-8 py-3 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-all disabled:opacity-0"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 md:flex-none flex items-center justify-center gap-3 px-10 py-4 rounded-2xl bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest shadow-xl shadow-primary/20 hover:opacity-90 transition-all active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <LuLoader className="animate-spin text-lg" />
                  ) : (
                    <FiSave className="text-lg" />
                  )}
                  Deploy Project
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddProject;
