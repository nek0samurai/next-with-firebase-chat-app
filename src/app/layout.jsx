import React from 'react';

import Header from '@/components/Header/Header';
import './globals.css';
import cls from './page.module.css';

export const metadata = {
	title: 'test-next',
	description: 'creating nextJS chat',
};

export default function RootLayout({ children }) {
	console.log(1);

	return (
		<html lang="en">
			<body className="body">
				<Header></Header>
				<div className={cls.wrapper}>{children}</div>
			</body>
		</html>
	);
}
