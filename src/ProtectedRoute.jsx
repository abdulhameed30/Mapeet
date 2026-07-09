import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

function ProtectedRoute({ children, allowedRoles }) {
  const status = sessionStorage.getItem("status");
  const user = JSON.parse(sessionStorage.getItem("data"));

  useEffect(() => {
    if(status == "success"){
      console.log("yes")
    } else {
      console.log("no")
    }
  }, [])


  if (status && status == "success") {
    if (allowedRoles && !allowedRoles.includes(user.permission_name)) {
      return <NoPermission />;
    }
    return children;
  } else {
    return <Navigate to="/login" replace />;
     
  }
}

function NoPermission() {
  useEffect(() => {
    toast.error("لا تملك صلاحية للوصول الى هذه الصفحة", {
      id: "permission-error",
    });
  }, []);

  return <Navigate to="/home" replace />;
}

export default ProtectedRoute;
