declare global {}

export interface IText {
	content: string;
	tag?: keyof JSX.IntrinsicElements;
	delay?: number; // speed of typing
	yoyo?: boolean;
	cursor?: string;
	cursorDelay?: number;
	cursorColor?: string;
	[key]: string;
}

export interface ITypeAnimationProps {
	text: (IText | ITypeAnimationProps | number)[] | [];
	repeat?: number;
	repeatDelay?: number;
	children?: JSX.Element | string;
	onAnimationEnd?: () => void;
}
