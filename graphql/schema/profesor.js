const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Profesor {
    id: ID!
    nombre: String!
    nacionalidad: String!
    genero: Genero
    cursos: [Curso]
  }

  enum Genero {
    MASCULINO
    FEMENINO
  }

  input NuevoProfesor {
    nombre: String!
    genero: Genero
    nacionalidad: String!
  }
  input ProfesorEditable {
    nombre: String
    genero: Genero
    nacionalidad: String
  }
`
module.exports = typeDefs
