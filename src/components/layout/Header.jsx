/* eslint-disable react/prop-types */
import Logo from "../UI/Logo";

export default function Header({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}
