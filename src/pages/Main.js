import { Pokemons } from "../components";
import { Layout } from "../layout";
import { PATHS } from "../const";

export const Main = () => {
  return (
    <Layout title={PATHS.MAIN.title}>
      <Pokemons />
    </Layout>
  );
};
