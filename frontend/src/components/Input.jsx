export default function Input(props) {
  const variants = {
    textWhite: {
      label: "text-white",
      input: "bg-gray-700 text-white border-gray-600 placeholder-gray-300",
    },
    textNormal: {
      label: "text-gray-700",
      input: "bg-white text-gray-800 border-gray-300 placeholder-gray-500",
    },
  };

  const v = variants[props.variant] ?? variants.textWhite;

  return (
    <div className="mb-4 w-full">
      <label className={`${v.label} block text-sm font-medium mb-2`}>
        {props.label}
      </label>
      <input
        className={`${v.input} w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-colors`}
        type={props.type}
        value={props.value}
        placeholder={props.placeholder}
        onChange={(e) => props.setThing(e.target.value)}
      />
    </div>
  );
}
