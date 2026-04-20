export default function GreetingHeader({ name = "User" }) {
  //Get Current hour to convert inot a greeting
  const hour = new Date().getHours();

  let greeting = " ";
  if (hour < 12) {
    greeting = "Good morning!";
  } else if (hour < 18) {
    greeting = "Good afternoon!";
  } else {
    greeting = "Good evening!";
  }

  return (
    <div className="w-full">
      <h3 className="font-bold text-base mt-1">Hello, {name}!</h3>
      <p className="text-xs text-gray-400">{greeting}</p>
    </div>
  );
}
