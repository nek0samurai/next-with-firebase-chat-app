'use client';
import React from 'react';
import cls from './page.module.css';
import { AuthContextProvider } from '@/context/AuthContext';

export default function Home({ children }) {
	return (
		<AuthContextProvider>
			<div className={cls.main}>{children}</div>
		</AuthContextProvider>
	);
}
