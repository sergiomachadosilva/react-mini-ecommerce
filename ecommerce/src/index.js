import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MiniEcommerce from './ecommerce';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'

ReactDOM.render(
  <Container className="mt-3">
    <MiniEcommerce />
  </Container>,
  document.getElementById('root')
);

serviceWorker.unregister();
