importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyB...",
  authDomain: "mapeet-bb556.firebaseapp.com",
  projectId: "mapeet-bb556",
  storageBucket: "mapeet-bb556.firebasestorage.app",
  messagingSenderId: "57593654750",
  appId: "1:57593654750:web:4ce2005fac1e72e785c14f"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Background message:', payload);

  const title = payload.notification?.title || payload.data?.title;
  const options = {
    body: payload.notification?.body || payload.data?.body,
    icon: '/logo.png'
  };

  self.registration.showNotification(title, options);
});


// عند الضغط على الإشعار
self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  event.waitUntil(
    clients.openWindow('/')
  );
});

