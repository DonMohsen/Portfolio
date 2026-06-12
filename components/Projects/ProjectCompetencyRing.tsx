import { getProjectCompetencyColor } from "@/lib/getProjectCompetencyColor";

type ProjectCompetencyRingProps = {
  competency: number;
  size?: number;
  strokeWidth?: number;
};

export default function ProjectCompetencyRing({
  competency,
  size = 50,
  strokeWidth = 2,
}: ProjectCompetencyRingProps) {
  const radius = size / 2 - strokeWidth * 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (competency / 100) * circumference;
  const filledColor = getProjectCompetencyColor(competency);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#edebed"
        strokeWidth={strokeWidth}
        strokeOpacity="50%"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={filledColor}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={circumference - progress}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x={size / 2}
        y={size / 2 + 3}
        textAnchor="middle"
        fontSize={size * 0.22}
        fontWeight="bold"
        className="fill-black dark:fill-white"
      >
        {competency}%
      </text>
    </svg>
  );
}
