import type { ReactNode } from "react";

export type HeroInfoCard = {
  id: "currently" | "focus" | "location" | "available";
  label: string;
  value: string;
  delay?: number;
  floatDuration?: number;
  top?: string;
  right?: string;
  left?: string;
  bottom?: string;
};

export type HeroInfoCardId = HeroInfoCard["id"];

export type HeroInfoCardIconMap = Record<HeroInfoCardId, ReactNode>;
