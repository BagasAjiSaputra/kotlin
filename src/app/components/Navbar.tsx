export default function Navbar() {
  const menus = ["Create", "Read", "Update", "Delete"];

  return (
    <header className="w-auto bg-green-200 p-4 flex justify-between gap-4">
      {menus.map((item) => (
        <button key={item} className="px-3 py-1 bg-white rounded-md">
          {item}
        </button>
      ))}
    </header>
  );
}
