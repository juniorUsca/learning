module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: `${__dirname}/db.sqlite`
    },
    useNullAsDefault: true,
    migrations: {
      directory: `${__dirname}/migrations`
    },
    seeds: {
      directory: `${__dirname}/seeds`
    },
  },

  production: {
    // Acá irían los datos para la conexión
    // en un ambiente de producción
  }

}
