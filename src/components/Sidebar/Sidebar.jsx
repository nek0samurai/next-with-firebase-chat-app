import React, { ReactElement } from 'react';

import cls from './Sidebar.module.css';
import { db } from '@/helpers/constants/constants';
import useUsers from '@/hooks/useUsers';

import SidebarUserItem from '../SidebarUserItem/SidebarUserItem';
import NoUserAva from '@/static/img/no-ava-user.png';
import { auth } from '@/helpers/constants/constants';

import { PiSignOutBold } from 'react-icons/pi';
import Image from 'next/image';
import { collection, getDocs } from 'firebase/firestore';

const Sidebar = ({ userData, isChat, messages, chat, chatId }) => {
	const users = useUsers(userData);

	const handleSignOut = async () => {
		await auth.signOut();
	};

	return (
		<aside className={`${cls.sidebar} ${isChat ? cls.hidden : cls.active}`}>
			<header className={cls.sidebar__header}>
				<div className={cls.header__user}>
					<Image
						src={userData?.photoURL || NoUserAva}
						alt="user ava"
						width={50}
						height={50}
						className={cls.user__ava}
					/>
					<p className={cls.user__name}>
						Hello, <span>{userData?.displayName}</span>
					</p>
				</div>
				<button onClick={() => handleSignOut()} className={cls.sidebar__signout}>
					<PiSignOutBold />
				</button>
			</header>

			<div className={cls.sidebar__users}>
				<h3 className={cls.users__title}>Users</h3>
				<div className={cls.users__list}>
					{users?.map((userItem) => (
						<SidebarUserItem key={userItem.id} userItem={userItem} />
					))}
				</div>
			</div>
		</aside>
	);
};

export default Sidebar;
