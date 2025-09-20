import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

export function useAuth() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await api.get("/auth/me");
      return res.data;
    },
    retry: false,
  });

  return {
    user: data,
    isLoading,
    isAuthenticated: !!data && !isError,
  };
}
