/* Providers */
import { FC } from 'react';

export interface IProps {
	children?: JSX.Element | string;
	options: { language: string };
	styleOptions: IStyleTheme;
	textContainer: HTMLElement;
}

const Component: FC<IProps> = (props) => {
	return null;
};

Component.defaultProps = {};

export default Component;
