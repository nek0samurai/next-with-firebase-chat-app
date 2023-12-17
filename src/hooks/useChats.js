import { useCollection } from 'react-firebase-hooks/firestore'
import { collection, orderBy, query } from 'firebase/firestore'
import db from '../helpers/constants/constants'

export default function useChats(user) {
    const [snapshot] = useCollection(
        query(
            collection(db, `users/${user.uid}/chats`),
            orderBy('timestamp', 'desc')
        )
    )

    const chats = snapshot?.docs.forEach((doc) => ({
        id: doc.id,
        ...doc.data(),
    }))

    return chats
}
