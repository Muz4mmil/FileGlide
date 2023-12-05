import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  });
}

let deferredPrompt;

const installButton = document.getElementById('install-button'); // Replace with the ID of your install button

window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default prompt
  event.preventDefault();
  
  // Store the event for later use
  deferredPrompt = event;

  // Show your custom install button or prompt
  installButton.style.display = 'block'; // Show your install button
});

installButton.addEventListener('click', () => {
  // Show the browser's install prompt
  deferredPrompt.prompt();

  // Wait for the user to respond
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }

    // Clear the deferredPrompt variable
    deferredPrompt = null;
    // Hide your custom install button
    installButton.style.display = 'none';
  });
});

window.addEventListener('beforeinstallprompt', (event) => {
  // Log to check if the event is firing
  console.log('beforeinstallprompt event fired');
  
  // Prevent the default prompt
  event.preventDefault();

  // Store the event for later use
  deferredPrompt = event;

  // Show your custom install button
  installButton.style.display = 'block';
});
