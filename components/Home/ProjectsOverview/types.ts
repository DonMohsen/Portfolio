export type ProjectOverviewTechnology = {
  name: string;
  imageUrl: string;
};

export type ProjectOverviewItem = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  images: string[];
  projectTypeLabel: string;
  isLive: boolean;
  isOpenSource: boolean;
  githubUrl: string | null;
  liveUrl: string | null;
  detailHref: string;
  technologies: ProjectOverviewTechnology[];
};
