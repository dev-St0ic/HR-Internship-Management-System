export default function ProgressCircle({ value = 0, size = 80 }) {
  const innerSize = size * 0.7;

  return (
    <div
      className="grid place-items-center rounded-full"
      style={{
        width: size,
        height: size,
        background: `conic-gradient(#7C3EFF ${value * 3.6}deg, #f1f1f1 0deg)`,
      }}
    >
      <div
        className="grid place-items-center rounded-full bg-white"
        style={{
          width: innerSize,
          height: innerSize,
        }}
      >
        <span className="text-xs font-bold">{value}%</span>
      </div>
    </div>
  );
}
