// firebase.initializeApp({
//     messagingSenderId: '705688537739'
// });
//
// if ('Notification' in window) {
//     var messaging = firebase.messaging();
//
//     // user already allowed notifications
//     // sign up for notifications if not done so yet
//     if (Notification.permission === 'granted') {
//         subscribe();
//     }
//
//     // on click, we ask the user for permission to notify
//     // and sign it
//     $('#subscribe').on('click', function () {
//         subscribe();
//     });
// }
//
// function subscribe() {
//     // request permission to receive notifications
//     messaging.requestPermission()
//         .then(function () {
//             // get device's ID
//             messaging.getToken()
//                 .then(function (currentToken) {
//                     console.log(currentToken);
//
//                     if (currentToken) {
//                         sendTokenToServer(currentToken);
//                     } else {
//                         console.warn('Could not get device ID.');
//                         setTokenSentToServer(false);
//                     }
//                 })
//                 .catch(function (err) {
//                     console.warn('Error while getting token.', err);
//                     setTokenSentToServer(false);
//                 });
//         })
//         .catch(function (err) {
//             console.warn('Did not receive permission for notifications.', err);
//         });
// }
//
// // send ID to server
// function sendTokenToServer(currentToken) {
//     if (!isTokenSentToServer(currentToken)) {
//         console.log('Sending token to server...');
//
//         var url = ''; // script address on server that holds device's ID
//         $.post(url, {
//             token: currentToken
//         });
//
//         setTokenSentToServer(currentToken);
//     } else {
//         console.log('Token already sent to server.');
//     }
// }
//
// // use localStorage to mark that,
// // that the user has already subscribed to notifications
// function isTokenSentToServer(currentToken) {
//     return window.localStorage.getItem('sentFirebaseMessagingToken') == currentToken;
// }
//
// function setTokenSentToServer(currentToken) {
//     window.localStorage.setItem(
//         'sentFirebaseMessagingToken',
//         currentToken ? currentToken : ''
//     );
// }