import React from 'react';
import PropTypes from 'prop-types';

function Layout(props) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <title>{props.title}</title>
        <link rel="stylesheet" href={`${props.domain}/main.css`} />
        <link rel="stylesheet" href={`${props.domain}/styles.css`} />
      </head>
      <body>
        <div
          id="render-target"
          dangerouslySetInnerHTML={{
            __html: props.content,
          }}
        />
        <script src={`${props.domain}/app.js`} />
      </body>
    </html>
  );
}

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  domain: PropTypes.string.isRequired,
}

Layout.defaultProps = {}

export default Layout;
