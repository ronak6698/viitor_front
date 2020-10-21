import React from 'react';
import { render } from 'react-dom';

import './assets/css/theme.scss';
import './assets/css/custom.scss';
import  App  from './App';
import registerServiceWorker from './registerServiceWorker';

render(
        <App />,
    document.getElementById('root')
);
registerServiceWorker();
