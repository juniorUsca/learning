const { makeExecutableSchema } = require('graphql-tools')

const typeDefs = `
    # Esto es un curso del sistema
    type Curso {
        id: ID!
        titulo: String!
        # Esta es la descripcion del curso
        descripcion: String!
        profesor: Profesor
        rating: Float @deprecated(reason: "No creemos mas en los puntajes")
        comentarios: [Comentario]
    }

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

    type Comentario {
        id: ID!
        nombre: String!
        cuerpo: String!
    }

    type Query {
        cursos: [Curso]
        profesores: [Profesor]
        curso(id: Int): Curso
        profesor(id: Int): Profesor
    }
`

const resolvers = {
    Query: {
        cursos: () => {
            return [{
                id: 1,
                titulo: 'curso de graphql',
                descripcion: 'aprendiendo graphql'
            }, {
                id: 2,
                titulo: 'curso de php',
                descripcion: 'aprendiendo php'
            }]
        }
    },
    Curso: {
        profesor: () => {
            return {
                nombre: 'pablo'
            }
        }
    }
}

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

module.exports = schema