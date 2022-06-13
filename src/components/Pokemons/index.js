import { useCallback, useEffect, useState } from "react";
import api from "../../api";
import { parserNextUrl } from "../../helpers";
import { useScroll } from "../../hooks";
import { Loader } from "../Loader";
import styles from "./index.module.scss";

const fetchPokemons = async (callback, params) => {
  try {
    const data = await api.getPokemons(params);
    return data;
  } finally {
    if (callback) {
      callback(false);
    }
  }
};

export const Pokemons = () => {
  const [pokemons, setPokemons] = useState(null);
  const [count, setCount] = useState(null);
  const [nextPokemonsParams, setNextPokemonsParams] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPokemons().then((res) => {
      const { count, next, results } = res;
      setPokemons(results);
      setCount(count);
      setNextPokemonsParams(parserNextUrl(next));
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
        const { next, results } = await fetchPokemons(
          setLoading,
          nextPokemonsParams
        );
        setPokemons((prevState) => [...prevState, ...results]);
        setNextPokemonsParams(parserNextUrl(next));
      }
    },
    [nextPokemonsParams]
  );

  useScroll(handleFetchNextPokemons);

  return pokemons ? (
    <>
      <div className={styles.pokemons}>
        <div className={styles.pokemons__count}>{count}</div>
        <ul className={styles.pokemons__list}>
          {pokemons.map((pokemon, index) => (
            <li
              key={`${index}_${pokemon.name}`}
              className={styles["pokemons_list-item"]}
            >
              <p>{pokemon.name}</p>
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
