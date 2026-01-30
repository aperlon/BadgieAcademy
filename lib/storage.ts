const STORAGE_KEY = "badgie-academy-progress";

export interface ProgressData {
  completed: string[];
}

export const getProgress = (): ProgressData => {
  if (typeof window === "undefined") {
    return { completed: [] };
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error reading progress from localStorage:", error);
  }

  return { completed: [] };
};

export const saveProgress = (data: ProgressData): void => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving progress to localStorage:", error);
  }
};

export const markSubsectionComplete = (subsectionId: string): ProgressData => {
  const progress = getProgress();

  if (!progress.completed.includes(subsectionId)) {
    progress.completed.push(subsectionId);
    saveProgress(progress);
  }

  return progress;
};

export const isSubsectionComplete = (subsectionId: string): boolean => {
  const progress = getProgress();
  return progress.completed.includes(subsectionId);
};

export const resetProgress = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
};
