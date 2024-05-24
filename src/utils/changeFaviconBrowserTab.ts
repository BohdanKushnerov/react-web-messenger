const changeFaviconBrowserTab = (newFaviconPath: string) => {
  const link =
    document.querySelector("link[rel='icon']") ||
    document.createElement('link');

  const linkElement = link as HTMLLinkElement;
  linkElement.type = 'image/ico';
  linkElement.rel = 'icon';
  linkElement.href = newFaviconPath;

  document.head.appendChild(link);
};

export default changeFaviconBrowserTab;
