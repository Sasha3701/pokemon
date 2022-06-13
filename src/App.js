import { useCallback, useState } from "react";
import { Pokemons } from "./components";

const App = () => {
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleChangeStatusModal = useCallback((pokemon) => {
    if (pokemon) {
      setCurrentPokemon(pokemon);
      setIsOpenModal(true);
    } else {
      setIsOpenModal(false);
      setCurrentPokemon(null);
    }
  }, []);

  return <Pokemons onOpenModal={handleChangeStatusModal} />;
};

export default App;
