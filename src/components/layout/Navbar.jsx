import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [open, setOpen] = useState(false);

  const linkBase = "block py-2 text-secondary hover:text-primary transition";
  const active = "text-primary";

  return (
    <nav className="sticky top-0 z-50 border-b border-divider bg-surface">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">

        {/* Brand */}
        <NavLink to="/home" className="text-lg font-semibold tracking-tight">
          Pr-tracker
        </NavLink>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <NavLink to="/home" className={({isActive}) => `${linkBase} ${isActive ? active : ""}`}>Home</NavLink>
          <NavLink to="/about" className={({isActive}) => `${linkBase} ${isActive ? active : ""}`}>About</NavLink>
          <NavLink to="/docs" className={({isActive}) => `${linkBase} ${isActive ? active : ""}`}>Docs</NavLink>
          <NavLink to="/contact" className={({isActive}) => `${linkBase} ${isActive ? active : ""}`}>Contact</NavLink>
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-3 text-sm">
          <button className="px-3 py-1.5 text-secondary hover:text-primary transition">
            Login
          </button>
          <button className="rounded-md px-4 py-1.5 bg-hover hover:bg-selected text-primary transition">
            Register
          </button>
        </div>

        {/* Mobile Icon */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-md bg-hover"
          aria-label="menu"
        >
          {open ? (
            <X size={20} className="text-primary" />
          ) : (
            <Menu size={20} className="text-primary" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-divider px-6 py-4 space-y-2 bg-surface">
          <NavLink to="/home" onClick={()=>setOpen(false)} className={({isActive}) => `${linkBase} ${isActive ? active : ""}`}>Home</NavLink>
          <NavLink to="/about" onClick={()=>setOpen(false)} className={({isActive}) => `${linkBase} ${isActive ? active : ""}`}>About</NavLink>
          <NavLink to="/docs" onClick={()=>setOpen(false)} className={({isActive}) => `${linkBase} ${isActive ? active : ""}`}>Docs</NavLink>
          <NavLink to="/contact" onClick={()=>setOpen(false)} className={({isActive}) => `${linkBase} ${isActive ? active : ""}`}>Contact</NavLink>

          <div className="pt-3 flex gap-3">
            <button className="flex-1 py-2 text-secondary hover:text-primary transition">
              Login
            </button>
            <button className="flex-1 py-2 rounded-md bg-hover hover:bg-selected text-primary transition">
              Register
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;