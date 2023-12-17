import React from 'react';
import cls from './SidebarUserItem.module.css';
import Link from 'next/link';
import Image from 'next/image';
import NoUserAva from '@/static/img/no-ava-user.png';

const SidebarUserItem = ({ userItem }) => {
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
				<span className={cls.user__name}>{!userItem.name ? 'No name' : userItem.name}</span>
			</div>
		</Link>
	);
};

export default SidebarUserItem;
