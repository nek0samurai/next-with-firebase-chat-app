import firebase_app from '../firebaseConfig'

import { getFirestore, doc, setDoc } from 'firebase/firestore'

const db = getFirestore(firebase_app)

export default async function addData(collection, id, data) {
    let result = null
    let error = null

    try {
        result = await setDoc(doc(db, collection, id), data, {
            merge: true,
        })
    } catch (error) {
        // eslint-disable-next-line no-undef
        console.log(error)
    }

    return { result, error }
}
