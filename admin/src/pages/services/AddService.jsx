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
  FiCheckCircle,
  FiPlus,
  FiX,
} from "react-icons/fi";
import { LuLoader } from "react-icons/lu";
import { Field } from "../../components/shared/InputField";
import toast from "react-hot-toast";
import axios from "axios";

/* ─── Shared Icon Dictionary ────────────────────────────────────── */
const ICON_OPTIONS = [
  { value: "FiLayout", label: "Layout", icon: <FiLayout /> },
  { value: "FiServer", label: "Server", icon: <FiServer /> },
  { value: "FiLayers", label: "Layers", icon: <FiLayers /> },
  { value: "FiZap", label: "Zap", icon: <FiZap /> },
  { value: "FiCode", label: "Code", icon: <FiCode /> },
];

/* ─── Semantic Input Styling ────────────────────────────────────── */
export const inputCls = (hasError) =>
  `w-full bg-secondary border rounded-2xl py-3 px-4 text-sm text-foreground 
   placeholder:text-muted-foreground focus:outline-none transition-all
   ${hasError ? "border-destructive/50" : "border-border focus:border-primary/50"}`;

/* ─── Live Preview Card ─────────────────────────────────────────── */
const PreviewCard = ({ title, description, tags, iconValue }) => {
  const found = ICON_OPTIONS.find((o) => o.value === iconValue);
  return (
    <motion.div
      layout
      className="group relative bg-card p-8 rounded-[2.5rem] border border-border hover:border-primary/30 transition-all duration-500 shadow-xl"
    >
      <div className="mb-8 w-14 h-14 rounded-2xl bg-secondary border border-border flex items-center justify-center text-2xl text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-all">
        {found?.icon ?? <FiLayout />}
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
};

/* ─── Main Factory Component ────────────────────────────────────── */
const AddService = () => {
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
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

  const onSubmit = async (data) => {
    try {
      const formattedData = {
        ...data,
        // Convert [{value: "React"}] to ["React"]
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
      // 1. Log the full response to see what the backend is complaining about
      console.error("Backend Error Data:", error.response?.data);

      const backendMessage =
        error.response?.data?.message || "Validation Error";
      const backendErrors = error.response?.data?.errors; // If your API returns an errors object

      // 2. Map specific errors to fields
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
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tighter">
            Service{" "}
            <span className="text-muted-foreground italic font-serif text-3xl">
              Factory.
            </span>
          </h1>
          <p className="text-muted-foreground text-sm mt-2 font-sans">
            {" "}
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
          {/* Input Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8 bg-card p-10 rounded-[3rem] border border-border shadow-sm"
          >
            <div className="space-y-6">
              <div className="space-y-2">
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
              </div>

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

              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
                  Visual Anchor (Icon)
                </label>
                <div className="grid grid-cols-5 gap-3">
                  {ICON_OPTIONS.map((opt) => (
                    <label
                      key={opt.value}
                      className={`cursor-pointer flex flex-col items-center justify-center aspect-square rounded-2xl border transition-all ${watchAll.icon === opt.value ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20" : "bg-secondary border-border text-muted-foreground hover:border-primary/50"}`}
                    >
                      <input
                        type="radio"
                        value={opt.value}
                        {...register("icon")}
                        className="sr-only"
                      />
                      <span className="text-xl">{opt.icon}</span>
                    </label>
                  ))}
                </div>
              </div>

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
                            className={`flex items-center bg-card rounded-xl px-4 py-2 border transition-colors shadow-sm
                                          ${
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

          {/* Sidebar Preview */}
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
              iconValue={watchAll.icon}
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
    </section>
  );
};

export default AddService;
