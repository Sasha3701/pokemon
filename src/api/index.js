import axios from "axios";

const instance = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});

class Api {
  async getPokemons(params = { limit: 40 }) {
    const { data } = await instance.get("pokemon", { params });
    return data;
  }
}

const api = new Api();

export default api;
