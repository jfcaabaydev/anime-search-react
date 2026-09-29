import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <Link to="/">AniTrack</Link>
      <nav>
        <Link to="/">Browse</Link>
        <Link to="/mylist">My List</Link>
      </nav>
    </header>
  );
}

export default Header;