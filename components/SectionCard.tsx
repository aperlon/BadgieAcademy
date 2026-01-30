"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Download, Users, Award, Calendar, Trophy } from "lucide-react";
import { Section, Subsection } from "@/lib/sections-data";
import { SubsectionItem } from "./SubsectionItem";
import { SectionComplete } from "./SectionComplete";
import { ProgressPill } from "./ProgressPill";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Download,
  Users,
  Award,
  Calendar,
  Trophy,
};

interface SectionCardProps {
  section: Section;
  progress: number;
  isComplete: boolean;
  isSubsectionComplete: (id: string) => boolean;
  onSubsectionClick: (subsection: Subsection) => void;
}

export const SectionCard = ({
  section,
  progress,
  isComplete,
  isSubsectionComplete,
  onSubsectionClick,
}: SectionCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = iconMap[section.icon] || Download;

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-50 transition-colors duration-200"
      >
        <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
          <Icon className="w-5 h-5 text-gray-600" />
        </div>
        <div className="flex-1 text-left">
          <h3 className="font-semibold text-black">{section.title}</h3>
          <p className="text-xs text-gray-500">
            {section.subsections.length} pasos
          </p>
        </div>
        <ProgressPill percentage={progress} size="sm" />
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-gray-100 py-2">
              {isComplete && <SectionComplete />}
              {section.subsections.map((subsection) => (
                <SubsectionItem
                  key={subsection.id}
                  id={subsection.id}
                  title={subsection.title}
                  isComplete={isSubsectionComplete(subsection.id)}
                  onClick={() => onSubsectionClick(subsection)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
