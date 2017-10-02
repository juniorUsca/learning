import http from 'http';
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'

import Pages from './pages/containers/Page';
import Layout from './pages/components/Layout';
import messages from './messages.json'
import store from './store'

const staticsDomain = process.env.NODE_ENV === 'production' ?
  'https://junior-react-statics.now.sh' :
  'http://localhost:3001'

function titleHandler(url) {
  if (url === '/') return 'title.home'
  if (/^\/post\/[0-9]+$/.test(url)) return 'title'
  if (/^\/user\/[0-9]+$/.test(url)) return 'profile.title'
  return 'error.404'
}

function requestHandler(req, res) {
  // vemos en q lenguage esta el navegador
  const locale = req.headers['accept-language'].indexOf('es') >= 0 ? 'es' : 'en'
  const context = {};

  const html = renderToString(
    <Provider store={store}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <StaticRouter location={req.url} context={context}>
          <Pages />
        </StaticRouter>
      </IntlProvider>
    </Provider>,
  );


  res.setHeader('Content-Type', 'text/html');

  if (context.url) {
    res.writeHead(301, {
      Location: context.url,
    });
    res.end();
  }

  // console.log('desde el server\n', html);
  // res.write( html );
  res.write(
    renderToStaticMarkup(
      <IntlProvider locale={locale} messages={messages[locale]}>
        <Layout
          titleId={titleHandler(req.url)}
          content={html}
          domain={staticsDomain}
        />
      </IntlProvider>
      ,
    ),
  );
  res.end();
}

const server = http.createServer(requestHandler);

server.listen(3000);

