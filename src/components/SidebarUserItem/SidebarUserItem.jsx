import React, { useEffect } from 'react';
import cls from './SidebarUserItem.module.css';
import Link from 'next/link';
import Image from 'next/image';
import NoUserAva from '@/static/img/no-ava-user.png';
import useMessages from '@/hooks/useMessages';

const SidebarUserItem = ({ userItem }) => {
	const messages = useMessages(userItem.id);

	const lastM = messages?.length > 0 ? messages[messages.length - 1] : null;

	return (
		<Link href={`?chatId=${userItem.id}`}>
			<div className={cls.list_item__block}>
				<Image
					src={userItem?.photoURL || NoUserAva}
					alt="user ava"
					width={50}
					height={50}
					className={cls.user__ava}
				/>
				<div className={cls.user__block}>
					<span className={cls.user__name}>{!userItem.name ? 'No name' : userItem.name}</span>
					<p className={cls.user__message}>{lastM ? lastM.message : ''}</p>
				</div>
			</div>
		</Link>
	);
};

export default SidebarUserItem;
