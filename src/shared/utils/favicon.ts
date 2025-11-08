/**
 * Favicon utilities for dynamic favicon management
 */

export const setFavicon = (href: string): void => {
  const link = document.querySelector("link[rel*='icon']");
  if (link) {
    link.setAttribute('href', href);
  }
};

export const getFavicon = (): string => {
  const link = document.querySelector("link[rel*='icon']");
  return link?.getAttribute('href') || '/favicon.ico';
};
