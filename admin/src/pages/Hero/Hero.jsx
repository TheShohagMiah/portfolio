import React from "react";
import { motion } from "framer-motion";
import { Field } from "../../components/shared/InputField";
import { useForm } from "react-hook-form";
import { FiSave } from "react-icons/fi";
import { LuLoader } from "react-icons/lu";
import axios from "axios";

/* ─── Animation Variants ──────────────────────────────────────────── */
const fadeInRight = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

/* ─── Input base classes (Color Refined) ─────────────────────────── */
export const inputCls = (hasError) =>
  `w-full px-4 py-3 rounded-xl bg-muted/50 border text-sm text-foreground
   placeholder:text-muted-foreground
   focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
   transition-all duration-200
   ${hasError ? "border-destructive ring-destructive/10" : "border-border hover:border-muted-foreground/30"}`;

const Hero = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm();

  const description = watch("description", "");

  const onSubmit = async (data) => {
    try {
      const response = await axios.patch(
        "http://localhost:5000/api/hero/update",
        data,
      );

      if (response.status === 200) {
        console.log("Success:", response.data);
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  return (
    <section className="py-10 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        {/* ── Page Header ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="h-[2px] w-12 bg-primary" />
            <span className="text-primary font-bold uppercase tracking-widest text-xs">
              Hero Section
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Hero{" "}
            <span className="text-muted-foreground italic font-serif">
              Management.
            </span>
          </h1>
          <p className="mt-3 text-muted-foreground text-base">
            Configure the first impression visitors get of your portfolio.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-10"
          >
            {/* ── Section: Main Content ─────────────────────────────── */}
            <motion.div variants={fadeInRight} className="space-y-6">
              <div className="grid sm:grid-cols-3 gap-6">
                <Field label="Title" required error={errors.title?.message}>
                  <input
                    {...register("title", { required: "Title is required" })}
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
                    {...register("subTitle", {
                      required: "Sub-title is required",
                    })}
                    placeholder="Full-Stack Developer"
                    className={inputCls(!!errors.subTitle)}
                  />
                </Field>

                <Field
                  label="Freelance Status"
                  required
                  error={errors.freelanceStatus?.message}
                >
                  <select
                    {...register("freelanceStatus", { required: true })}
                    className={`${inputCls(!!errors.freelanceStatus)} appearance-none cursor-pointer`}
                  >
                    <option value="available">Available</option>
                    <option value="busy">Busy</option>
                    <option value="unavailable">Unavailable</option>
                  </select>
                </Field>
              </div>

              <Field
                label="Description"
                hint={`${description.length}/160`}
                required
                error={errors.description?.message}
              >
                <textarea
                  rows={2}
                  {...register("description", {
                    required: "Description is required",
                    maxLength: {
                      value: 160,
                      message: "Keep it under 160 characters",
                    },
                  })}
                  placeholder="One-liner that captures your approach..."
                  className={`${inputCls(!!errors.description)} resize-none`}
                />
              </Field>
            </motion.div>

            {/* ── Section: CTA ────────────────────────────────────── */}
            <motion.div variants={fadeInRight} className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-border">
                <h2 className="text-xs font-bold uppercase tracking-widest text-foreground/70">
                  Call to Action
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
                <div className="space-y-6">
                  <Field
                    label="Primary Button Text"
                    required
                    error={errors.ctaText?.message}
                  >
                    <input
                      {...register("ctaText", {
                        required: "CTA text is required",
                      })}
                      placeholder="View works"
                      className={inputCls(!!errors.ctaText)}
                    />
                  </Field>

                  <Field
                    label="Primary Button Link"
                    required
                    error={errors.ctaLink?.message}
                  >
                    <input
                      {...register("ctaLink", {
                        required: "CTA link is required",
                      })}
                      placeholder="https://shohagmiah.com/projects"
                      className={inputCls(!!errors.ctaLink)}
                    />
                  </Field>
                </div>

                <div className="space-y-6">
                  <Field
                    label="Secondary Button Text"
                    required
                    error={errors.downloadText?.message}
                  >
                    <input
                      {...register("downloadText", {
                        required: "Download text is required",
                      })}
                      placeholder="Download CV"
                      className={inputCls(!!errors.downloadText)}
                    />
                  </Field>

                  <Field
                    label="Secondary Button Link"
                    required
                    error={errors.downloadLink?.message}
                  >
                    <input
                      {...register("downloadLink", {
                        required: "Download link is required",
                      })}
                      placeholder="https://shohagmiah.com/resume.pdf"
                      className={inputCls(!!errors.downloadLink)}
                    />
                  </Field>
                </div>
              </div>
            </motion.div>

            {/* ── Submit Row ────────────────────────────────────── */}
            <motion.div
              variants={fadeInRight}
              className="flex items-center justify-between pt-6 border-t border-border"
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${isDirty ? "bg-primary animate-pulse" : "bg-muted-foreground/30"}`}
                />
                <p className="text-[10px] uppercase font-bold tracking-tighter text-muted-foreground">
                  {isDirty ? "Unsaved changes" : "Hero data synced"}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => reset()}
                  disabled={!isDirty || isSubmitting}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200 disabled:opacity-0"
                >
                  Discard
                </button>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-all duration-200 disabled:opacity-60 disabled:grayscale shadow-lg shadow-primary/10"
                >
                  {isSubmitting ? (
                    <>
                      <LuLoader size={16} className="animate-spin" />
                      Updating…
                    </>
                  ) : (
                    <>
                      <FiSave size={16} />
                      Save Changes
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </form>
      </div>
    </section>
  );
};

export default Hero;
