const { gql } = require('apollo-server-express');
const casual = require('casual');

const profesor = require('./profesor');
const curso = require('./curso');

const rootQuery = gql`
  union ResultadoBusqueda = Profesor | Curso

  type Query {
    cursos: [Curso]
    profesores: [Profesor]
    curso(id: Int): Curso
    profesor(id: Int): Profesor
    buscar(query: String!): [ResultadoBusqueda]
  }

  type Mutation {
    profesorAdd(profesor: NuevoProfesor): Profesor
    profesorEdit(profesorId: Int!, profesor: ProfesorEditable): Profesor
    profesorDelete(profesorId: Int!): Profesor
  }
`

const typeDefs = [rootQuery, profesor, curso]


const mocks = {
  Curso: () => {
    return {
      titulo: casual.sentence,
      descripcion: casual.sentences(2),
    }
  },
  Profesor: () => {
    return {
      nombre: casual.name,
      nacionalidad: casual.country
    }
  },
  Comentario: () => {
    return {
      nombre: casual.title,
      cuerpo: casual.description
    }
  }
};

module.exports = { typeDefs, mocks }
