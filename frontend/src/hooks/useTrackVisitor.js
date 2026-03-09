import { useEffect } from "react";
import axiosInstance from "../lib/axios";

const useTrackVisitor = (page = "/") => {
  useEffect(() => {
    axiosInstance.post("/api/visitors/track", { page }).catch(() => {
      // silently fail — don't break the UI
    });
  }, [page]);
};

export default useTrackVisitor;
