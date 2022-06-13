import { useCallback, useEffect, useState } from "react";
import api from "../../api";
import { parserNextUrl } from "../../helpers";
import { useScroll } from "../../hooks";
import { Loader } from "../Loader";
import { Pokemon } from "../Pokemon";
import styles from "./index.module.scss";

export const Pokemons = ({ onOpenModal }) => {
  const [pokemons, setPokemons] = useState(null);
  const [count, setCount] = useState(null);
  const [nextPokemonsParams, setNextPokemonsParams] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorAdditional, setErrorAdditional] = useState(false);

  useEffect(() => {
    api
      .getPokemons()
      .then(({ count, next, results }) => {
        setPokemons(results);
        setCount(count);
        setNextPokemonsParams(parserNextUrl(next));
      })
      .catch(() => {
        setError(true);
      });
  }, []);

  const handleFetchNextPokemons = useCallback(
    async (e) => {
      const allHeigth = e.target.documentElement.scrollHeight;
      const visibleHeight = e.target.documentElement.scrollTop;
      const visibleZone = window.innerHeight;
      if (
        allHeigth - (visibleHeight + visibleZone) < 100 &&
        pokemons &&
        pokemons.length !== count
      ) {
        setLoading(true);
        api
          .getPokemons(nextPokemonsParams)
          .then(({ results, next }) => {
            setPokemons((prevState) => [...prevState, ...results]);
            setNextPokemonsParams(parserNextUrl(next));
          })
          .catch(() => {
            setErrorAdditional(true);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    },
    [nextPokemonsParams]
  );

  useScroll(handleFetchNextPokemons);

  return pokemons ? (
    <>
      <div className={styles.pokemons}>
        <ul className={styles.pokemons__list} variant="woven" cols={3} gap={8}>
          {pokemons.map(({ name }, index) => (
            <li key={`${index}_${name}`}>
              <Pokemon identity={name} onOpenModal={onOpenModal} />
            </li>
          ))}
        </ul>
      </div>
      {loading ? <Loader /> : null}
    </>
  ) : (
    <Loader />
  );
};
