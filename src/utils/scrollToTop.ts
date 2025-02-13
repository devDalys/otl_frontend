export const scrollToTop = () => {
  if (typeof window === 'undefined') return null;
  window.scrollTo({top: 0, behavior: 'smooth'});
};
