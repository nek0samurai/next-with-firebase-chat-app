import { useDocument } from 'react-firebase-hooks/firestore'
import { doc } from 'firebase/firestore'
import { db } from '../helpers/constants/constants'

export default function useRoom(roomId, userId) {
    const isUserRoom = roomId?.includes(userId)
    const docId = isUserRoom ? roomId.replace(userId, '') : roomId

    const [snapshot] = useDocument(docId ? doc(db, `users/${docId}`) : null)

    if (!snapshot?.exists()) return null

    return {
        id: snapshot.id,
        photoURL: snapshot.photoURL,
        name: snapshot.name,
        ...snapshot.data(),
    }
}
