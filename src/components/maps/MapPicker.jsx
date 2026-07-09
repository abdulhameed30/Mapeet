import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "5px",
};

export default function MapPicker({ onSelectLocation, location }) {
  const [center, setCenter] = useState({
    lat: 15.3694, // موقع افتراضي (صنعاء مثلاً)
    lng: 44.191,
  });

  // جلب موقع المستخدم الحالي عند التحميل
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setCenter({ lat: lat, lng: lng });
        },
        (error) => {
          console.log("خطأ في الحصول على الموقع:", error);
          // يبقى المركز الافتراضي
        }
      );
    }
  }, [onSelectLocation]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAHee2Fj1K8PdIhfRgw-09mihQoe_jc8U8", // استبدله بالمفتاح الخاص بك
  });

  const [marker, setMarker] = useState(null);

  const handleMapClick = useCallback(
    (event) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setMarker({ lat, lng });
      onSelectLocation({ lat, lng }); // تمرير الإحداثيات للأب (الصفحة الرئيسية)
    },
    [onSelectLocation]
  );

  if (!isLoaded) return <p>جارٍ تحميل الخريطة...</p>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={location.lat == 0 ? center : location}
      zoom={20}
      onClick={handleMapClick}
    >
      {marker && <Marker position={marker} />}
    </GoogleMap>
  );
}
