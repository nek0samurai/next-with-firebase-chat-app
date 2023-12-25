import React from 'react';

import cls from './DragAndDrop.module.css';

const DragAndDrop = ({ isDrag }) => {
	return (
		<div className={`${cls.dragAndDrop} ${isDrag ? cls.dragActive : cls.dragInactive}`}>
			DragAndDrop
		</div>
	);
};

export default DragAndDrop;
