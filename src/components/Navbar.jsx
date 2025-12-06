import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import Modal from "./Modal";
import { useState } from "react";
import { Character } from "./CharacterList";

const Navbar = ({
  numOfCharacters,
  query,
  setQuery,
  favorites,
  onDeleteFav,
}) => {
  const [isOpen, setIsOpen] = useState(false);

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
      <>
        <Modal title="List of favorites" open={isOpen} onOpen={setIsOpen}>
          {favorites.map((item) => (
            <Character
              item={item}
              key={item.id}
              selectId="1"
              onSelectCharacter={() => {}}>
              <button className="icon red" onClick={() => onDeleteFav(item.id)}>
                <TrashIcon />
              </button>
            </Character>
          ))}
        </Modal>
        <button className="heart" onClick={() => setIsOpen((is) => !is)}>
          <HeartIcon className="icon" />
          <span className="badge">{favorites.length}</span>
        </button>
      </>
    </nav>
  );
};

export default Navbar;
