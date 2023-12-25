'use client';

import React, { FC, useEffect } from 'react';

import Sidebar from '@/components/Sidebar/Sidebar';
import Chat from '@/components/Chat/Chat';
import cls from './page.module.css';
import { auth } from '@/helpers/constants/constants';
import useAuthUser from '@/hooks/useAuthUser';
import useRoom from '@/hooks/useRoom';
import useMessages from '@/hooks/useMessages';

import { useRouter, useSearchParams } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';

const Dashboard = () => {
	const chatParams = useSearchParams();
	const isChat = chatParams.has('chatId');
	const searchParams = useSearchParams();
	const chatId = searchParams.get('chatId');
	const user = useAuthUser();

	const userId = user?.uid;

	const chat = useRoom(chatId, userId);

	const messages = useMessages(chatId);

	const router = useRouter();

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (!user) {
				router.push('/auth/login');
			}
		});
	}, []);

	return (
		<div className={cls.dashboard}>
			<Sidebar userData={user} isChat={isChat}></Sidebar>
			<Chat user={user} chat={chat} messages={messages} chatId={chatId} isChat={isChat}></Chat>
		</div>
	);
};

export default Dashboard;
