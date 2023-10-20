import "./App.css";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../DataContext";
import Cards from "../src/components/Cards";
import Chest from "./assets/images/cofre.png";
import Castle from "./assets/images/castillo.png";
import Fire from "./assets/images/fuego.png";

function App() {
    const { data, isLoading, isError, dataPoke } = useContext(DataContext);
    const [dataApi, setDataApi] = useState([]);
    const [dataPokemon, setDataPokemon] = useState([]);

    useEffect(() => {
        if (dataPoke) {
            setDataPokemon(dataPoke);
        }
    }, [dataPoke]);
    if (isLoading) {
        return (
            <div className="loader-container">
                <h2>Toy cargando capo</h2>
            </div>
        );
    }
    if (isError) {
        return <h2>Rompiste algo capo</h2>;
    }
    console.log(dataPokemon);
    return (
        <>
            <h1>Lista de pokemones</h1>
            <main id="list-container">
                {dataPokemon &&
                    dataPokemon.map((pokemon) => (
                        <article className="card" key={pokemon.id}>
                            <div className="section-top">
                                <img id="img" src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.id} />
                                <div class="pokemon-id">
                                    <h3>{pokemon.name}</h3>
                                    <span>#{pokemon.id}</span>
                                </div>

                                <p>Coleccionable</p>
                            </div>
                            <section class="section-bottom">
                                <div class="stat">
                                    <h3>Poder</h3>
                                    <img id="fuego-img" src={Fire} alt="fuego" />
                                </div>
                                <div class="stat">
                                    <h3>Resistencia</h3>
                                    <img id="castillo-img" src={Castle} alt="castillo" />
                                </div>
                                <div class="stat">
                                    <h3>Bonus</h3>
                                    <img id="cofre-img" src={Chest} alt="cofre" />
                                </div>
                            </section>
                        </article>
                    ))}
                {/*           {dataPokemon && dataPokemon.map((char) => <img src={char.front_default}></img>)} */}
            </main>
        </>
    );
}

export default App;
