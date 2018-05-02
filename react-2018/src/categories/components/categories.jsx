import React from 'react'

import Category from './category.jsx';
import SearchContainer from '../../widgets/containers/search-container.jsx'

import './categories.css'

function Categories(props) {
  return(
    <div className='Categories'>
      <SearchContainer />
      {
        props.categories.map(item => {
          return <Category
            key={item.id}
            {...item}
            handleOpenModal={props.handleOpenModal}
          />
        })
      }
    </div>
  )
}

export default Categories;