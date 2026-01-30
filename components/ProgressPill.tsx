"use client";

interface ProgressPillProps {
  percentage: number;
  size?: "sm" | "md";
}

export const ProgressPill = ({ percentage, size = "md" }: ProgressPillProps) => {
  const sizeClasses = size === "sm"
    ? "px-2 py-0.5 text-xs"
    : "px-3 py-1 text-sm";

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-yellow-300 font-semibold text-black ${sizeClasses}`}
    >
      {percentage}%
    </span>
  );
};
