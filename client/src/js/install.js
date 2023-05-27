const butInstall = document.getElementById('buttonInstall');

//provide the logic for when and how to install the PWA//
window.addEventListener('beforeinstallprompt', (event) => {
  window.deferredPrompt = event;
  butInstall.classList.toggle('hidden', false);
});

//user clicks the "install" button.
butInstall.addEventListener('click', async () => {
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
    return;
  }

  promptEvent.prompt();

  window.deferredPrompt = null;
  butInstall.classList.toggle('hidden', true);

});

window.addEventListener('appinstalled', (event) => {
  window.deferredPrompt = null;
});
