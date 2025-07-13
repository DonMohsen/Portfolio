'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Square, SquareCheckBig } from 'lucide-react';
import { startTransition } from 'react';
import { useMemo } from 'react';

const FILTERS = [
  { label: 'تمرینی', value: 'Practice' },
  { label: 'کپی شده', value: 'Copy' },
    { label: 'فورک شده', value: 'Forked' },

];

export default function ProjectsFilterNav() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get current filter value from query params
  const currentType = useMemo(() => searchParams.get('type'), [searchParams]);

  const handleFilterClick = (type: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const isActive = currentType === type;

    if (isActive) {
      params.delete('type');
    } else {
      params.set('type', type);
    }

    startTransition(() => {
      router.replace(`/projects?${params.toString()}`);
    });
  };

  return (
    <div className="w-full p-4">
      <div className="rounded-lg border border-black/[0.2] dark:border-white/[0.2] p-4 flex flex-col font-IRANSansXMedium">
        <p className="font-IRANSansXBold text-right py-5">فیلتر ها</p>

        {FILTERS.map(({ label, value }) => {
          const isActive = currentType === value;

          return (
            <label
              key={value}
              className="flex items-center justify-end space-x-2 cursor-pointer mt-2"
            >
              <input
                type="checkbox"
                checked={isActive}
                onChange={() => handleFilterClick(value)}
                className="hidden"
              />
              <div>
                {!isActive ? (
                  <Square className="text-black dark:text-white" />
                ) : (
                  <SquareCheckBig className="text-black dark:text-white" />
                )}
              </div>
              <span>{label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
