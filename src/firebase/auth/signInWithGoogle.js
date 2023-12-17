import { auth } from '@/helpers/constants/constants'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export async function SignInWithGoogle() {
    const provider = new GoogleAuthProvider();

    try {
        await signInWithPopup(auth, provider);
    } catch (error) {
        console.error("Error signing in with Google", error);
    }
}