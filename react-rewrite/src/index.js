import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import 'normalize.css'

import beerpongApp from './reducers'
import App from './components/App'

import './index.css'

/* eslint-disable no-underscore-dangle */
const store = createStore(
	beerpongApp,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)
/* eslint-enable */

render(
	<Provider store={store}>
		<App />
	</Provider>,
    document.getElementById('root'),
)
