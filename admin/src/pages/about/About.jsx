import React from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiMapPin,
  FiBriefcase,
  FiSave,
  FiCheckCircle,
  FiGlobe,
  FiLinkedin,
  FiGithub,
  FiTerminal,
} from "react-icons/fi";
import { LuLoader } from "react-icons/lu";

/* ─── Themed Input Styling ────────────────────────────────────────── */
export const inputCls = (hasError) =>
  `w-full bg-secondary border rounded-2xl py-3 px-4 text-sm text-foreground 
   placeholder:text-muted-foreground focus:outline-none transition-all
   ${hasError ? "border-destructive/50" : "border-border focus:border-primary/50 shadow-sm"}`;

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
    // Artificial delay for that "Saving to Vault" feeling
    await new Promise((r) => setTimeout(r, 1500));
    console.log("Bio updated:", data);
  };

  return (
    <section className="py-8 min-h-screen text-foreground transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-6">
        {/* ── Header ────────────────────────────────────────────────── */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tighter">
            Edit{" "}
            <span className="text-muted-foreground italic font-serif">
              Identity.
            </span>
          </h1>
          <p className="text-muted-foreground text-sm mt-2 font-sans">
            Curate your professional narrative and contact touchpoints.
          </p>
        </header>

        {/* ── Success Banner ────────────────────────────────────────── */}
        <AnimatePresence>
          {isSubmitSuccessful && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="mb-8 flex items-center gap-3 px-6 py-4 rounded-2xl bg-chart-2/10 border border-chart-2/20 text-chart-2 shadow-lg shadow-chart-2/5"
            >
              <FiCheckCircle size={18} />
              <span className="text-xs font-bold uppercase tracking-[0.2em]">
                Identity Synced to Cloud
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-12 bg-card p-8 md:p-12 rounded-[3rem] border border-border shadow-2xl relative overflow-hidden"
        >
          {/* Subtle Background Accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] -z-10" />

          {/* ── Identity Section ────────────────────────────────────── */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 pb-4 border-b border-border">
              <FiUser className="text-primary text-lg" />
              <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                Core Profile
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
                  Legal Name
                </label>
                <input
                  {...register("name", { required: true })}
                  className={inputCls(!!errors.name)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
                  Professional Title
                </label>
                <input
                  {...register("title", { required: true })}
                  className={inputCls(!!errors.title)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
                  Direct Email
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className={inputCls(!!errors.email)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
                  Availability
                </label>
                <div className="relative group">
                  <select
                    {...register("freelance")}
                    className={`${inputCls()} appearance-none cursor-pointer pr-10 font-sans`}
                  >
                    <option value="available">🟢 Available for Projects</option>
                    <option value="busy">🟡 Currently Engaged</option>
                    <option value="unavailable">🔴 Not Accepting Work</option>
                  </select>
                  <FiTerminal className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none group-hover:text-primary transition-colors" />
                </div>
              </div>
            </div>
          </div>

          {/* ── Narrative Section ───────────────────────────────────── */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 pb-4 border-b border-border">
              <FiBriefcase className="text-primary text-lg" />
              <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                Storytelling
              </h2>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-end px-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Elevator Pitch (Short Bio)
                </label>
                <span className="text-[10px] font-mono text-muted-foreground">
                  {shortBio.length}/160
                </span>
              </div>
              <textarea
                rows={2}
                {...register("shortBio", { maxLength: 160 })}
                className={`${inputCls(!!errors.shortBio)} resize-none font-sans italic`}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-end px-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  The Long Read (Full Bio)
                </label>
                <span className="text-[10px] font-mono text-muted-foreground">
                  {longBio.length}/600
                </span>
              </div>
              <textarea
                rows={5}
                {...register("longBio", { maxLength: 600 })}
                className={`${inputCls(!!errors.longBio)} resize-y font-sans leading-relaxed`}
              />
            </div>
          </div>

          {/* ── Connections ─────────────────────────────────────────── */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 pb-4 border-b border-border">
              <FiGlobe className="text-primary text-lg" />
              <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                Digital Touchpoints
              </h2>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              <div className="relative group">
                <FiGithub className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary" />
                <input
                  {...register("github")}
                  placeholder="Github"
                  className={`${inputCls()} pl-11`}
                />
              </div>
              <div className="relative group">
                <FiLinkedin className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary" />
                <input
                  {...register("linkedin")}
                  placeholder="LinkedIn"
                  className={`${inputCls()} pl-11`}
                />
              </div>
              <div className="relative group">
                <FiGlobe className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary" />
                <input
                  {...register("website")}
                  placeholder="Website"
                  className={`${inputCls()} pl-11`}
                />
              </div>
            </div>
          </div>

          {/* ── Footer / Submit ────────────────────────────────────── */}
          <footer className="pt-10 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div
                className={`h-2 w-2 rounded-full ${isDirty ? "bg-chart-3 animate-pulse shadow-[0_0_10px_rgba(var(--chart-3),0.5)]" : "bg-muted"}`}
              />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-tighter text-foreground">
                  {isDirty ? "Unsaved Changes" : "Cloud Synchronized"}
                </span>
                <span className="text-[9px] font-mono text-muted-foreground italic">
                  Last sync: Today at{" "}
                  {new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
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
                className="flex-1 sm:flex-none flex items-center justify-center gap-3 px-10 py-4 bg-primary text-primary-foreground rounded-2xl text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-xl shadow-primary/10 active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <LuLoader className="animate-spin text-lg" />
                ) : (
                  <FiSave className="text-lg" />
                )}
                Sync Identity
              </button>
            </div>
          </footer>
        </form>
      </div>
    </section>
  );
};

export default UpdateBioForm;
