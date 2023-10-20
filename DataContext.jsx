// Importar las dependencias necesarias
import { createContext, useState, useEffect } from "react";

// Crear el contexto de productos
export const DataContext = createContext({});

// Crear el proveedor de contexto de productos
export const DataContextProvider = ({ children }) => {
    //! Variables de estado para los productos, la carga y el error
    const url = "https://pokeapi.co/api/v2/pokemon/";
    const [data, setData] = useState([]);
    const [dataPoke, setDataPoke] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [isError, setError] = useState(false);

    //! Función para obtener los datos de los Pokemones
    const fetchData = async () => {
        try {
            setError(null);
            setisLoading(true);
            const response = await fetch(url);
            const data = await response.json();

            const promises = data.results.map(async (pokemon) => {
                const res = await fetch(pokemon.url);
                const data = await res.json();
                return data;
            });
            const results = await Promise.all(promises);
            console.log(results);
            setData(data);
            setDataPoke(results);
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setisLoading(false);
        }
    };

    // Efecto para inicializar el contexto
    useEffect(() => {
        fetchData();
    }, []);

    // Devolver el proveedor de contexto
    const contextValues = { data, dataPoke, isLoading, isError };

    return <DataContext.Provider value={contextValues}>{children}</DataContext.Provider>;
};
