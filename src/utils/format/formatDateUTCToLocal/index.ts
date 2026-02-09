export const formatDateUTCToLocal = (
  isoDate: string,
  localeLang = navigator.language,
  options = {}
) => {
  return new Date(isoDate).toLocaleDateString(localeLang, options);
};
