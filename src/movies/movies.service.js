const db = require("../db/connection");

async function list(is_showing) {
  return db("movies")
    .select("*")
    .modify((queryBuilder) => {
      if (is_showing) {
        queryBuilder
          .select("movies.*")
          .join(
            "movies_theaters",
            "movies.movie_id",
            "movies_theaters.movie_id"
          )
          .where({ "movies_theaters.is_showing": true })
          .groupBy("movies.movie_id");
      }
      return queryBuilder;
    });
}

async function read(movie_id) {
  return db("movies").select("*").where({ movie_id }).first();
}

module.exports = {
  list,
  read,
};
