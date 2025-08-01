import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

function DelayedNotification() {
  useEffect(() => {
    const timer = setTimeout(() => {
      toast.info("🔔 Free homeopathy camp  this weekend. Book now!");
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  
}

export default DelayedNotification;
