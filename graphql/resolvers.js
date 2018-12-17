const Curso = require('./models/Curso')
const Profesor = require('./models/Profesor')
const Comentario = require('./models/Comentario')

const resolvers = {
  Query: {
    //cursos: () => Curso.query().eager('[profesor, comentarios]'),
    cursos: () => Curso.query().eager('[profesor, profesor.[cursos], profesor.cursos.profesor, profesor.cursos.profesor.[cursos], comentarios]'),
    profesores: () => Profesor.query().eager('cursos'),
    curso: (rootValue, args) => Curso.query().eager('[profesor, comentarios]').findById(args.id),
    profesor: (rootValue, args) => Profesor.query().eager('cursos').findById(args.id),
    buscar: (_, args) => {
      return [
        Profesor.query().findById(6),
        Curso.query().findById(10).eager('[profesor, comentarios]'),
      ]
    },
    /*cursos: () => {
      return [{
        id: 1,
        titulo: 'CTA',
        descripcion: 'ciencia tecnologia y ambiente',
        profesor: {
          nombre: 'JUAN'
        }
      }, {
        id: 2,
        titulo: 'CS',
        descripcion: 'ciencias sociales',
      }]
    },*/
  },
  ResultadoBusqueda: {
    __resolveType: (obj) => {
      if(obj.titulo)
        return 'Curso'
      if(obj.nombre)
        return 'Profesor'
      return null
    }
  },
  /*Curso: {
    profesor: () => {
      return {
        id: 'x',
        nombre: 'Pablo',
        nacionalidad: 'pais',
      }
    },
    comentarios: () => {
      return [{
        id: 1,
        nombre: 'bien',
        cuerpo: 'buen curso',
      }]
    }
  }*/

  Mutation: {
    profesorAdd: (_, args) => Profesor.query().insert(args.profesor),
    profesorEdit: (_, args) => Profesor.query().patchAndFetchById(args.profesorId, args.profesor),
    profesorDelete: (_, args) => {
      return Profesor.query().findById(args.profesorId)
        .then((profesor) => {
          return Profesor.query().deleteById(args.profesorId)
            .then((filasBorradas) => {
              if(filasBorradas > 0 ) return profesor
              throw new Error(`El profesor con el id ${args.profesorId} no se pudo borrar`)
            })
        })
    },
  }
}

module.exports = { resolvers }