// App.js أو NotificationHandler.js
import React, { useEffect } from "react";
import { messaging, getToken, onMessage } from "./firebase-config";
import axiosClient from "../api/axiosClient"; // تأكد من وجود ملف axiosClient.js لإعداد Axios

const NotificationHandler = ({ hotelId }) => {
  useEffect(() => {
    const requestPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          const currentToken = await getToken(messaging, {
            vapidKey:
              "BNDup5bfMUtyKihTw4DmIITXOU97yQb5nrzGsPf8l2gwoe0bajMd1cqZA2e2obwEvRZgd4U-m4nrNy8GQWYe3io",
          });
          if (currentToken) {
            console.log("FCM Registration Token:", currentToken);
            // هنا، يجب إرسال currentToken و hotelId إلى خادم Laravel الخاص بك
            // لربط الرمز بمعرف الفندق والاشتراك في الموضوع.
            sendTokenToLaravel(currentToken, hotelId);
          } else {
            console.log(
              "No registration token available. Request permission to generate one.",
            );
          }
        } else {
          console.log("Notification permission denied.");
        }
      } catch (error) {
        console.error("An error occurred while retrieving token:", error);
      }
    };

    requestPermission();
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Foreground message received:", payload);
      // عرض الإشعار للمستخدم أو تحديث واجهة المستخدم
      alert(
        `New Notification: ${payload.notification.title} - ${payload.notification.body}`,
      );
    });

    return () => {
      unsubscribe(); // تنظيف عند إلغاء تحميل المكون
    };
  }, [hotelId]);

  const sendTokenToLaravel = async (token, hotelId) => {
    // مثال على كيفية إرسال الرمز ومعرف الفندق إلى Laravel
    try {
      console.log("Sending token to Laravel:", { token, hotelId });

      const response = await axiosClient.post("/register-fcm-token", {
        fcm_token: token,
        hotel_id: hotelId,
      });
      const data = await response.data;
      console.log("Token sent to Laravel:", data);
    } catch (error) {
      console.error("Error sending token to Laravel:", error);
    }
  };

  return null; // هذا المكون لا يعرض أي شيء مرئي
};

export default NotificationHandler;
