import { collection, orderBy, query } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../helpers/constants/constants';

export default function useMessages(chatId) {
	const [snapshot] = useCollection(
		chatId ? query(collection(db, `chats/${chatId}/messages`), orderBy('timestamp', 'asc')) : null,
	);

	const messages = snapshot?.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));

	return messages;
}
