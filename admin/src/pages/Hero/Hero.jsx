import React from "react";
import { motion } from "framer-motion";
import { Field } from "../../components/shared/InputField";
import { useForm } from "react-hook-form";
import { FiSave } from "react-icons/fi";
import { LuLoader } from "react-icons/lu";

/* ─── Animation Variants ──────────────────────────────────────────── */
const fadeInRight = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
export const inputCls = (hasError) =>
  `w-full px-4 py-3 rounded-xl bg-muted border text-sm text-foreground
   placeholder:text-muted-foreground
   focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent
   transition-all duration-200
   ${hasError ? "border-destructive" : "border-border hover:border-ring/50"}`;

const Hero = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful, isDirty },
  } = useForm();
  const description = watch("description", "");
  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 1200));
    console.log("Bio updated:", data);
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
              Hero
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Hero{" "}
            <span className="text-muted-foreground italic font-serif">
              Management.
            </span>
          </h1>
          <p className="mt-3 text-muted-foreground text-base">
            Changes will be reflected live on your portfolio.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-10"
          >
            {/* ── Section: Identity ─────────────────────────────── */}
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
                    {...register("subTitle", { required: "Title is required" })}
                    placeholder="Full-Stack Developer"
                    className={inputCls(!!errors.subTitle)}
                  />
                </Field>
                <Field
                  label="Freelance Status"
                  required
                  error={errors.freelance?.message}
                >
                  <select
                    {...register("freelance", { required: true })}
                    className={`${inputCls(!!errors.freelance)} appearance-none cursor-pointer`}
                  >
                    <option value="available">Available</option>
                    <option value="busy">Busy</option>
                    <option value="unavailable">Unavailable</option>
                  </select>
                </Field>
              </div>
              <div className="">
                <Field
                  label="Description"
                  hint={`${description.length}/160`}
                  required
                  error={errors.description?.message}
                >
                  <textarea
                    rows={2}
                    {...register("description", {
                      required: "Short bio is required",
                      maxLength: {
                        value: 160,
                        message: "Keep it under 160 characters",
                      },
                    })}
                    placeholder="One-liner that captures your approach..."
                    className={`${inputCls(!!errors.description)} resize-none`}
                  />
                </Field>
              </div>
            </motion.div>
            <motion.div variants={fadeInRight} className="space-y-6 mt-10">
              <div className="flex items-center gap-2 pb-2 border-b border-border">
                <h2 className="text-xs font-bold uppercase tracking-widest text-primary">
                  Call to action
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Field
                    label="View works text"
                    required
                    error={errors.location?.message}
                  >
                    <input
                      {...register("location", {
                        required: "View works text is required",
                      })}
                      placeholder="View works"
                      className={inputCls(!!errors.location)}
                    />
                  </Field>

                  <Field
                    label="View works link"
                    required
                    error={errors.experience?.message}
                  >
                    <input
                      {...register("experience", {
                        required: "Experience is required",
                        min: { value: 0, message: "Must be 0 or more" },
                      })}
                      placeholder="https://shohagmiah.com/projects"
                      className={inputCls(!!errors.experience)}
                    />
                  </Field>
                </div>
                <div className="space-y-4">
                  <Field
                    label="Download cv Text"
                    required
                    error={errors.location?.message}
                  >
                    <input
                      {...register("location", {
                        required: "Location is required",
                      })}
                      placeholder="Download cv"
                      className={inputCls(!!errors.location)}
                    />
                  </Field>

                  <Field
                    label="Download cv link"
                    required
                    error={errors.experience?.message}
                  >
                    <input
                      {...register("experience", {
                        required: "Experience is required",
                        min: { value: 0, message: "Must be 0 or more" },
                      })}
                      placeholder="https://shohagmiah.com"
                      className={inputCls(!!errors.experience)}
                    />
                  </Field>
                </div>
              </div>
            </motion.div>
            {/* ── Submit Row ────────────────────────────────────── */}
            <motion.div
              variants={fadeInRight}
              className="flex items-center justify-between pt-4 border-t border-border"
            >
              <p className="text-xs text-muted-foreground font-mono">
                {isDirty ? "● Unsaved changes" : "✓ All saved"}
              </p>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => reset()}
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
