import { NavLink } from "react-router";

function Nav() {
  const base =
    "px-3 rounded-3xl transition-colors border";

  return (
    <nav className="gap-2 bg-neutral-200/70 flex p-2 rounded-4xl">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `${base} ${
            isActive
              ? "border-neutral-700"
              : "border-neutral-700/0 hover:border-neutral-700"
          }`
        }
      >
        work
      </NavLink>

      <NavLink
        to="/about"
        className={({ isActive }) =>
          `${base} ${
            isActive
              ? "border-neutral-700"
              : "border-neutral-700/0 hover:border-neutral-700"
          }`
        }
      >
        about
      </NavLink>
    </nav>
  );
}

export default Nav;