import firebase_app from '../firebaseConfig';

import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

const auth = getAuth(firebase_app);

export default async function SignUp({ email, password }) {
	let result = null;
	const error = null;

	try {
		result = await createUserWithEmailAndPassword(auth, email, password);
	} catch (error) {
		console.log(error);
	}

	return { result, error };
}
