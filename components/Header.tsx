"use client";

import Image from "next/image";
import { ProgressPill } from "./ProgressPill";

interface HeaderProps {
  globalProgress: number;
}

export const Header = ({ globalProgress }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-2xl mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-end gap-2">
          <Image
            src="/badgielogo.png"
            alt="Badgie"
            width={140}
            height={44}
            className="h-10 w-auto"
            priority
          />
          <span className="text-xl text-gray-500 font-bold mb-2">  Academy</span>
        </div>
        <ProgressPill percentage={globalProgress} />
      </div>
    </header>
  );
};
