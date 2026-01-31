"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Header } from "@/components/Header";
import { SectionCard } from "@/components/SectionCard";
import { SubsectionModal } from "@/components/SubsectionModal";
import { CelebrationModal } from "@/components/CelebrationModal";
import { sectionsData, Subsection } from "@/lib/sections-data";
import { useProgress } from "@/hooks/useProgress";

export default function Home() {
  const {
    globalProgress,
    getSectionProgress,
    isSectionComplete,
    isSubsectionComplete,
    markComplete,
  } = useProgress();

  const [modalOpen, setModalOpen] = useState(false);
  const [currentSubsection, setCurrentSubsection] = useState<Subsection | null>(
    null
  );
  const [currentSectionId, setCurrentSectionId] = useState<string | null>(null);

  // Celebration state
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationSectionTitle, setCelebrationSectionTitle] = useState("");
  const previousSectionProgress = useRef<Record<string, number>>({});

  // Track section progress changes to detect completion
  useEffect(() => {
    sectionsData.forEach((section) => {
      const currentProgress = getSectionProgress(section.id);
      const prevProgress = previousSectionProgress.current[section.id] || 0;

      // If section just reached 100% and wasn't 100% before
      if (currentProgress === 100 && prevProgress < 100 && prevProgress > 0) {
        setCelebrationSectionTitle(section.title);
        setShowCelebration(true);
      }

      previousSectionProgress.current[section.id] = currentProgress;
    });
  }, [getSectionProgress]);

  const handleSubsectionClick = useCallback(
    (subsection: Subsection, sectionId: string) => {
      setCurrentSubsection(subsection);
      setCurrentSectionId(sectionId);
      setModalOpen(true);
    },
    []
  );

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setCurrentSubsection(null);
    setCurrentSectionId(null);
  }, []);

  const handleNext = useCallback(() => {
    if (!currentSubsection || !currentSectionId) return;

    const section = sectionsData.find((s) => s.id === currentSectionId);
    if (!section) return;

    const currentIndex = section.subsections.findIndex(
      (sub) => sub.id === currentSubsection.id
    );

    if (currentIndex < section.subsections.length - 1) {
      setCurrentSubsection(section.subsections[currentIndex + 1]);
    } else {
      const sectionIndex = sectionsData.findIndex(
        (s) => s.id === currentSectionId
      );
      if (sectionIndex < sectionsData.length - 1) {
        const nextSection = sectionsData[sectionIndex + 1];
        setCurrentSectionId(nextSection.id);
        setCurrentSubsection(nextSection.subsections[0]);
      } else {
        handleCloseModal();
      }
    }
  }, [currentSubsection, currentSectionId, handleCloseModal]);

  const handlePrevious = useCallback(() => {
    if (!currentSubsection || !currentSectionId) return;

    const section = sectionsData.find((s) => s.id === currentSectionId);
    if (!section) return;

    const currentIndex = section.subsections.findIndex(
      (sub) => sub.id === currentSubsection.id
    );

    if (currentIndex > 0) {
      setCurrentSubsection(section.subsections[currentIndex - 1]);
    } else {
      const sectionIndex = sectionsData.findIndex(
        (s) => s.id === currentSectionId
      );
      if (sectionIndex > 0) {
        const prevSection = sectionsData[sectionIndex - 1];
        setCurrentSectionId(prevSection.id);
        setCurrentSubsection(
          prevSection.subsections[prevSection.subsections.length - 1]
        );
      }
    }
  }, [currentSubsection, currentSectionId]);

  const hasNextSubsection = useCallback((): boolean => {
    if (!currentSubsection || !currentSectionId) return false;

    const section = sectionsData.find((s) => s.id === currentSectionId);
    if (!section) return false;

    const currentIndex = section.subsections.findIndex(
      (sub) => sub.id === currentSubsection.id
    );

    if (currentIndex < section.subsections.length - 1) return true;

    const sectionIndex = sectionsData.findIndex(
      (s) => s.id === currentSectionId
    );
    return sectionIndex < sectionsData.length - 1;
  }, [currentSubsection, currentSectionId]);

  const hasPreviousSubsection = useCallback((): boolean => {
    if (!currentSubsection || !currentSectionId) return false;

    const section = sectionsData.find((s) => s.id === currentSectionId);
    if (!section) return false;

    const currentIndex = section.subsections.findIndex(
      (sub) => sub.id === currentSubsection.id
    );

    if (currentIndex > 0) return true;

    const sectionIndex = sectionsData.findIndex(
      (s) => s.id === currentSectionId
    );
    return sectionIndex > 0;
  }, [currentSubsection, currentSectionId]);

  const handleCloseCelebration = useCallback(() => {
    setShowCelebration(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header globalProgress={globalProgress} />

      <main className="max-w-2xl mx-auto px-4 py-6">
        <div className="space-y-4">
          {sectionsData.map((section) => (
            <SectionCard
              key={section.id}
              section={section}
              progress={getSectionProgress(section.id)}
              isComplete={isSectionComplete(section.id)}
              isSubsectionComplete={isSubsectionComplete}
              onSubsectionClick={(subsection) =>
                handleSubsectionClick(subsection, section.id)
              }
            />
          ))}
        </div>
      </main>

      <SubsectionModal
        subsection={currentSubsection}
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onNext={handleNext}
        onPrevious={handlePrevious}
        hasNext={hasNextSubsection()}
        hasPrevious={hasPreviousSubsection()}
        onMarkComplete={markComplete}
      />

      <CelebrationModal
        isOpen={showCelebration}
        sectionTitle={celebrationSectionTitle}
        onClose={handleCloseCelebration}
      />
    </div>
  );
}
