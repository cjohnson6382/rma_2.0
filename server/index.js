import makeStore from './src/store';
import {startServer} from './src/server';

export const store = makeStore();


//	does startServer not return a promise?
startServer(store);
//	.then(() => console.log('server started'));
