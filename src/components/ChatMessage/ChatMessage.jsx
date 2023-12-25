import { useState } from 'react';
import React from 'react';
import cls from './ChatMessage.module.css';

const ChatMessage = ({ messages, user }) => {
	if (!messages) return null;

	return messages?.map((message) => {
		const isSender = message.uid === user?.uid;

		return (
			<div
				key={message?.id}
				className={
					isSender ? `${cls.host__message} ${cls.message}` : `${cls.friend__message} ${cls.message}`
				}>
				<p>{message?.message}</p>
				<span>{message?.time}</span>
			</div>
		);
	});
};

export default ChatMessage;
