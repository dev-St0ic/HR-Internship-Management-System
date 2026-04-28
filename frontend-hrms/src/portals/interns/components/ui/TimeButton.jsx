export default function TimeButton({
  label,
  onClick,
  variant = "primary",
  disabled = false,
  icon: Icon,
}) {
  const base =
    "flex items-center justify-center gap-2 px-6 py-2 rounded-lg text-sm font-medium transition";

  const styles = {
    primary: "bg-purple-500 text-white hover:bg-purple-600",
    secondary: "bg-indigo-900 text-white hover:bg-indigo-800",
  };

  const disabledStyle =
    "border border-purple-500 bg-white text-purple-500 cursor-not-allowed";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${disabled ? disabledStyle : styles[variant]}`}
    >
      {Icon && <Icon size={16} />}
      {label}
    </button>
  );
}
