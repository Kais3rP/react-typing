import TypeAnimation from 'react-typing';
import styles from './styles.module.css';

const typingText = [
	{
		content: 'This is',
		className: styles.text1,
	},
	500,
	{
		content: 'react-typing',
		className: styles.text2,
	},
	{
		content: 'a React Typing Library!',
		className: styles.text1,
	},
	500,
	// This is how you set up a multiple sequence nested in the typing timeline.
	// You can use it to nest infinite repeat yoyo sequences, or to set up an infinite repeat nested element
	{
		text: [
			{
				content: 'Fast',
				className: styles.text3,
				tag: 'span',
				yoyo: true,
			},
			{
				content: 'Highly Customizable',
				className: styles.text3,
				tag: 'span',
				yoyo: true,
			},
			{
				content: 'Composable',
				className: styles.text3,
				tag: 'span',
				yoyo: true,
			},
		],
		repeat: -1,
		repeatDelay: 1000,
	},
	500,
	{
		content: 'Hope you like it!',
		className: styles.text1,
	},
];

export default function App() {
	return (
		<div className={styles.container}>
			<TypeAnimation
				text={typingText}
				// repeat={-1}
				// repeatDelay={2000}
			/>
		</div>
	);
}
