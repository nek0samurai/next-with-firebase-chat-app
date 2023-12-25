'use client';
import React, { useEffect, useRef, useState } from 'react';

import cls from './Chat.module.css';

import useMessages from '@/hooks/useMessages';
import { db, storage } from '@/helpers/constants/constants';
import Link from 'next/link';

import { useSearchParams } from 'next/navigation';
import useRoom from '@/hooks/useRoom';
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';

import { IoMdArrowRoundBack } from 'react-icons/io';
import NoUserAva from '@/static/img/no-ava-user.png';

import DragAndDrop from '../DragAndDrop/DragAndDrop';
import ChatInput from '../ChatInput/ChatInput';
import ChatMessage from '../ChatMessage/ChatMessage';
import Image from 'next/image';
import NoCurrentUser from '../NoCurrentUser/NoCurrentUser';

const Chat = ({ user, isChat, messages, chat, chatId }) => {
	const ref = useRef(null);
	const [isDrag, setIsDrag] = useState(false);
	const [input, setInput] = useState('');
	const [files, setFiles] = useState(null);

	const time = new Date().getHours() + ':' + new Date().getMinutes();

	const scrollToBottom = () => {
		ref.current.scrollIntoView({ block: 'end' });
	};

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
		scrollToBottom();
	}

	const onDragStart = (e) => {
		e.preventDefault();
		e.stopPropagation();
		console.log(e.target);
		setIsDrag(true);
	};

	const onDragLeave = (e) => {
		e.preventDefault();
		e.stopPropagation();
		console.log(e.target);
		setIsDrag(false);
	};

	const onDragOver = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDrag(true);
	};

	const onDropHandler = (e) => {
		e.preventDefault();
		let files = [...e.dataTransfer.files];
		setFiles(files);

		if (files) {
			const reader = new FileReader();
			reader.readAsDataURL(...files);
			reader.onload = () => {
				console.log(reader.result);
			};
			setIsDrag(false);
		}
	};

	return (
		<main ref={ref} className={`${cls.dashboard__main} ${isChat ? cls.active : cls.hidden}`}>
			{chat ? (
				<div className={`${cls.Chat__wrapper}`}>
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
					<div className={`${cls.main__chat}`}>
						<ChatMessage messages={messages} user={user} chatId={chatId} />
					</div>
					<ChatInput
						input={input}
						setInput={setInput}
						onChange={(e) => setInput(e.target.value)}
						chat={chat}
						chatId={chatId}
						user={user}
						sendMessage={sendMessage}
					/>
				</div>
			) : (
				<NoCurrentUser />
			)}
			<DragAndDrop
				isDrag={isDrag}
				onDrop={(e) => onDropHandler(e)}
				onDragStart={(e) => onDragStart(e)}
				onDragLeave={(e) => onDragLeave(e)}
				onDragOver={(e) => onDragOver(e)}
			/>
		</main>
	);
};

export default Chat;
