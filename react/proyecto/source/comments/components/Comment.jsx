import React from 'react';

// es una funcion pura xq no se hace peticiones ni nada

function Comment (props) {
  return(
    <article id={`comment-${props.id}`}>
      <div>
        By: <a href={`mailto: ${props.email}`}>{props.name}</a>
      </div>
      <p>{props.body}</p>
    </article>
  );
}

export default Comment;
