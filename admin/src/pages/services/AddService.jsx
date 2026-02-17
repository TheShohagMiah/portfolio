import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiLayout,
  FiServer,
  FiLayers,
  FiZap,
  FiCode,
  FiSave,
  FiAlertCircle,
  FiCheckCircle,
  FiPlus,
  FiX,
  FiArrowUpRight,
} from "react-icons/fi";
import { LuLoader } from "react-icons/lu";
import { Field } from "../../components/shared/InputField";

/* ─── Available Icons ─────────────────────────────────────────────── */
const ICON_OPTIONS = [
  { value: "FiLayout", label: "Layout", icon: <FiLayout /> },
  { value: "FiServer", label: "Server", icon: <FiServer /> },
  { value: "FiLayers", label: "Layers", icon: <FiLayers /> },
  { value: "FiZap", label: "Zap", icon: <FiZap /> },
  { value: "FiCode", label: "Code", icon: <FiCode /> },
];

/* ─── Animation Variants ──────────────────────────────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ─── Input base classes ──────────────────────────────────────────── */
const inputCls = (hasError) =>
  `w-full px-4 py-3 rounded-2xl bg-card border text-sm text-foreground
   placeholder:text-muted-foreground
   focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent
   transition-all duration-200
   ${hasError ? "border-destructive" : "border-border hover:border-ring/50"}`;

/* ─── Live Preview Card ───────────────────────────────────────────── */
const PreviewCard = ({ title, description, tags, iconValue }) => {
  const found = ICON_OPTIONS.find((o) => o.value === iconValue);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="group relative p-8 rounded-[2.5rem] bg-card border border-border hover:border-primary/20 transition-colors duration-500 hover:shadow-2xl hover:shadow-primary/5 pointer-events-none select-none"
    >
      <div className="mb-8 w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-3xl text-primary">
        {found?.icon ?? <FiLayout />}
      </div>
      <div className="space-y-4">
        <h3 className="text-2xl font-bold tracking-tight">
          {title || "Service Title"}
        </h3>
        <p className="text-muted-foreground leading-relaxed text-sm">
          {description || "Your service description will appear here…"}
        </p>
      </div>
      <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-border/50">
        {tags.length > 0 ? (
          tags.map((t, i) => (
            <span
              key={i}
              className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-secondary/50 px-3 py-1 rounded-lg"
            >
              {t.value}
            </span>
          ))
        ) : (
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-secondary/50 px-3 py-1 rounded-lg">
            Tag
          </span>
        )}
      </div>
      <div className="absolute top-10 right-10 opacity-0 group-hover:opacity-100 transition-all duration-500 hidden md:block">
        <FiArrowUpRight size={24} className="text-primary" />
      </div>
    </motion.div>
  );
};

