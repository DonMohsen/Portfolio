import React from "react";

/**
 *  UI: border magic from tailwind css btns
 *  Link: https://ui.aceternity.com/components/tailwindcss-buttons
 *
 *  change border radius to rounded-lg
 *  add margin of md:mt-10
 *  remove focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50
 */
const MagicButton = ({
  title,
  icon,
  position,
  handleClick,
  otherClasses,
}: {
  title: string;
  icon?: React.ReactNode;
  position: string;
  handleClick?: () => void;
  otherClasses?: string;
}) => {
  return (
    <button
      className="group relative inline-flex h-12 w-full md:w-60 mb-5 overflow-hidden rounded-lg p-[2px] focus:outline-none"
      onClick={handleClick}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />

      {/* remove px-3 py-1, add px-5 gap-2 */}
      <div
        className={`flex h-full w-full cursor-pointer items-center justify-center rounded-lg
             bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2 ${otherClasses}`}
      >
        {position === "left" && 
        <div className="dark:text-white text-black translate-y-[2px] group-hover:translate-x-2 transition-all duration-500 flex items-center justify-center">

        {icon}
        </div>
        }
        <div className="flex items-center justify-center text-black dark:text-white">

        {title}
        </div>
        {position === "right" && 
        <div className="dark:text-white text-black translate-y-[2px] group-hover:translate-x-2 transition-all duration-500 flex items-center justify-center">

        {icon}
        </div>
        }
      </div>
    </button>
  );
};

export default MagicButton;