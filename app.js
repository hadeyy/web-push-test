// initialize Firebase
var config = {
    apiKey: "AIzaSyCc3480B8OlhNiT0XpsQt958_Pstm06Xyw",
    authDomain: "web-push-test-935e3.firebaseapp.com",
    projectId: "web-push-test-935e3",
    messagingSenderId: "705688537739"
};
firebase.initializeApp(config);

// retrieve a messaging object
const messaging = firebase.messaging();

// configure web credentials
// messaging.usePublicVapidKey("BO6r9Dyd68aWQPS0jn3NGtVmuSHRNSHlKCUZCKNo9pT4MZ2ZYLJD0hDvDJFeowVGkaKRsRcLdV3M2FtUfWvcn0w");

// request permission to receive notifications
messaging.requestPermission().then(function () {
    console.log('Notification permission granted.');

    // Get Instance ID token. Initially this makes a network call, once retrieved
    // subsequent calls to getToken will return from cache.
    messaging.getToken().then(function (currentToken) {
        if (currentToken) {
            sendTokenToServer(currentToken);
            updateUIForPushEnabled(currentToken);
        } else {
            // Show permission request.
            console.log('No Instance ID token available. Request permission to generate one.');

            // Show permission UI.
            updateUIForPushPermissionRequired();
            setTokenSentToServer(false);
        }
    }).catch(function (err) {
        console.log('An error occurred while retrieving token. ', err);

        showToken('Error retrieving Instance ID token. ', err);
        setTokenSentToServer(false);
    });
}).catch(function (err) {
    console.log('Unable to get permission to notify.', err);
});

// when user is on the webpage
messaging.onMessage(function (payload) {
   console.log('onMessage:', payload)
});