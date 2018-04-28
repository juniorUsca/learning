import React from 'react';
import ReactDOM from 'react-dom';
import data from './src/api.json'

import Playlist from './src/playlist/components/playlist.jsx'

const container = document.getElementById('app');
const app = <Playlist data={data}/>

ReactDOM.render(app, container);