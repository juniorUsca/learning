import React from 'react'

import './search.css'

const Search = (props) => (
  <form className='Search'>
    <input
      type='text'
      placeholder='Busca tu video favorito'
      className='Search-input'
    />
  </form>
)

export default Search;