/* ─── AddService ─────────────────────────────────────────────────── */
const AddService = () => {
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
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

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 1200));
    console.log("Service saved:", data);
    setSubmitSuccess(true);
  };

  const handleReset = () => {
    reset();
    setSubmitSuccess(false);
  };

  return (
    <section className="py-10 bg-background min-h-screen overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* ── Page Header ───────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20"
          >
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-[2px] w-12 bg-primary" />
                <span className="text-primary font-bold uppercase tracking-widest text-xs">
                  Admin Panel
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                Add a new{" "}
                <span className="text-muted-foreground italic font-serif">
                  service.
                </span>
              </h1>
            </div>
            <p className="text-muted-foreground max-w-sm mb-2">
              Fill in the details below. The live preview updates as you type.
            </p>
          </motion.div>

          {/* ── Success Banner ────────────────────────────────────── */}
          <AnimatePresence>
            {submitSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mb-10 flex items-center gap-3 px-5 py-4 rounded-2xl bg-card border border-border text-sm font-medium"
              >
                <FiCheckCircle
                  className="text-primary flex-shrink-0"
                  size={18}
                />
                <span className="text-foreground">
                  Service added successfully —{" "}
                  <button
                    onClick={handleReset}
                    className="text-primary underline underline-offset-2 hover:no-underline"
                  >
                    add another
                  </button>
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Two-column: Form + Preview ────────────────────────── */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8"
              >
                {/* Title */}
                <Field
                  label="Service Title"
                  required
                  error={errors.title?.message}
                >
                  <input
                    {...register("title", { required: "Title is required" })}
                    placeholder="e.g. Frontend Development"
                    className={inputCls(!!errors.title)}
                  />
                </Field>

                {/* Description */}
                <Field
                  label="Description"
                  hint={`${(watchAll.description || "").length}/220`}
                  required
                  error={errors.description?.message}
                >
                  <textarea
                    rows={4}
                    {...register("description", {
                      required: "Description is required",
                      maxLength: { value: 220, message: "Max 220 characters" },
                    })}
                    placeholder="Describe what this service involves and the value it delivers…"
                    className={`${inputCls(!!errors.description)} resize-none`}
                  />
                </Field>

                {/* Icon Picker */}
                <Field label="Icon" required error={errors.icon?.message}>
                  <div className="grid grid-cols-5 gap-3">
                    {ICON_OPTIONS.map((opt) => {
                      const selected = watchAll.icon === opt.value;
                      return (
                        <label
                          key={opt.value}
                          className={`
                            cursor-pointer flex flex-col items-center gap-2 p-3 rounded-2xl border
                            transition-all duration-200
                            ${
                              selected
                                ? "bg-primary text-primary-foreground border-primary shadow-md"
                                : "bg-card border-border text-muted-foreground hover:border-ring/50 hover:text-foreground"
                            }
                          `}
                        >
                          <input
                            type="radio"
                            value={opt.value}
                            {...register("icon", { required: true })}
                            className="sr-only"
                          />
                          <span className="text-xl">{opt.icon}</span>
                          <span className="text-[10px] font-bold uppercase tracking-wider">
                            {opt.label}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </Field>

                {/* Tags */}
                <Field
                  label="Tech Tags"
                  hint="Max 5"
                  error={errors.tags?.message}
                >
                  <div className="space-y-3">
                    {fields.map((field, index) => (
                      <motion.div
                        key={field.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="flex items-center gap-3"
                      >
                        <input
                          {...register(`tags.${index}.value`, {
                            required: "Tag cannot be empty",
                          })}
                          placeholder={`Tag ${index + 1} — e.g. React`}
                          className={inputCls(!!errors.tags?.[index]?.value)}
                        />
                        {fields.length > 1 && (
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="p-2.5 rounded-xl border border-border text-muted-foreground hover:text-destructive hover:border-destructive/30 hover:bg-destructive/5 transition-all duration-200 flex-shrink-0"
                          >
                            <FiX size={16} />
                          </button>
                        )}
                      </motion.div>
                    ))}

                    {fields.length < 5 && (
                      <button
                        type="button"
                        onClick={() => append({ value: "" })}
                        className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
                      >
                        <FiPlus size={16} />
                        Add tag
                      </button>
                    )}
                  </div>
                </Field>

                {/* Submit Row */}
                <motion.div className="flex items-center justify-between pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground font-mono">
                    {isDirty ? "● Unsaved changes" : "✓ No changes"}
                  </p>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleReset}
                      disabled={!isDirty || isSubmitting}
                      className="px-5 py-2.5 rounded-xl text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-muted border border-border transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Discard
                    </button>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-md"
                    >
                      {isSubmitting ? (
                        <>
                          <LuLoader size={16} className="animate-spin" />
                          Saving…
                        </>
                      ) : (
                        <>
                          <FiSave size={16} />
                          Add Service
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            </form>

            {/* Live Preview */}
            <div className="lg:sticky lg:top-24 space-y-5">
              <div className="flex items-center gap-3">
                <span className="h-[2px] w-8 bg-border" />
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Live Preview
                </span>
              </div>
              <PreviewCard
                title={watchAll.title}
                description={watchAll.description}
                tags={watchAll.tags || []}
                iconValue={watchAll.icon}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddService;
