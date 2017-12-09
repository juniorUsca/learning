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
                nombre: 'pablo',
                nacionalidad: 'Peru'
            }
        },
        comentarios: () => {
            return [{
                id: 1,
                nombre: 'comentario1',
                cuerpo: 'el curso esta bueno',
            }, {
                id: 2,
                nombre:'comentario2',
                cuerpo: 'el curso no me gusta',
            }]
        }
    },
    Profesor: {
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
    }
}

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

module.exports = schema