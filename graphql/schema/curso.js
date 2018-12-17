const { gql } = require('apollo-server-express');

const typeDefs = gql`
  "Esto es un curso en el sistema"
  type Curso {
    id: ID!
    titulo: String!
    """
    Esta es la descripcion del curso
    en multiples lineas
    """
    descripcion: String!
    profesor: Profesor
    rating: Float @deprecated(reason: "No creemos mas en los puntaje")
    comentarios: [Comentario]
  }

  type Comentario {
    id: ID!
    nombre: String!
    cuerpo: String!
  }
`
module.exports = typeDefs
