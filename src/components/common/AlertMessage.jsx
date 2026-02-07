export default function AlertMessage({ type, message }) {
  const styles = {
    success: "bg-green-100 text-green-800 border-green-400",
    error: "bg-red-100 text-red-800 border-red-400",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-400",
  };

  return (
    <div
      className={`
        mb-6
        rounded-lg
        border
        px-4
        py-3
        text-sm
        font-medium
        ${styles[type]}
      `}
      role="alert"
    >
      {message}
    </div>
  );
}
