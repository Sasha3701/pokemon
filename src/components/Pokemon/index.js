import { useEffect, useState } from "react";
import api from "../../api";
import styles from "./index.module.scss";

export const Pokemon = ({ identity, onOpenModal }) => {
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleOpenModal = () => {
    onOpenModal(pokemon);
  };

  useEffect(() => {
    api
      .getPokemon(identity)
      .then((res) => {
        setPokemon(res);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return isLoading ? (
    <div className={styles.loading}></div>
  ) : error ? (
    <div className={styles.error}></div>
  ) : (
    <div className={styles.pokemon} onClick={handleOpenModal}>
      <img
        className={styles.pokemon__img}
        src={pokemon.sprites.other.dream_world.front_default}
        alt={pokemon.id}
      />
    </div>
  );
};
