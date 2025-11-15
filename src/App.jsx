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

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          "https://rickandmortyapi.com/api/character"
        );
        setCharacters(data.results);
        // setIsLoading(false);
      } catch (error) {
        //! For real projects error.response.data.message
        toast.error(error.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="app">
      <Toaster />
      <Navbar numOfCharacters={characters.length} />
      <Main>
        <CharacterList characters={characters} isLoading={isLoading} />
        <CharacterDetails />
      </Main>
    </div>
  );
}

export default App;

function Main({ children }) {
  return <div className="main">{children}</div>;
}
