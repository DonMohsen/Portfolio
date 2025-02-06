"use client"
import { ProjectsWithTechsType } from '@/app/Types/AllTechstackTypes';
import { motion } from 'framer-motion';
import { FC } from 'react';

interface ClientProjectCardProps {
  project: ProjectsWithTechsType;
}
const ClientProjectCard: FC<ClientProjectCardProps> = ({ project }) => {
  const techColors: { [name: string]: string[] } = {
    "Next-js": ["#000000", "#ffffff"], // Gradient: sleek black to bold blue (modern, cutting-edge)
    "Typescript": ["#3178c6", "#3178c6"], // Gradient: TypeScript blue to React blue (clean and professional)
    "React": ["#000000", "#72ddfb"], // Gradient: light blue to dark gray (React's classic branding)
    "Tailwind CSS": ["#38bdf8", "#00bcff"], // Gradient: light teal to purple (playful and stylish)
    "PostgreSQL": ["#336791", "#336791"], // Gradient: PostgreSQL blue to slate (cool and solid)
    "Framer Motion": ["#ff2a68", "#e62fbf"], // Gradient: vibrant pinks (dynamic and energetic)
    "Express.js": ["#111", "#808080"], // Gradient: dark charcoal to black (sleek and minimal)
    "Redux": ["#764abc", "#764abc"], // Gradient: deep purple to orange (bold and strong)
    "Mongo DB": ["#47a248", "#3c9c3a"], // Gradient: bright green to forest green (natural and vibrant)
    "Prisma ORM": ["#2d1c62", "#16a394"], // Gradient: deep purple to bright neon pink (innovative and bold)
    "Zustand": ["#2d1c62", "#716257"], // Gradient: deep purple to bright neon pink (innovative and bold)
    
  };
  
  
  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow ease-in-out duration-300"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold text-gray-900">{project.name}</h2>
      <p className="mt-2 text-gray-700">{project.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.techStack.map(({ technology }) => {
                  const [color1, color2] = techColors[technology.name] ; // Fallback gradient

                  return (
                    <motion.span
                      key={technology.id}
                      className="px-3 py-1 flex items-center justify-center gap-2 text-white rounded-lg text-sm font-medium"
                      style={{
                        backgroundImage: `linear-gradient(to top right, black, ${color2})` // Apply new gradient style
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <img
                        className="w-8 h-8"
                        src={technology.imageUrl}
                        alt={`${technology.name} image`}
                      />
                      {technology.name}
                    </motion.span>
                  );
})}
      </div>

      <div className="mt-4 text-gray-500 text-sm">
      </div>
    </motion.div>
  );
};

export default ClientProjectCard;