export function createScriptTag(code: string) {
  const script1 = document.createElement('script');
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${code}`;
  script1.async = true;

  const script2 = document.createElement('script');
  script2.innerHTML = `window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag('js', new Date());

  gtag('config', '${code}');`;
  document.body.append(script1, script2);
}
