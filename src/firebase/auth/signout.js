import { auth } from '@/helpers/constants/constants'


export default function SignOut() {
    try {
        return auth.signOut()
    } catch (error) {
        console.log(error);
    }
}