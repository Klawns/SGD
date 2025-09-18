import { Link } from "react-router-dom";

export default function Button({
  icon: Icon,
  text,
  path,
  variant = "primary",
}) {

  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-800",
    outline:
      "border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700",
  };

  return (
    <Link
      to={path}
      className={`${variants[variant]} px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2 shadow-sm`}
    >
      {Icon && <Icon size={20} />}
      <span>{text}</span>
    </Link>
  );
}
