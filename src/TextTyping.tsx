import BlinkingCursor from 'BlinkingCursor';
import React, {
	useEffect,
	useState,
	FC,
	SetStateAction,
	Dispatch,
} from 'react';
import { IText } from 'types/types';

interface IProps {
	/* Internal props */
	isLast: boolean;
	handleEndOfTyping: () => void;
	nextDelay: number;
	repeatDelay: number;
	setIsEnded: Dispatch<SetStateAction<boolean>>;
	children?: JSX.Element | string;
}

/* This handles the typing of the single text element */

const TextTyping: FC<IProps & IText> = ({
	/* Internal props */
	isLast,
	handleEndOfTyping,
	nextDelay = 0,
	repeatDelay = 0,
	setIsEnded,
	/* Text opts */
	tag = 'p',
	yoyo = false,
	content = '',
	delay = 100,
	/* Cursor opts */
	cursor = '|',
	cursorDelay = 300,
	cursorColor = '',
	/* Props */
	...props
}) => {
	const Tag = tag;
	const [counter, setcounter] = useState(0);
	const [_text, setText] = useState('');
	const [showCursor, setshowCursor] = useState(true);
	const [direction, setDirection] = useState('asc');

	useEffect(() => {
		/* Switch to the next element if it's not a valid object */

		if (typeof content !== 'string') handleEndOfTyping();

		/* The timeout determines the speed of typing of each character */

		const timeout = setTimeout(() => {
			if (direction === 'desc') {
				/* If it reaches the end */
				if (counter < -1) {
					/* If it's not the last element of the array trigger the switch to the next one */
					if (!isLast) {
						setTimeout(() => {
							handleEndOfTyping();
							setshowCursor(false);
						}, nextDelay);
					}
					// otherwise set the end of the whole animation which will trigger the repeat if it's set up
					else
						setTimeout(() => {
							handleEndOfTyping();
							setIsEnded(true);
						}, repeatDelay);
					return clearTimeout(timeout);
				} else setcounter((c) => c - 1);
			}

			if (direction === 'asc') {
				/* If it reaches the end */
				if (counter >= content.length) {
					/* if yoyo is enabled switch the direction */
					if (yoyo) setDirection('desc');
					// If it's not the last element of the array trigger the switch to the next one
					else if (!isLast) {
						setTimeout(() => {
							handleEndOfTyping();
							setshowCursor(false);
						}, nextDelay);
					}
					// otherwise set the end of the whole animation which will trigger the repeat if it's set up
					else
						setTimeout(() => {
							handleEndOfTyping();
							setIsEnded(true);
						}, repeatDelay);
					return clearTimeout(timeout);
				}
				// else increase the counter
				else setcounter((c) => c + 1);
			}

			setText(content.slice(0, counter + 1));
		}, delay);
		return () => clearTimeout(timeout);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		// handleEndOfTyping, // This can create issues
		counter,
		delay,
		content,
		isLast,
		yoyo,
		direction,
		nextDelay,
		setIsEnded,
		repeatDelay,
	]);

	/* Do not render delay ( type number elements ) or other not supported types */

	return content ? (
		<Tag {...props}>
			{_text}
			{showCursor && (
				<BlinkingCursor
					cursor={cursor}
					delay={cursorDelay}
					color={cursorColor}
				/>
			)}
		</Tag>
	) : null;
};

export default TextTyping;
