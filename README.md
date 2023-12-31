# react-typing-sequence

[![NPM](https://img.shields.io/npm/v/react-typing-sequence.svg)](https://www.npmjs.com/package/react-typing-sequence)
[![npm](https://img.shields.io/npm/dm/react-typing-sequence.svg)](https://www.npmjs.com/package/react-typing-sequence)

## Try it out

Try it [here](https://kais3rp.github.io/react-typing/)
Check the [GitHub repo](https://github.com/Kais3rP/react-typing)

## Introduction

A React Typing library.

## Reasons:

There are already other well known Typing libraries that do their job, are well mantained and have been used for years now, so why the need for another library ?
I found that to compose sequentially multiple animations with different styles/behaviours, you had to instantiate multiple Typing components and setup an internal React state to handle the trigger of the new text to type when the previous one was ended using something like `onComplete` or `onEnd` events. 
I just thought it was better to have a single component overpowered with the ability to handle sequential text, individually styled and with an individual behaviour.

Purely React based, two hundreds lines of code, fast, light, composable, easy API.
The main idea is to be able to compose complex typing sequences, with "yoyo" effects, custom delays, custom CSS styling for each segment, custom cursors, etc... etc... Without having to instantiate multiple Components.
You just render one `<TypeAnimation text={textSequence} />` and textSequence is gonna be an array containing all the text and settings you wanna dynamically type.

## Install

```bash
npm install --save react-typing-sequence
```

Or with yarn:

```bash
yarn add react-typing-sequence
```

## Usage

Check the `example` folder for a comprehensive example of how to import and use the React Component in your application.

This is as simple as doing:

```javascript
const MyComponent = () => <TypeAnimation text={textSequence} />;
```

## API / Props

| Props       | Default value | Required | Type   |
| ----------- | ------------- | -------- | ------ |
| text        | undefined     | true     |  (IText \| ITypeAnimation   \|number)[]  \| [] |
| repeat      | 0             | false    | number |
| repeatDelay | 1000          | false    | number |

## Types

```javascript
interface ITypeAnimation {
	text: (IText | ITypeAnimation | number)[] | [];
	repeat?: number;
	repeatDelay?: number;
	indexTrigger?: number  // This prop makes sense only if used in a nested animation, since it allows to choose at what index of the nested typing sequence 
					       // to trigger the start of the next element of the main sequence
}

interface IText {
	content: string;
	tag?: string;
	delay?: number; // speed of typing
	yoyo?: boolean;
	cursor?: string;
	cursorDelay?: number;
	cursorColor?: string;
	[key]: string;
}
```

This is the example app props passed to the Component:

```javascript
const typingText = [
	{
		content: 'This is',
		className: styles.text1,
	},
	500,
	{
		content: 'react-typing-sequence',
		className: styles.text2,
	},
	{
		content: 'a React Typing Library!',
		className: styles.text1,
	},
	500,
	// This is how you set up a multiple sequence nested in the typing timeline.
	// You can use it to nest infinite repeat yoyo sequences for examples or whatever you like
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

```

As you can see you can customize any chunk of the sequence singularly, they are gonna be executed sequentially, you can decide if some chunk has to perform a *yoyo* animation, you can style them by using standard JSX attributes `className` and inline `style` . You can pass whatever event listener or any other HTML attribute, it'll end up on the container element.

If you wish to nest another typing animation in the main typing animation, with its own isolated lifecycle, you can easily pass an object of type `ITypeAnimation` instead of `IText`, it's gonna work out of the box with no overhead since internally it's gonna call itself recursively.

If you pass a number, that's gonna be executed as a delay in *ms* between the animations.

## Notes

Most of these typing libraries use a prop called *speed* to determine the typing speed, but it usually accepts a number that determines the delay in *ms* between the typing of each character, so I decided to call it `delay` instead, so to be clear that, the higher the number, the slower the typing speed.So you have full control on any kind of delay, *character typing delay*, *text chunk delay*, and *repeat sequence delay*.

## License

MIT © [react-typing-sequence](https://github.com/Kais3rP/react-typing-sequence)
