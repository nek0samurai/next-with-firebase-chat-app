'use client';
import React, { useEffect } from 'react';
import cls from './page.module.css';
import { AuthContextProvider } from '@/context/AuthContext';
import useAuthUser from '@/hooks/useAuthUser';
import { useRouter } from 'next/navigation';

export default function Home({ children }) {
	const user = useAuthUser();
	const router = useRouter();

	useEffect(() => {
		if (user) {
			router.push('dashboard/');
		} else {
			router.push('auth/login');
		}
	}, []);

	return (
		<AuthContextProvider>
			<div className={cls.main}>{children}</div>
		</AuthContextProvider>
	);
}
