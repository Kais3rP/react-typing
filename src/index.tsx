import TextTyping from './TextTyping';
import React, { useCallback, useEffect, useMemo, useState, FC } from 'react';
import { IText, ITypeAnimationProps } from 'types/types';

const TypeAnimation: FC<ITypeAnimationProps> = React.memo(
	({
		text = [],
		repeat = 0,
		repeatDelay = 1000,
		onAnimationEnd,
		indexTrigger,
	}) => {
		const [textCounter, settextCounter] = useState(0);
		const [repeatCounter, setrepeatCounter] = useState(0);

		/* This controls the end of the whole typing cycle, when all the texts in the array have been typed, if repeat is not set up no more typing is occurring */
		const [isEnded, setIsEnded] = useState(false);
		/* This controls the end of the typing of the first ellement of texts, it's used internally in case there is an infinite typing element 
		nested that has to trigger the prosecution of typing when its first element is done to be typed */
		const [
			isNestedTriggerElementReached,
			setisNestedTriggerElementReached,
		] = useState(false);

		/* This is the function that is called when each element of the text array has done being typed and triggers the switch to the next one */

		const handleEndOfTyping = useCallback(() => {
			/* This ensures that if we have a nest TypeAnimation in the sequence with infinite loop, the next element in the original sequence fires when the first element of the nested animation has completed */
			console.log('Text counter', textCounter);
			if (
				typeof onAnimationEnd === 'function' &&
				!isNestedTriggerElementReached &&
				indexTrigger === textCounter
			) {
				onAnimationEnd();
				setisNestedTriggerElementReached(true);
			} else settextCounter((c) => c + 1);
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [
			indexTrigger,
			isNestedTriggerElementReached,
			onAnimationEnd,
			textCounter,
		]);

		/* Effects */

		/* This handles the Repeat feature */

		useEffect(() => {
			/* Early return if : 
			- repeat is not set
			- repeat is a negative number different from -1 ( used for infinite repeat )
			- repeatCounter is greater than the number of repeats to obtain and the number of repeats is different than -1 */

			if (
				!repeat ||
				repeat < -1 ||
				(repeatCounter >= repeat && repeat !== -1)
			)
				return setIsEnded(false);

			if (isEnded) {
				settextCounter(-1); // restart the animation
				setrepeatCounter((c) => c + 1); // increase the repeat counter
				setIsEnded(false); // reset the animation state flag
			}
		}, [isEnded, repeat, repeatCounter, text]);

		/* Handle the reset of the array of text to show when the repeat flag is on, it has to perform an additional rerender to reset the first element of the array to the original empty state, 
		otherwise it never unmounts if we set the textCounter back to 0 straight */

		useEffect(() => {
			if (textCounter === -1) settextCounter(0);
		}, [textCounter]);

		/* This is the text array to show with the sequence of elements that get typed */

		const textToShow = useMemo(
			() => text.slice(0, textCounter + 1),
			[text, textCounter]
		);

		/* Unmount rendering null when repeating the cycle */
		const hasToReset = isEnded && repeatCounter < repeat;

		return (
			<>
				{hasToReset
					? null
					: textToShow.map((t, i) =>
							(t as ITypeAnimationProps).text ? (
								<TypeAnimation
									key={
										(
											(t as ITypeAnimationProps)
												.text[0] as IText
										).content
									}
									{...(t as ITypeAnimationProps)}
									onAnimationEnd={handleEndOfTyping}
								/>
							) : (
								<TextTyping
									key={(t as IText).content}
									{...(t as IText)}
									handleEndOfTyping={handleEndOfTyping}
									setIsEnded={setIsEnded}
									isLast={i === text.length - 1}
									nextDelay={
										typeof text[i + 1] === 'number'
											? (text[i + 1] as number)
											: 0
									}
									repeatDelay={repeatDelay}
								/>
							)
					  )}
			</>
		);
	}
);

TypeAnimation.displayName = 'TypeAnimation';

export default TypeAnimation;
