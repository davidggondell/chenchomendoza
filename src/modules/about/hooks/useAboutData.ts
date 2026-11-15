import { useQuery } from "@tanstack/react-query";
import {
  fetchBio,
  fetchEquipment,
  fetchTrajectoryTimeline,
  fetchPublications,
} from "../services/aboutService";
import type { BioData, EquipmentCategory, TimelineEvent, PublicationItem } from "../types";

export const useBio = () => {
  return useQuery<BioData | null, Error>({
    queryKey: ["about", "bio"],
    queryFn: fetchBio,
    staleTime: 1000 * 60 * 15,
    gcTime: 1000 * 60 * 60,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};

export const useEquipment = () => {
  return useQuery<EquipmentCategory[], Error>({
    queryKey: ["about", "equipment"],
    queryFn: fetchEquipment,
    staleTime: 1000 * 60 * 15,
    gcTime: 1000 * 60 * 60,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};

export const useTrajectoryTimeline = () => {
  return useQuery<TimelineEvent[], Error>({
    queryKey: ["about", "trajectory-timeline"],
    queryFn: fetchTrajectoryTimeline,
    staleTime: 1000 * 60 * 15,
    gcTime: 1000 * 60 * 60,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};

export const usePublications = () => {
  return useQuery<PublicationItem[], Error>({
    queryKey: ["about", "publications"],
    queryFn: fetchPublications,
    staleTime: 1000 * 60 * 15,
    gcTime: 1000 * 60 * 60,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};
