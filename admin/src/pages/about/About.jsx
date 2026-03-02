import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm, useFieldArray } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiPlus,
  FiTrash2,
  FiBookOpen,
  FiActivity,
  FiSave,
  FiCpu,
} from "react-icons/fi";
import { LuLoader } from "react-icons/lu";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { aboutValidationSchema } from "../../validators/about/aboutValidation";
import DeleteModal from "../../components/shared/DeleteModal";

const inputCls = (hasError) =>
  `w-full bg-secondary border rounded-2xl py-3 px-4 text-sm text-foreground 
   placeholder:text-muted-foreground focus:outline-none transition-all
   ${hasError ? "border-destructive/50" : "border-border focus:border-primary/50 shadow-sm"}`;

const FieldError = ({ error }) =>
  error ? (
    <p className="text-[10px] text-destructive ml-2 mt-1">{error.message}</p>
  ) : null;

const BentoCard = ({ children, title, icon: Icon, className = "" }) => (
  <div
    className={`bg-card border border-border rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden ${className}`}
  >
    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
      <div className="text-primary">
        <Icon size={18} />
      </div>
      <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
        {title}
      </h3>
    </div>
    {children}
  </div>
);

const UpdateBioForm = ({ initialData }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [deleteConfig, setDeleteConfig] = useState({
    isOpen: false,
    id: null,
    index: null,
    title: "",
  });

  const initiateDelete = (field, index) => {
    // If it's a brand new field not in DB, just remove it instantly
    if (!field._id) {
      remove(index);
      return;
    }
    // Otherwise, open the modal
    setDeleteConfig({
      isOpen: true,
      id: toString(field._id),
      index: index,
      title: field.courseTitle || "this education record",
    });
  };

  const {
    register,
    control,
    handleSubmit,
    reset,
    setError,
    formState: { isSubmitting, isDirty, errors },
  } = useForm({
    defaultValues: initialData || {
      education: [],
    },
    resolver: zodResolver(aboutValidationSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("http://localhost:5000/api/about");
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

  const handleDelete = async (eduId, index) => {
    // If it's a new field not yet saved in DB, just remove from UI
    if (!eduId) {
      remove(index);
      return;
    }

    try {
      const res = await axios.delete(
        `http://localhost:5000/api/about/education/${eduId}`,
        { withCredentials: true },
      );

      if (res.data.success) {
        toast.success(res.data.message || "Education record purged.");
        remove(index); // Sync UI after successful DB deletion
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.patch(
        "http://localhost:5000/api/about/update",
        data,
        { withCredentials: true },
      );

      if (response.data.success) {
        toast.success(response.data.message || "Updated successfully!");
        reset(response.data.data);
      }
    } catch (error) {
      const resData = error.response?.data;
      if (resData?.errors) {
        resData.errors.forEach((err) => {
          setError(err.path.join("."), {
            type: "server",
            message: err.message,
          });
        });
      }
      toast.error(resData?.message || "Something went wrong.");
    }
  };

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <LuLoader className="animate-spin text-primary" size={40} />
      </div>
    );

  return (
    <div className="min-h-screen py-8 px-6 text-foreground">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-7xl mx-auto">
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-[2px] w-10 bg-primary rounded-full" />
            <span className="text-primary font-bold uppercase tracking-[0.3em] text-[10px]">
              System Core / Biography
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tighter">
            Interface{" "}
            <span className="text-muted-foreground italic font-serif">
              Identity.
            </span>
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <BentoCard
            title="Executive Summary"
            icon={FiUser}
            className="md:col-span-8"
          >
            <div className="space-y-6">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-2">
                  Main Headline
                </label>
                <input
                  {...register("title")}
                  className={inputCls(!!errors.title)}
                  placeholder="Design. Code. Iterate."
                />
                <FieldError error={errors.title} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-2">
                  Biography Narrative
                </label>
                <textarea
                  {...register("bio")}
                  rows={6}
                  className={`${inputCls(!!errors.bio)} resize-none italic`}
                  placeholder="Describe your journey..."
                />
                <FieldError error={errors.bio} />
              </div>
            </div>
          </BentoCard>

          <BentoCard
            title="Quick Stats"
            icon={FiActivity}
            className="md:col-span-4"
          >
            <div className="space-y-6">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-2">
                  Experience
                </label>
                <input
                  {...register("experienceYears")}
                  className={inputCls(!!errors.experienceYears)}
                  placeholder="3.5+ Years"
                />
                <FieldError error={errors.experienceYears} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-2">
                  Location
                </label>
                <input
                  {...register("location")}
                  className={inputCls(!!errors.location)}
                  placeholder="Cyprus"
                />
                <FieldError error={errors.location} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-2">
                  Availability
                </label>
                <div className="relative">
                  <select
                    {...register("freelanceStatus")}
                    className={`${inputCls(!!errors.freelanceStatus)} appearance-none cursor-pointer pr-10`}
                  >
                    <option value="available">Available</option>
                    <option value="busy">Busy</option>
                    <option value="unavailable">Unavailable</option>
                  </select>
                  <FiActivity className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                </div>
                <FieldError error={errors.freelanceStatus} />
              </div>
            </div>
          </BentoCard>

          <BentoCard
            title="Academic Timeline"
            icon={FiBookOpen}
            className="md:col-span-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {fields.map((field, index) => (
                  <motion.div
                    key={field.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="p-8 rounded-[2rem] bg-secondary/30 border border-border/50 relative group"
                  >
                    <button
                      type="button"
                      onClick={() => initiateDelete(field, index)}
                      className="absolute cursor-pointer bg-destructive/10 rounded-full top-4 right-4 p-2 text-destructive opacity-0 group-hover:opacity-100 transition-all z-20"
                    >
                      <FiTrash2 size={16} />
                    </button>

                    <DeleteModal
                      isOpen={deleteConfig.isOpen}
                      title={deleteConfig.title}
                      onClose={() =>
                        setDeleteConfig({ ...deleteConfig, isOpen: false })
                      }
                      onConfirm={handleDelete}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2 space-y-1">
                        <label className="text-[9px] font-bold uppercase text-muted-foreground ml-2">
                          Course Title
                        </label>
                        <input
                          {...register(`education.${index}.courseTitle`)}
                          className={inputCls(
                            !!errors.education?.[index]?.courseTitle,
                          )}
                          placeholder="BSc Computer Science"
                        />
                        <FieldError
                          error={errors.education?.[index]?.courseTitle}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold uppercase text-muted-foreground ml-2">
                          Subject
                        </label>
                        <input
                          {...register(`education.${index}.subject`)}
                          className={inputCls(
                            !!errors.education?.[index]?.subject,
                          )}
                          placeholder="Computer Science"
                        />
                        <FieldError
                          error={errors.education?.[index]?.subject}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold uppercase text-muted-foreground ml-2">
                          Institution
                        </label>
                        <input
                          {...register(`education.${index}.institution`)}
                          className={inputCls(
                            !!errors.education?.[index]?.institution,
                          )}
                          placeholder="University"
                        />
                        <FieldError
                          error={errors.education?.[index]?.institution}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold uppercase text-muted-foreground ml-2">
                          From
                        </label>
                        <input
                          {...register(`education.${index}.duration.from`)}
                          className={inputCls(
                            !!errors.education?.[index]?.duration?.from,
                          )}
                          placeholder="2020"
                        />
                        <FieldError
                          error={errors.education?.[index]?.duration?.from}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold uppercase text-muted-foreground ml-2">
                          To
                        </label>
                        <input
                          {...register(`education.${index}.duration.to`)}
                          className={inputCls(
                            !!errors.education?.[index]?.duration?.to,
                          )}
                          placeholder="Present"
                        />
                        <FieldError
                          error={errors.education?.[index]?.duration?.to}
                        />
                      </div>
                      <div className="col-span-2 space-y-1">
                        <label className="text-[9px] font-bold uppercase text-muted-foreground ml-2">
                          Description (optional)
                        </label>
                        <textarea
                          {...register(`education.${index}.description`)}
                          rows={2}
                          className={`${inputCls(false)} resize-none`}
                          placeholder="Brief description..."
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <button
                type="button"
                onClick={() =>
                  append({
                    courseTitle: "",
                    subject: "",
                    institution: "",
                    description: "",
                    duration: { from: "", to: "" },
                  })
                }
                className="h-full min-h-[200px] border-2 border-dashed border-border rounded-[2rem] flex flex-col items-center justify-center gap-3 text-muted-foreground hover:border-primary hover:text-primary transition-all bg-secondary/10 group"
              >
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <FiPlus size={24} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  Add Education
                </span>
              </button>
            </div>
          </BentoCard>
        </div>

        <footer className="mt-8 p-8 bg-card border border-border rounded-[2.5rem] flex flex-col sm:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="flex items-center gap-4">
            <FiCpu
              className={`text-xl ${isDirty ? "text-primary animate-pulse" : "text-muted-foreground"}`}
            />
            <div className="flex flex-col text-[10px] uppercase font-bold tracking-tighter">
              <span className={isDirty ? "text-primary" : "text-foreground"}>
                {isDirty ? "Changes Detected" : "Identity Synchronized"}
              </span>
              <span className="text-[9px] font-mono text-muted-foreground italic font-normal">
                Protocol: Bio_v2.0
              </span>
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="group relative overflow-hidden flex items-center justify-center gap-3 px-10 py-4 bg-primary text-primary-foreground rounded-2xl text-xs font-bold uppercase tracking-widest shadow-xl shadow-primary/20 disabled:opacity-50 w-full sm:w-auto"
          >
            <span className="relative z-10 flex items-center gap-2">
              {isSubmitting ? (
                <LuLoader className="animate-spin text-lg" />
              ) : (
                <FiSave className="text-lg" />
              )}
              Publish Changes
            </span>
          </motion.button>
        </footer>
      </form>
    </div>
  );
};

export default UpdateBioForm;
