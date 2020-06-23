const mustysLazyLoad = (options = {}) => {
  const images = options.images ? options.images : document.querySelectorAll("img.lazy");
  return {
    showImages: () => {
      console.log(images);
    },
    images: images,
  };
};
