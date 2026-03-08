import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { FiSave, FiTerminal, FiExternalLink, FiActivity } from "react-icons/fi";
import { LuLoader } from "react-icons/lu";
import axios from "axios";
import { Field } from "../../components/shared/InputField";
import { toast } from "react-hot-toast";
import PageHeader from "../../components/shared/PageHeader";

export const inputCls = (hasError) =>
  `w-full bg-secondary border rounded-2xl py-3 px-4 text-sm text-foreground 
   placeholder:text-muted-foreground focus:outline-none transition-all
   ${hasError ? "border-destructive/50" : "border-border focus:border-primary/50 shadow-sm"}`;

const HeroManagement = () => {
  const [isLoading, setIsLoading] = useState(true);
  const lastSavedData = useRef(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    defaultValues: {
      freelanceStatus: "available",
    },
  });
  const currentValues = watch();
  console.log("Current Form State:", currentValues);
  const description = watch("description", "");

  // Load existing configuration
  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("http://localhost:5000/api/hero");

        const heroPayload = res.data?.data;

        if (heroPayload) {
          reset(heroPayload);
        }
      } catch (err) {
        toast.error("Failed to connect to the System Core");
      } finally {
        setIsLoading(false);
      }
    };
    fetchHeroData();
  }, [reset]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.patch(
        "http://localhost:5000/api/hero/update",
        data,
        { withCredentials: true },
      );

      if (response.data.success) {
        toast.success(response.data.message);
        reset(response.data.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Transmission Interrupted");
    }
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <LuLoader className="animate-spin text-primary text-4xl mb-4" />
        <span className="text-[10px] font-bold uppercase tracking-[0.4em] animate-pulse">
          Loading...
        </span>
      </div>
    );

  return (
    <section className="py-8 min-h-screen text-foreground">
      <div className="max-w-4xl mx-auto px-6">
        <PageHeader title="Hero Management" />
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="space-y-10 bg-card p-8 md:p-12 rounded-[3rem] border border-border shadow-2xl relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-[80px]" />

            <div className="space-y-8">
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <FiTerminal className="text-primary text-lg" />
                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Headline Content
                </h2>
              </div>

              <div className="grid sm:grid-cols-3 gap-8">
                <Field label="Main Title" error={errors.title?.message}>
                  <input
                    {...register("title", { required: "Required" })}
                    className={inputCls(!!errors.title)}
                  />
                </Field>

                <Field label="Sub Title" error={errors.subTitle?.message}>
                  <input
                    {...register("subTitle", { required: "Required" })}
                    className={inputCls(!!errors.subTitle)}
                  />
                </Field>

                <Field label="Freelance Status">
                  <select
                    {...register("freelanceStatus")}
                    className={`${inputCls(!!errors.freelanceStatus)} appearance-none cursor-pointer pr-10`}
                  >
                    <option value="available">Available</option>
                    <option value="busy">Busy</option>
                    <option value="unavailable">Unavailable</option>
                  </select>
                </Field>
              </div>

              <Field label="Introduction" error={errors.description?.message}>
                <textarea
                  rows={4}
                  {...register("description", {
                    required: "Required",
                    maxLength: 160,
                  })}
                  className={`${inputCls(!!errors.description)} resize-none italic`}
                />
              </Field>
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <FiExternalLink className="text-primary text-lg" />
                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Action Triggers
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-10">
                <div className="space-y-6 bg-secondary/30 p-8 rounded-3xl border border-border/50">
                  <h3 className="text-[10px] font-bold text-foreground uppercase tracking-widest">
                    Primary Action
                  </h3>
                  <Field label="Label" error={errors.ctaText?.message}>
                    <input {...register("ctaText")} className={inputCls()} />
                  </Field>
                  <Field label="Endpoint URL" error={errors.ctaLink?.message}>
                    <input {...register("ctaLink")} className={inputCls()} />
                  </Field>
                </div>
                <div className="space-y-6 bg-secondary/30 p-8 rounded-3xl border border-border/50">
                  <h3 className="text-[10px] font-bold text-foreground uppercase tracking-widest">
                    Secondary Action
                  </h3>
                  <Field label="Label" error={errors.downloadText?.message}>
                    <input
                      {...register("downloadText")}
                      className={inputCls()}
                    />
                  </Field>
                  <Field
                    label="Resource Link"
                    error={errors.downloadLink?.message}
                  >
                    <input
                      {...register("downloadLink")}
                      className={inputCls()}
                    />
                  </Field>
                </div>
              </div>
            </div>

            <footer className="pt-10 border-t border-border flex flex-col sm:flex-row items-end justify-between gap-8">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => reset(lastSavedData.current)}
                  disabled={!isDirty || isSubmitting}
                  className="px-6 py-3 text-[10px] font-bold uppercase text-muted-foreground hover:text-foreground disabled:opacity-0 transition-all"
                >
                  Discard
                </button>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative overflow-hidden flex items-center justify-center gap-3 px-10 py-4 bg-primary text-primary-foreground rounded-2xl text-xs font-bold uppercase tracking-widest shadow-xl shadow-primary/20 disabled:opacity-50"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isSubmitting ? (
                      <LuLoader className="animate-spin text-lg" />
                    ) : (
                      <FiSave className="text-lg" />
                    )}{" "}
                    Save Info
                  </span>
                </motion.button>
              </div>
            </footer>
          </div>
        </form>
      </div>
    </section>
  );
};

export default HeroManagement;
