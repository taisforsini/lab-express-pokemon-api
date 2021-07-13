const express = require("express");

const PORT = 4000;

// Importing all the pokemon for our data file
const allPokemon = require("./data");

const app = express();

// -- Define your route listeners here! --

app.get("/pokemon", (req, res) => {
  return res.json(allPokemon);
});

app.get("/pokemon/:id", (req, res) => {
  const id = req.params.id;
  const foundPokemon = allPokemon.find((pokemon) => {
    return pokemon.id === Number(id);
  });

  if (foundPokemon) {
    return res.json(foundPokemon);
  } else {
    return res.json({ msg: "Pokemon not found." });
  }
});

app.get("/pokemon/search", (req, res) => {
  const queryParams = req.query;

  for (let key in queryParams) {
    const filteredPokemon = allPokemon.filter((currentPokemon) => {
      if (key === "types") {
        return currentPokemon.types.includes(queryParams.types);
      }

      return currentPokemon.name
        .toLowerCase()
        .includes(queryParams.toLowerCase());
    });

    if (filteredPokemon.length) {
      return res.json(filteredPokemon);
    } else {
      return res.json({ msg: "Pokemon not found." });
    }
  }

  res.json(queryParams);
});

app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));
