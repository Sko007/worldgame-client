import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers/index';
import ReduxThunk from 'redux-thunk';

function saveToLocalStorage(state) {
	try {
		const serilizedState = JSON.stringify(state);
		localStorage.setItem('state', serializedState);
	} catch (e) {
		console.log('e', e);
	}
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(ReduxThunk));

const store = createStore(reducer, enhancer);

export default store;
