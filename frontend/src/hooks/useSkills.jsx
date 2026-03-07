import { useState, useEffect, useCallback } from "react";
import axios from "axios";

/**
 * useSkills
 * Fetches all skills data from the API.
 *
 * Expected API shape — GET /api/skills:
 * {
 *   success: true,
 *   data: {
 *     categories: [
 *       {
 *         _id: string,
 *         label: string,          // "Frontend"
 *         tabIcon: string,        // icon name e.g. "FaReact"
 *         skills: [
 *           { _id, name, level: number (0-100), icon: string, color: string }
 *         ]
 *       }
 *     ],
 *     softSkills:     string[],
 *     certifications: { _id, title, issuer, url? }[],
 *     techStack:      { icon: string, color: string | null }[],
 *   }
 * }
 */
const useSkills = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSkills = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/skills`,
        { withCredentials: true },
      );
      if (res.data.success) {
        setData(res.data.data);
      } else {
        throw new Error(res.data.message || "Failed to load skills");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  return { data, loading, error, refetch: fetchSkills };
};

export default useSkills;
