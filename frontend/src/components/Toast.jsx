export default function Toast({ show, type, message }) {
  if (!show) return null;

  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <div className={`fixed text-white top-5 right-5 px-4 py-2 rounded shadow-lg z-50 ${bgColor} animate-fadeIn`}>
      {message}
    </div>
  );
}
