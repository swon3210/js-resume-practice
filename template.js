export const getIndicatorsTemplate = (count) => {
  return [...Array(count)].map(
    (_, index) =>
      `<a href="#section-${index}" class="indicator-wrapper"><span class="indicator"></span></a>`
  );
};
