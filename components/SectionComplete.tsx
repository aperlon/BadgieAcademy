"use client";

import { motion } from "framer-motion";
import { PartyPopper } from "lucide-react";

export const SectionComplete = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 px-4 py-3 bg-green-50 rounded-lg mx-4 mb-2"
    >
      <PartyPopper className="w-5 h-5 text-green-500" />
      <span className="text-sm font-medium text-green-700">
        Sección Completada!
      </span>
    </motion.div>
  );
};
