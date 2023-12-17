import React, { FC, useState } from 'react';
import { BsFillSendFill } from 'react-icons/bs';
import { CiFaceSmile } from 'react-icons/ci';

import cls from './ChatInput.module.css';
import EmojiPicker from 'emoji-picker-react';

const ChatInput = ({ user, input, setInput, onChange, chat, chatId, sendMessage }) => {
	const [showPicker, setShowPicker] = useState(false);

	const onEmojiClick = (emojiObject) => {
		setInput((prevInput) => prevInput + emojiObject?.emoji);

		setShowPicker(false);
	};

	return (
		<div className={cls.chat__field}>
			<form onSubmit={sendMessage} className={cls.chat__box}>
				<label htmlFor="messageInput" hidden>
					ENTER MESSAGE
				</label>
				<input
					className={cls.chat__input}
					type="text"
					placeholder="Type a message"
					name="messageInput"
					id="messageInput"
					value={input}
					onChange={onChange}
				/>
				{showPicker && (
					<div className={cls.emojiPicker}>
						<EmojiPicker onEmojiClick={(emojiObject) => onEmojiClick(emojiObject)} />
					</div>
				)}
				<div className={cls.chat__emoji} onClick={() => setShowPicker((val) => !val)}>
					<CiFaceSmile />
				</div>
				<button className={cls.chat__btn} type="submit">
					<span>Send</span> <BsFillSendFill />
				</button>
			</form>
		</div>
	);
};

export default ChatInput;
