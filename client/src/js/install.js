const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    //stash the event so it can be tirggered later
    window.deferredPrompt = event;

    butInstall.classList.toggle('hidden', false);
    //visibility of the button
    butInstall.style.visibility = 'visible';

});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    const Prompt_Event = window.deferredPrompt;
    if (!Prompt_Event){
        return;
    }
    //show prompt
    Prompt_Event.prompt();
   //set to diasbled if 'true'
    butInstall.setAttribute('disabled', true);
    //set text of the button to 'Installed'
    butInstall.textContent = 'Installed!';
});


// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
     //set to null to not trigger the instal next time user click on the button
     winodow.deferredPrompt = null;
});
