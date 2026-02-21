import React from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiMapPin,
  FiBriefcase,
  FiSave,
  FiCheckCircle,
} from "react-icons/fi";
import { LuLoader } from "react-icons/lu";
import { Field } from "../../components/shared/InputField";

/* ─── Animation Variants ──────────────────────────────────────────── */
const fadeInRight = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

/* ─── Input base classes (Color Refinement) ─────────────────────── */
export const inputCls = (hasError) =>
  `w-full px-4 py-3 rounded-xl bg-muted/50 border text-sm text-foreground
   placeholder:text-muted-foreground
   focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
   transition-all duration-200
   ${hasError ? "border-destructive ring-destructive/10" : "border-border hover:border-muted-foreground/30"}`;

/* ─── UpdateBioForm ───────────────────────────────────────────────── */
const UpdateBioForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful, isDirty },
    reset,
  } = useForm({
    defaultValues: {
      name: "Shohag Miah",
      title: "Full-Stack Developer",
      email: "admin@shohag.com",
      freelance: "available",
      location: "Limassol, Cyprus",
      experience: "3.5",
      shortBio:
        "I build digital products that are as robust under the hood as they are intuitive on the surface.",
      longBio:
        "What started as a fascination with electronics technology has evolved into a career dedicated to the web ecosystem.",
      github: "https://github.com/shohaag",
      linkedin: "",
      website: "",
    },
  });

  const longBio = watch("longBio", "");
  const shortBio = watch("shortBio", "");

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
              Admin Panel
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Update{" "}
            <span className="text-muted-foreground italic font-serif">
              Bio.
            </span>
          </h1>
          <p className="mt-3 text-muted-foreground text-base">
            Changes will be reflected live on your portfolio.
          </p>
        </motion.div>

        {/* ── Success Banner (Color Refinement) ───────────────────── */}
        <AnimatePresence>
          {isSubmitSuccessful && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mb-8 flex items-center gap-3 px-5 py-4 rounded-2xl bg-primary/5 border border-primary/20 text-sm font-medium"
            >
              <FiCheckCircle className="text-primary flex-shrink-0" size={18} />
              <span className="text-foreground">
                Bio updated successfully —{" "}
                <button
                  onClick={() => reset()}
                  className="text-primary font-bold underline underline-offset-4 hover:opacity-80"
                >
                  make another edit
                </button>
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-10"
          >
            {/* ── Section: Identity ─────────────────────────────── */}
            <motion.div variants={fadeInRight} className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-border">
                <FiUser size={16} className="text-primary" />
                <h2 className="text-xs font-bold uppercase tracking-widest text-foreground/80">
                  Identity
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <Field label="Full Name" required error={errors.name?.message}>
                  <input
                    {...register("name", { required: "Name is required" })}
                    placeholder="Shohag Miah"
                    className={inputCls(!!errors.name)}
                  />
                </Field>

                <Field label="Job Title" required error={errors.title?.message}>
                  <input
                    {...register("title", { required: "Title is required" })}
                    placeholder="Full-Stack Developer"
                    className={inputCls(!!errors.title)}
                  />
                </Field>

                <Field label="Email" required error={errors.email?.message}>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Invalid email address",
                      },
                    })}
                    placeholder="admin@shohag.com"
                    className={inputCls(!!errors.email)}
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
            </motion.div>

            {/* ── Section: Location & Stats ─────────────────────── */}
            <motion.div variants={fadeInRight} className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-border">
                <FiMapPin size={16} className="text-primary" />
                <h2 className="text-xs font-bold uppercase tracking-widest text-foreground/80">
                  Location & Stats
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <Field
                  label="Location"
                  required
                  error={errors.location?.message}
                >
                  <input
                    {...register("location", {
                      required: "Location is required",
                    })}
                    placeholder="Cyprus"
                    className={inputCls(!!errors.location)}
                  />
                </Field>

                <Field
                  label="Years of Experience"
                  hint="e.g. 3.5"
                  required
                  error={errors.experience?.message}
                >
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    {...register("experience", {
                      required: "Experience is required",
                      min: { value: 0, message: "Must be 0 or more" },
                    })}
                    placeholder="3.5"
                    className={inputCls(!!errors.experience)}
                  />
                </Field>
              </div>
            </motion.div>

            {/* ── Section: Bio Content ──────────────────────────── */}
            <motion.div variants={fadeInRight} className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-border">
                <FiBriefcase size={16} className="text-primary" />
                <h2 className="text-xs font-bold uppercase tracking-widest text-foreground/80">
                  Bio Content
                </h2>
              </div>

              <Field
                label="Short Bio"
                hint={`${shortBio.length}/160`}
                required
                error={errors.shortBio?.message}
              >
                <textarea
                  rows={2}
                  {...register("shortBio", {
                    required: "Short bio is required",
                    maxLength: {
                      value: 160,
                      message: "Keep it under 160 characters",
                    },
                  })}
                  placeholder="One-liner that captures your approach..."
                  className={`${inputCls(!!errors.shortBio)} resize-none`}
                />
              </Field>

              <Field
                label="Long Bio"
                hint={`${longBio.length}/600`}
                required
                error={errors.longBio?.message}
              >
                <textarea
                  rows={5}
                  {...register("longBio", {
                    required: "Long bio is required",
                    maxLength: {
                      value: 600,
                      message: "Keep it under 600 characters",
                    },
                  })}
                  placeholder="Tell your story..."
                  className={`${inputCls(!!errors.longBio)} resize-y`}
                />
              </Field>
            </motion.div>

            {/* ── Section: Social Links ─────────────────────────── */}
            <motion.div variants={fadeInRight} className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-border">
                <span className="text-primary text-xs font-bold">{"</>"}</span>
                <h2 className="text-xs font-bold uppercase tracking-widest text-foreground/80">
                  Social Links
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  {
                    name: "github",
                    label: "GitHub",
                    placeholder: "https://github.com/username",
                  },
                  {
                    name: "linkedin",
                    label: "LinkedIn",
                    placeholder: "https://linkedin.com/in/username",
                  },
                  {
                    name: "website",
                    label: "Website",
                    placeholder: "https://yoursite.com",
                  },
                ].map(({ name, label, placeholder }) => (
                  <Field key={name} label={label} error={errors[name]?.message}>
                    <input
                      type="url"
                      {...register(name, {
                        pattern: {
                          value: /^(https?:\/\/).+/,
                          message: "Must start with https://",
                        },
                      })}
                      placeholder={placeholder}
                      className={inputCls(!!errors[name])}
                    />
                  </Field>
                ))}
              </div>
            </motion.div>

            {/* ── Submit Row ────────────────────────────────────── */}
            <motion.div
              variants={fadeInRight}
              className="flex items-center justify-between pt-4 border-t border-border"
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${isDirty ? "bg-primary animate-pulse" : "bg-muted-foreground/30"}`}
                />
                <p className="text-[10px] uppercase font-bold tracking-tighter text-muted-foreground">
                  {isDirty ? "Unsaved changes" : "All changes saved"}
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

export default UpdateBioForm;
