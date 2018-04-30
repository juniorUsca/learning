import React from 'react';
import ReactDOM from 'react-dom';
import data from './../api.json'

import Home from './../pages/containers/home.jsx'

const container = document.getElementById('home-container');
const app = <Home data={data}/>

ReactDOM.render(app, container);
