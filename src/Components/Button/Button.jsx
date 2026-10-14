function Button({
  text,
  onClick,
  type = "button",
  color = "bg-blue-900",
  hover = "hover:bg-blue-700",
  full = true,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        ${color}
        ${hover}
        ${full ? "w-full" : ""}
        text-white
        py-3
        px-6
        rounded-xl
        font-medium
        transition-all
        duration-300
        shadow-md
      `}
    >
      {text}
    </button>
  );
}

export default Button;