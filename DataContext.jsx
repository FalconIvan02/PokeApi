// Importar las dependencias necesarias
import { createContext, useState, useEffect } from "react";

// Crear el contexto de productos
export const DataContext = createContext({});

// Crear el proveedor de contexto de productos
export const DataContextProvider = ({ children }) => {
    //! Variables de estado para los productos, la carga y el error
    const url = "https://pokeapi.co/api/v2/pokemon/";
    const baseURL = "https://pokeapi.co/api/v2/";
    const [data, setData] = useState([]);
    const [dataPoke, setDataPoke] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [isError, setError] = useState(false);
    const [offset, setOffset] = useState(0);
    const [isactive, setIsActive] = useState(false);

    const [globalPokemons, setGlobalPokemons] = useState([]);

    //! Función para obtener los datos de los Pokemones
    const fetchData = async (limit = 50) => {
        try {
            setError(null);
            setisLoading(true);
            const response = await fetch(`${baseURL}pokemon?limit=${limit}&offset=${offset}`);
            const data = await response.json();

            const promises = data.results.map(async (pokemon) => {
                const res = await fetch(pokemon.url);
                const data = await res.json();
                return data;
            });
            const results = await Promise.all(promises);
            setData(data);
            setDataPoke([...dataPoke, ...results]);
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setisLoading(false);
        }
    };

    const getGlobalPokemons = async () => {
        try {
            setError(null);
            setisLoading(true);
            const response = await fetch(`${baseURL}pokemon?limit=100000&offset0`);
            const data = await response.json();

            const promises = data.results.map(async (pokemon) => {
                const res = await fetch(pokemon.url);
                const data = await res.json();
                return data;
            });
            const results = await Promise.all(promises);

            setGlobalPokemons(results);
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setisLoading(false);
        }
    };

    // Llamar a un pokemon por ID
    const getPokemonById = async (id) => {
        const response = await fetch(`${baseURL}pokemon/${id}`);
        const data = await response.json();
        return data;
    };

    // Efecto para inicializar el contexto
    useEffect(() => {
        fetchData();
    }, [offset]);
    useEffect(() => {
        getGlobalPokemons();
    }, []);

    //Boton cargar mas
    const LoadMore = () => {
        setOffset(offset + 50);
    };

    // Devolver el proveedor de contexto
    const contextValues = { data, dataPoke, globalPokemons, isLoading, LoadMore };

    return <DataContext.Provider value={contextValues}>{children}</DataContext.Provider>;
};
