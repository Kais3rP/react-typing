import React, { useEffect, useState, FC } from 'react';

interface IProps {
	cursor: string;
	color: string;
	delay: number;
}

const BlinkingCursor: FC<IProps> = React.memo(({ cursor, color, delay }) => {
	const [isVisible, setisVisible] = useState(true);

	useEffect(() => {
		const interval = setInterval(() => setisVisible((b) => !b), delay);
		return () => clearInterval(interval);
	}, [delay]);

	return (
		<div
			style={{
				display: 'inline-block',
				opacity: isVisible ? 1 : 0,
				transition: 'opacity 0.2s ease-in-out',
				color: color || 'inherit',
			}}
		>
			{cursor}
		</div>
	);
});

BlinkingCursor.displayName = 'BlinkingCursor';

export default BlinkingCursor;
