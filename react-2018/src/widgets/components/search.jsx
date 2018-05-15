import React from 'react'

import './search.css'

const Search = (props) => (
  <form
    className='Search'
    onSubmit={props.handleSubmit}
  >
    <input
      ref={props.setRef} /* se ejecuta cuando el elemento es renderizado*/
      type='text'
      placeholder='Busca tu video favorito'
      className='Search-input'
      name='search'
      defaultValue='Luis Fonsi'
      onChange={props.handleChange}
    />
  </form>
)

export default Search;