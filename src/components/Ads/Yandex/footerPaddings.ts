let adsHeight = 0;

export const remove = () => {
  const footer = document.querySelector('footer');

  if (footer && adsHeight) {
    const currentPB = window.getComputedStyle(footer).paddingBottom;
    footer.style.paddingBottom = `calc(${currentPB} - ${adsHeight}px)`;
  }
};

export const add = (height: number | undefined) => {
  const footer = document.querySelector('footer');

  if (height && footer) {
    adsHeight = height;
    const currentPB = window.getComputedStyle(footer).paddingBottom;
    footer.style.paddingBottom = `calc(${currentPB} + ${adsHeight}px)`;
  }
};

export const footerPaddings = {
  remove,
  add,
}; 