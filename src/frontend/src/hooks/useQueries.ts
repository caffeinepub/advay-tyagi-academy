import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useGetAllMasterclasses() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["masterclasses"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getAllMasterclasses();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllGeopoliticsLessons() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["geopolitics"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getAllGeopoliticsLessons();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllEbooks() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["ebooks"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getAllEbooks();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useEnrollInMasterclass() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (masterclassId: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.enrollInMasterclass(masterclassId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["masterclasses"] });
    },
  });
}
