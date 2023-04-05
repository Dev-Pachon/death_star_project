import axios from "axios"

const instance = axios.create({ baseURL: "https://swapi.dev/api/planets/1/" })

export default instance