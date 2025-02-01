"use client"
import { ProjectsWithTechsType } from '@/app/Types/AllTechstackTypes';
import { motion } from 'framer-motion';
import { FC } from 'react';

interface ClientProjectCardProps {
  project: ProjectsWithTechsType;
}

const ClientProjectCard: FC<ClientProjectCardProps> = ({ project }) => {
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
        {project.techStack.map(({ technology }) => (
          <motion.span
            key={technology.id}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {technology.name}
          </motion.span>
        ))}
      </div>

      <div className="mt-4 text-gray-500 text-sm">
        <p>Created At: {new Date(project.createdAt).toLocaleDateString()}</p>
      </div>
    </motion.div>
  );
};

export default ClientProjectCard;
