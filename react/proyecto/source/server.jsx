import http from 'http';
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import Pages from './pages/containers/Page';
import Layout from './pages/components/Layout';

function requestHandler(req, res) {
  const context = {};

  const html = renderToString(
    // <Provider store={store}>
    //   <IntlProvider locale={locale} messages={messages[locale]}>
    <StaticRouter location={req.url} context={context}>
      <Pages />
    </StaticRouter>,
    //   </IntlProvider>
    // </Provider>
  );


  res.setHeader('Content-Type', 'text/html');

  if (context.url) {
    res.writeHead(301, {
      Location: context.url,
    });
    res.end();
  }

  // res.write( html );
  res.write(
    renderToStaticMarkup(
      <Layout
        title="Aplicación"
        content={html}
      />,
    ),
  );
  res.end();
}

const server = http.createServer(requestHandler);

server.listen(3000);

