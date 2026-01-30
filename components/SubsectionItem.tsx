"use client";

import { Check } from "lucide-react";
import { motion } from "framer-motion";

interface SubsectionItemProps {
  id: string;
  title: string;
  isComplete: boolean;
  onClick: () => void;
}

export const SubsectionItem = ({
  title,
  isComplete,
  onClick,
}: SubsectionItemProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 rounded-lg"
    >
      <motion.div
        initial={false}
        animate={{
          backgroundColor: isComplete ? "#22C55E" : "#E5E7EB",
          scale: isComplete ? [1, 1.1, 1] : 1,
        }}
        transition={{ duration: 0.2 }}
        className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
      >
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Check className="w-4 h-4 text-white" strokeWidth={3} />
          </motion.div>
        )}
      </motion.div>
      <span className={`text-sm ${isComplete ? "text-gray-500" : "text-black"}`}>
        {title}
      </span>
    </button>
  );
};
