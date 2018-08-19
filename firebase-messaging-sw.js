importScripts('https://www.gstatic.com/firebasejs/3.6.8/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.6.8/firebase-messaging.js');

var config = {
    apiKey: "AIzaSyCc3480B8OlhNiT0XpsQt958_Pstm06Xyw",
    authDomain: "web-push-test-935e3.firebaseapp.com",
    projectId: "web-push-test-935e3",
    messagingSenderId: "705688537739"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();

// when user is not on the webpage
messaging.setBackgroundMessageHandler(function (payload) {
    const title = 'Hello World!';
    const options = {
        body: payload.data.status
    };

    return self.registration.showNotification(title, options);
});