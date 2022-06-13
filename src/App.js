import { Routes, Route } from "react-router-dom";
import { PATHS } from "./const";
import { Main, About } from "./pages";

const App = () => {
  return (
    <Routes>
      <Route path={PATHS.MAIN.path} element={<Main />} />
      <Route path={PATHS.ABOUT.path} element={<About />} />
    </Routes>
  );
};

export default App;

// const [currentPokemon, setCurrentPokemon] = useState(null);
// const [isOpenModal, setIsOpenModal] = useState(false);

// const handleChangeStatusModal = useCallback((pokemon) => {
//   if (pokemon) {
//     setCurrentPokemon(pokemon);
//     setIsOpenModal(true);
//   } else {
//     setIsOpenModal(false);
//     setCurrentPokemon(null);
//   }
// }, []);
