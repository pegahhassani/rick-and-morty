import "./App.css";
import CharacterList from "./components/CharacterList";
import CharacterDetails from "./components/CharacterDetails";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectId, setSelectId] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/?name=${query}`
        );
        setCharacters(data.results);
        // setIsLoading(false);
      } catch (error) {
        //! For real projects error.response.data.message
        setCharacters([]);
        toast.error(error.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }

    // if (query.length < 3) {
    //   setCharacters([]);
    //   return;
    // }

    fetchData();
  }, [query]);

  const handleCharacterId = (id) => {
    setSelectId((prevId) => (prevId === id ? null : id));
  };

  const handleAddFavorite = (char) => {
    setFavorites((prevFav) => [...prevFav, char]);
  };

  const isAddToFaves = favorites.map((fav) => fav.id).includes(selectId);

  return (
    <div className="app">
      <Toaster />
      <Navbar
        numOfCharacters={characters.length}
        query={query}
        setQuery={setQuery}
        numOfFavorites={favorites.length}
      />
      <Main>
        <CharacterList
          characters={characters}
          isLoading={isLoading}
          onSelectCharacter={handleCharacterId}
          selectId={selectId}
        />
        <CharacterDetails
          selectId={selectId}
          onAddFavorites={handleAddFavorite}
          isAddToFaves={isAddToFaves}
        />
      </Main>
    </div>
  );
}

export default App;

function Main({ children }) {
  return <div className="main">{children}</div>;
}
