export const menuEase = [0.76, 0, 0.24, 1] as const;

export const menuSlide = {
  initial: { x: "calc(100% + 100px)" },
  enter: { x: "0", transition: { duration: 0.8, ease: menuEase } },
  exit: { x: "calc(100% + 100px)", transition: { duration: 0.8, ease: menuEase } },
};

export const slide = {
  initial: { x: 80 },
  enter: (index: number) => ({
    x: 0,
    transition: { duration: 0.8, ease: menuEase, delay: 0.05 * index },
  }),
  exit: (index: number) => ({
    x: 80,
    transition: { duration: 0.8, ease: menuEase, delay: 0.05 * index },
  }),
};

export const scale = {
  open: { scale: 1, transition: { duration: 0.3 } },
  closed: { scale: 0, transition: { duration: 0.4 } },
};
