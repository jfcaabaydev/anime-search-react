import { Link } from "react-router-dom";
import "./Header.css"

function Header() {
  return (
    <header className="header-container">
      <Link to="/">AniTrack</Link>
      <nav>
        <Link to="/">Browse</Link>
        <Link to="/mylist">My List</Link>
      </nav>
    </header>
  );
}

export default Header;