import React from "react";

export default function BookAvailabilityBadge({ isAvailable, status }) {
  // Define styling based on availability status
  const getStatusStyles = () => {
    switch (status?.toLowerCase()) {
      case "available":
        return {
          bg: "bg-green-100",
          text: "text-green-800",
          icon: "✓",
        };
      case "borrowed":
      case "damaged":
      case "lost":
      case "partially damaged":
        return {
          bg: "bg-red-100",
          text: "text-red-800",
          icon: "✗",
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-800",
          icon: "?",
        };
    }
  };

  const styles = getStatusStyles();

  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${styles.bg} ${styles.text}`}
    >
      <span>{styles.icon}</span>
      <span>{status}</span>
    </span>
  );
}
