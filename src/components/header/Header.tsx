import Nav from "./Nav";

function Header() {
  return (
    <header className="fixed z-20 top-5 left-5 flex gap-2">
        <a href="/" className="bg-neutral-200/70 flex px-4 p-2 rounded-4xl tracking-wider">
          <span className="tracking-tighter mr-4">\/*\/ </span>andrea_windisch 
        </a>
      <Nav />
    </header>
  );
}

export default Header;