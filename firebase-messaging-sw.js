importScripts('https://www.gstatic.com/firebasejs/5.3.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.3.0/firebase-messaging.js');

var config = {
    messagingSenderId: "705688537739"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();

// when user is not on the webpage
messaging.setBackgroundMessageHandler(function (payload) {
    console.log('Handling background message', payload);

    // Copy data object to get parameters in the click handler
    payload.data.data = JSON.parse(JSON.stringify(payload.data));

    return self.registration.showNotification(payload.data.title, payload.data);
});