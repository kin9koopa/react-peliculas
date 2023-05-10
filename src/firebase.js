import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyBlw3bNY6Vw8dykBqyMHH8P5fz2AJB6H3Q',
	authDomain: 'moviereact-75790.firebaseapp.com',
	projectId: 'moviereact-75790',
	storageBucket: 'moviereact-75790.appspot.com',
	messagingSenderId: '277130962636',
	appId: '1:277130962636:web:1101066cf834cd1e68c469',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
