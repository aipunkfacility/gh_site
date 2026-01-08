export function useLazyLoad() {
  return {
    initLazyLoading: () => {
      console.log('Lazy loading enabled');
    },
    addLazyLoadingToNewImages: () => {}
  };
}
