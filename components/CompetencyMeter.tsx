'use client';

import React from 'react';

interface CompetencyCircleProps {
  competency: number; // A number between 0 and 100
  filledColor?: string; // Color for the filled part
  unfilledColor?: string; // Color for the unfilled part
  size?: number; // Size of the SVG (width & height)
}

const CompetencyCircle: React.FC<CompetencyCircleProps> = ({
  competency,
  filledColor = "purple", // Default filled color
  unfilledColor = "#E5E7EB", // Default unfilled color
  size = 150, // Default size
}) => {
  const radius = size / 2 - 10; // Adjust radius dynamically
  const circumference = 2 * Math.PI * radius; // Calculate circumference
  const progress = (competency / 100) * circumference; // Compute progress

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Background Circle (Unfilled Part) */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={unfilledColor}
        strokeWidth="10"
      />

      {/* Progress Circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={filledColor}
        strokeWidth="10"
        strokeDasharray={circumference}
        strokeDashoffset={circumference - progress}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        className="transition-all duration-500"
      />

      {/* Percentage Text */}
      <text
        x={size / 2}
        y={size / 2 + 5}
        textAnchor="middle"
        fontSize={size * 0.12} // Scale font size relative to size
        fontWeight="bold"
        fill={filledColor}
      >
        {competency}%
      </text>
    </svg>
  );
};

export default CompetencyCircle;
