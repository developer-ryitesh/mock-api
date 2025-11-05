const NOTIFICATION_TYPE = {
   NOTIFICATION: "NOTIFICATION",
   SYSTEM_ALERT: "SYSTEM_ALERT",
   PROMOTION: "PROMOTION",
   SUBSCRIPTION: "SUBSCRIPTION",
};

const NOTIFICATION_PRIORITY = {
   high: {
      value: "high",
      color: "#EF4444", // red-500 (for urgent notifications)
   },
   normal: {
      value: "normal",
      color: "#3B82F6", // blue-500 (for regular notifications)
   },
};

export { NOTIFICATION_PRIORITY, NOTIFICATION_TYPE };
