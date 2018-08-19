var config = {
    apiKey: 'AIzaSyCc3480B8OlhNiT0XpsQt958_Pstm06Xyw',
    projectId: 'web-push-test-935e3',
    messagingSenderId: "705688537739"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();

resetUI();

if ('granted' === Notification.permission) {
    getToken();
}

$('#subscribe').on('click', function () {
    getToken();
});
$('#unsubscribe').on('click', function () {
    deleteToken();
});

$('#notificationForm').on('submit', function (event) {
    event.preventDefault();

    var notification = {};
    $('#notificationForm').find('input').each(function () {
        var input = $(this);
        notification[input.attr('name')] = input.val();
    });

    sendNotification(notification);
});

function getToken() {
    messaging.requestPermission()
        .then(function () {
            console.log('Notification permission granted.');

            messaging.getToken()
                .then(function (token) {
                    if (token) {
                        sendTokenToServer(token);
                        updateUIForPushEnabled(token);
                    } else {
                        console.log('No Instance ID token available.');

                        updateUIForPushPermissionRequired();
                        setTokenSentToServer(false);
                    }
                }).catch(function (err) {
                console.log('An error occurred while retrieving token. ', err);

                updateUIForPushPermissionRequired();
                setTokenSentToServer(false);
            });
        }).catch(function (err) {
        console.log('Unable to get permission to notify.', err);
    });
}

function deleteToken() {
    messaging.getToken()
        .then(function (token) {
            messaging.deleteToken(token)
                .then(function () {
                    console.log('Token deleted');

                    setTokenSentToServer(false);
                    resetUI();
                })
                .catch(function (error) {
                    console.log('Unable to delete token', error);
                });
        })
        .catch(function (error) {
            console.log('Error retrieving Instance ID token', error);
        });
}

function sendNotification(notification) {
    var serverKey = 'AAAApE5Qios:APA91bEno5utmlmg1Ve-MGbdnXbDn2UwTj5fg4RNtkws-UIoDrC4mb0dtbLf00pI6EeUdVE5wPy1j3ZUEzmJUkga_9F34by7k2HY14hA6S7WYuyzJlPRvgsDIKpJ0HGMrmL3rAxw_9x_AH4WxwvROvVOZUCQzvPEqQ';

    console.log('Send notification', notification);

    messaging.getToken()
        .then(function (token) {
            fetch('https://fcm.googleapis.com/fcm/send', {
                method: 'POST',
                headers: {
                    'Authorization': 'key=' + serverKey,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: notification,
                    to: token
                })
            }).then(function (response) {
                return response.json();
            }).then(function (json) {
                console.log('Response', json);
            }).catch(function (error) {
                console.log('Error retrieving Instance ID token', error);
            })
        })
}

messaging.onMessage(function (payload) {
    console.log('Message received', payload);
});

messaging.onTokenRefresh(function () {
    messaging.getToken()
        .then(function (refreshedToken) {
            console.log('Token refreshed');

            sendTokenToServer(refreshedToken);
            updateUIForPushEnabled(refreshedToken);
        })
        .catch(function (error) {
            console.log('Unable to retrieve refreshed token', error);
        })
});


function sendTokenToServer(token) {
    if (!isTokenSentToServer(token)) {
        console.log('Sending token to server...');

        setTokenSentToServer(true);
    } else {
        console.log('Token already sent to server');
    }
}

function isTokenSentToServer(token) {
    return token === window.localStorage.getItem('sentFirebaseMessagingToken');
}

function setTokenSentToServer(token) {
    if (token) {
        window.localStorage.setItem('sentFirebaseMessagingToken', token);
    } else {
        window.localStorage.removeItem('sentFirebaseMessagingToken');
    }
}

function updateUIForPushEnabled(token) {
    console.log(token);

    $('button#subscribe').show();
    $('button#unsubscribe').hide();
    $('form#notificationForm').hide();
}

function updateUIForPushPermissionRequired() {
    $('button#subscribe').attr('disabled', 'disabled');
    resetUI();
}

function resetUI() {
    $('button#subscribe').show();
    $('button#unsubscribe').hide();
    $('form#notificationForm').hide();
}