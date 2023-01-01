export const isValidUrl = (urlString: string) => {
  try {
    return !!(new URL(urlString));
  } catch (_) {
    return false;
  }
};
