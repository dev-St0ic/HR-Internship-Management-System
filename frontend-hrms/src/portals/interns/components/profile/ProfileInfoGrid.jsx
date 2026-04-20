export default function ProfileInfoGrid({ items }) {
  return <div className="grid grid-cols-2 gap-x-12 gap-y-6 text-sm">{items.map((item) => <div key={item.label}><p className="text-gray-400 text-sm mb-1">{item.label}</p><p className="border-b border-gray-100 w-full pb-1">{item.value}</p></div>)}</div>;
}