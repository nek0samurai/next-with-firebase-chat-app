'use client';

import React, { FC } from 'react';

import Sidebar from '@/components/Sidebar/Sidebar';
import Chat from '@/components/Chat/Chat';
import cls from './page.module.css';
import { auth } from '@/helpers/constants/constants';
import useAuthUser from '@/hooks/useAuthUser';

import { useRouter, useSearchParams } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';

const Dashboard = () => {
	const chatParams = useSearchParams();
	const isChat = chatParams.has('chatId');
	const user = useAuthUser();
	const router = useRouter();

	onAuthStateChanged(auth, (user) => {
		if (!user) {
			router.push('/auth/login');
		}
	});

	return (
		<div className={cls.dashboard}>
			<Sidebar userData={user} isChat={isChat}></Sidebar>
			<Chat user={user} isChat={isChat}></Chat>
		</div>
	);
};

export default Dashboard;
