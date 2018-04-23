import React from 'react';
import ReactDOM from 'react-dom';
import Media from './src/playlist/components/media.jsx'

const container = document.getElementById('app');
const app = <Media
  title = 'Que es responsive design?'
  author = 'Junior Usca'
  image = './images/covers/responsive.jpg'
  type = 'video'
/>
ReactDOM.render(app, container);