'use client';
import React, { ReactElement, useState } from 'react';

import cls from './Chat.module.css';

import useMessages from '@/hooks/useMessages';
import { db } from '@/helpers/constants/constants';
import Link from 'next/link';

import { useSearchParams } from 'next/navigation';
import useRoom from '@/hooks/useRoom';
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';

import { IoMdArrowRoundBack } from 'react-icons/io';
import NoUserAva from '@/static/img/no-ava-user.png';

import ChatInput from '../ChatInput/ChatInput';
import ChatMessage from '../ChatMessage/ChatMessage';
import Image from 'next/image';

const Chat = ({ user, isChat }) => {
	const [input, setInput] = useState('');
	const searchParams = useSearchParams();
	const chatId = searchParams.get('chatId');
	const userId = user?.uid;

	const chat = useRoom(chatId, userId);

	const messages = useMessages(chatId);

	const time = new Date().getUTCHours() + ':' + new Date().getUTCMinutes();

	async function sendMessage(e) {
		e.preventDefault();
		setInput('');
		await setDoc(doc(db, `users/${userId}/chats/${chatId}`), {
			name: chat?.name,
			photoURL: chat?.photoURL || null,
			timestamp: serverTimestamp(),
		});

		if (input) {
			await addDoc(collection(db, `chats/${chatId}/messages`), {
				name: user.displayName,
				message: input,
				uid: user.uid,
				timestamp: serverTimestamp(),
				time: time,
			});
		} else {
			console.log('no message');
		}
	}

	return chat ? (
		<main className={isChat ? cls.dashboard__main : cls.hidden}>
			<div className={cls.main__header}>
				{chatId ? (
					<div className={cls.header__user}>
						<Link href={`/dashboard`}>
							<button className={cls.header__back}>
								<IoMdArrowRoundBack />
							</button>
						</Link>
						<Image
							// loader={() => myImageLoader(chat.photoURL || NoUserAva)}
							className={cls.user__ava}
							src={chat?.photoURL || NoUserAva}
							width={50}
							height={50}
							alt="user ava"
						/>
						<div className={cls.user__chat_info}>
							<span>{chat?.name || 'No name'}</span>
						</div>
					</div>
				) : null}
			</div>
			<div className={cls.main__chat}>
				<ChatMessage messages={messages} user={user} chatId={chatId} />
			</div>
			<ChatInput
				input={input}
				setInput={setInput}
				onChange={(e) => setInput(e.target.value)}
				chat={chat}
				chatId={chatId}
				user={user}
				sendMessage={sendMessage}></ChatInput>
		</main>
	) : (
		<>Loading</>
	);
};

export default Chat;
