import React from 'react';

import Header from '@/components/Header/Header';
import { Suspense } from 'react';
import './globals.css';
import cls from './page.module.css';
import Loading from './loading';

export const metadata = {
	title: 'test-next',
	description: 'creating nextJS chat',
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className="body">
				{/* <Header></Header> */}
				<Suspense fallback={<Loading />}>
					<div className={cls.wrapper}>{children}</div>
				</Suspense>
			</body>
		</html>
	);
}
