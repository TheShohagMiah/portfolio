import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  FiSave,
  FiTerminal,
  FiExternalLink,
  FiCpu,
  FiActivity,
} from "react-icons/fi";
import { LuLoader } from "react-icons/lu";
import axios from "axios";
import { Field } from "../../components/shared/InputField";

/* ─── Themed Input Styling ────────────────────────────────────────── */
export const inputCls = (hasError) =>
  `w-full bg-secondary border rounded-2xl py-3 px-4 text-sm text-foreground 
   placeholder:text-muted-foreground focus:outline-none transition-all
   ${hasError ? "border-destructive/50" : "border-border focus:border-primary/50 shadow-sm"}`;

const HeroManagement = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm();

  const description = watch("description", "");

  // Load existing configuration from the Vault
  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/hero");
        reset(data);
      } catch (err) {
        console.error("Initialization Error:", err.message);
      }
    };
    fetchHeroData();
  }, [reset]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.patch(
        "http://localhost:5000/api/hero/update",
        data,
      );
      if (response.status === 200) {
        console.log("Vault Reconfigured:", response.data);
      }
    } catch (error) {
      console.error(
        "Transmission Error:",
        error.response?.data || error.message,
      );
    }
  };

  return (
    <section className="py-8 min-h-screen text-foreground transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-6">
        {/* ── Page Header ─────────────────────────────────────────── */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-[2px] w-10 bg-primary rounded-full" />
            <span className="text-primary font-bold uppercase tracking-[0.3em] text-[10px]">
              System Core / Hero
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tighter">
            Interface{" "}
            <span className="text-muted-foreground italic font-serif">
              Control.
            </span>
          </h1>
          <p className="mt-3 text-muted-foreground text-sm font-sans max-w-lg leading-relaxed">
            Configure the entry point of your digital ecosystem. These
            parameters define your global headline and CTA logic.
          </p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="space-y-10 bg-card p-8 md:p-12 rounded-[3rem] border border-border shadow-2xl relative overflow-hidden">
            {/* Ambient Decoration */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-[80px]" />

            {/* ── Section: Headline Content ─────────────────────────── */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <FiTerminal className="text-primary text-lg" />
                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Headline Content
                </h2>
              </div>

              <div className="grid sm:grid-cols-3 gap-8">
                <Field
                  label="Main Title"
                  required
                  error={errors.title?.message}
                >
                  <input
                    {...register("title", { required: "Required" })}
                    placeholder="Shohag Miah"
                    className={inputCls(!!errors.title)}
                  />
                </Field>

                <Field
                  label="Sub Title"
                  required
                  error={errors.subTitle?.message}
                >
                  <input
                    {...register("subTitle", { required: "Required" })}
                    placeholder="Full-Stack Developer"
                    className={inputCls(!!errors.subTitle)}
                  />
                </Field>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
                    Status
                  </label>
                  <div className="relative">
                    <select
                      {...register("freelanceStatus", { required: true })}
                      className={`${inputCls()} appearance-none cursor-pointer pr-10`}
                    >
                      <option value="available">Available</option>
                      <option value="busy">Busy</option>
                      <option value="unavailable">Unavailable</option>
                    </select>
                    <FiActivity className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-end px-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Introduction
                  </label>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {description.length}/160
                  </span>
                </div>
                <textarea
                  rows={2}
                  {...register("description", {
                    required: "Required",
                    maxLength: 160,
                  })}
                  placeholder="The hook that captures attention..."
                  className={`${inputCls(!!errors.description)} resize-none leading-relaxed italic`}
                />
              </div>
            </div>

            {/* ── Section: Call to Action ───────────────────────────── */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <FiExternalLink className="text-primary text-lg" />
                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Action Triggers
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-10">
                {/* Primary CTA */}
                <div className="space-y-6 bg-secondary/30 p-8 rounded-3xl border border-border/50">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <h3 className="text-[10px] font-bold text-foreground uppercase tracking-widest">
                      Primary Action
                    </h3>
                  </div>
                  <Field label="Label" required error={errors.ctaText?.message}>
                    <input
                      {...register("ctaText", { required: "Required" })}
                      placeholder="View projects"
                      className={inputCls(!!errors.ctaText)}
                    />
                  </Field>
                  <Field
                    label="Endpoint URL"
                    required
                    error={errors.ctaLink?.message}
                  >
                    <input
                      {...register("ctaLink", { required: "Required" })}
                      className={inputCls(!!errors.ctaLink)}
                    />
                  </Field>
                </div>

                {/* Secondary CTA */}
                <div className="space-y-6 bg-secondary/30 p-8 rounded-3xl border border-border/50">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                    <h3 className="text-[10px] font-bold text-foreground uppercase tracking-widest">
                      Secondary Action
                    </h3>
                  </div>
                  <Field
                    label="Label"
                    required
                    error={errors.downloadText?.message}
                  >
                    <input
                      {...register("downloadText", { required: "Required" })}
                      placeholder="Resume"
                      className={inputCls(!!errors.downloadText)}
                    />
                  </Field>
                  <Field
                    label="Resource Link"
                    required
                    error={errors.downloadLink?.message}
                  >
                    <input
                      {...register("downloadLink", { required: "Required" })}
                      className={inputCls(!!errors.downloadLink)}
                    />
                  </Field>
                </div>
              </div>
            </div>

            {/* ── Footer ─────────────────────────────────────────── */}
            <footer className="pt-10 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-4">
                <FiCpu
                  className={`text-xl ${isDirty ? "text-primary animate-pulse" : "text-muted"}`}
                />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-tighter text-foreground">
                    {isDirty ? "Configuration Modified" : "System Synchronized"}
                  </span>
                  <span className="text-[9px] font-mono text-muted-foreground italic">
                    Protocol: Hero_Update_v4.2
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => reset()}
                  disabled={!isDirty || isSubmitting}
                  className="flex-1 sm:flex-none px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-all disabled:opacity-0"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-3 px-10 py-4 bg-primary text-primary-foreground rounded-2xl text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-xl shadow-primary/20 active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <LuLoader className="animate-spin text-lg" />
                  ) : (
                    <FiSave className="text-lg" />
                  )}
                  Save Config
                </button>
              </div>
            </footer>
          </div>
        </form>
      </div>
    </section>
  );
};

export default HeroManagement;
