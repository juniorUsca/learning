import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl'

function Layout(props) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        {/* <title>{props.title}</title> */}
        {/* <FormattedMessage
          id="title.home"
          tagName="title"
        /> */}
        <FormattedMessage
          id={props.titleId}
          tagName="title"
          defaultMessage="asd"
        />
        <link rel="stylesheet" href={`${props.domain}/main.css`} />
        <link rel="stylesheet" href={`${props.domain}/styles.css`} />
      </head>
      <body>
        <FormattedMessage
          id="title.home"
          tagName="h1"
        />
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
  titleId: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  domain: PropTypes.string.isRequired,
}

Layout.defaultProps = {}

export default Layout;
