import { HeartIcon } from "@heroicons/react/24/outline";

const Navbar = ({ numOfCharacters, query, setQuery, numOfFavorites }) => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">LOGO</div>
      <input
        type="text"
        placeholder="Search..."
        className="text-field"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="navbar__result">Found {numOfCharacters} characters</div>
      <button className="heart">
        <HeartIcon className="icon" />
        <span className="badge">{numOfFavorites}</span>
      </button>
    </nav>
  );
};

export default Navbar;
