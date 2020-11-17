import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Routes from './src/routes';
import axios from 'axios';

function render() {
  //
  return axios.get(`https://localhost:443/`).then(res => {
    return ReactDOMServer.renderToString(<Routes />);
  });
}

export default render;
