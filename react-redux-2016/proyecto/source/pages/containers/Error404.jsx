import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl'

// es una funcion pura xq solo retorna html
function Error404() {
  return (
    <section name="Error404">
      <h1>Error 404</h1>
      <Link to="/">
        <FormattedMessage id="error.404" /> /
      </Link>
    </section>
  );
}

export default Error404;
