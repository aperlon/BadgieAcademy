"use client";

import { useState, useEffect, useCallback } from "react";
import { getProgress, saveProgress, ProgressData } from "@/lib/storage";
import { sectionsData, getTotalSubsections } from "@/lib/sections-data";

export interface UseProgressReturn {
  completed: string[];
  globalProgress: number;
  getSectionProgress: (sectionId: string) => number;
  isSectionComplete: (sectionId: string) => boolean;
  isSubsectionComplete: (subsectionId: string) => boolean;
  markComplete: (subsectionId: string) => void;
  resetProgress: () => void;
}

export const useProgress = (): UseProgressReturn => {
  const [completed, setCompleted] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const progress = getProgress();
    setCompleted(progress.completed);
    setIsLoaded(true);
  }, []);

  const totalSubsections = getTotalSubsections();

  const globalProgress = isLoaded
    ? Math.round((completed.length / totalSubsections) * 100)
    : 0;

  const getSectionProgress = useCallback(
    (sectionId: string): number => {
      const section = sectionsData.find((s) => s.id === sectionId);
      if (!section) return 0;

      const sectionSubsectionIds = section.subsections.map((sub) => sub.id);
      const completedInSection = completed.filter((id) =>
        sectionSubsectionIds.includes(id)
      ).length;

      return Math.round(
        (completedInSection / section.subsections.length) * 100
      );
    },
    [completed]
  );

  const isSectionComplete = useCallback(
    (sectionId: string): boolean => {
      return getSectionProgress(sectionId) === 100;
    },
    [getSectionProgress]
  );

  const isSubsectionComplete = useCallback(
    (subsectionId: string): boolean => {
      return completed.includes(subsectionId);
    },
    [completed]
  );

  const markComplete = useCallback((subsectionId: string): void => {
    setCompleted((prev) => {
      if (prev.includes(subsectionId)) return prev;

      const newCompleted = [...prev, subsectionId];
      const progressData: ProgressData = { completed: newCompleted };
      saveProgress(progressData);
      return newCompleted;
    });
  }, []);

  const resetProgress = useCallback((): void => {
    setCompleted([]);
    saveProgress({ completed: [] });
  }, []);

  return {
    completed,
    globalProgress,
    getSectionProgress,
    isSectionComplete,
    isSubsectionComplete,
    markComplete,
    resetProgress,
  };
};
