importScripts('https://www.gstatic.com/firebasejs/3.7.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.7.2/firebase-messaging.js');

var config = {
    apiKey: 'AIzaSyCc3480B8OlhNiT0XpsQt958_Pstm06Xyw',
    projectId: 'web-push-test-935e3',
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