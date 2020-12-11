import React, { useState, useEffect } from 'react';
import './styles.css';
import usePress from './usePress';

export default function App() {
	const [longPressCount, setlongPressCount] = useState(0);
	const [clickCount, setClickCount] = useState(0);
	const [morseCode, setMorseCode] = useState('');

	const onLongPress = () => {
		console.log('longpress is triggered');
		setlongPressCount((preLongPressCount) => preLongPressCount + 1);
		setMorseCode((preMorseCode) => preMorseCode + '-');
	};

	const onClick = () => {
		console.log('click is triggered');
		setClickCount((preClickCount) => preClickCount + 1);
		setMorseCode((preMorseCode) => preMorseCode + '.');
	};

	const defaultOptions = {
		shouldPreventDefault: true,
		delay: 1500,
	};

	const longPressEvent = usePress(onLongPress, onClick, defaultOptions);

	useEffect(() => {
		window.onmousedown = longPressEvent.onMouseDown;
		window.onmouseup = longPressEvent.onMouseUp;
		window.onmouseleave = longPressEvent.onMouseLeave;
		window.onkeydown = longPressEvent.onTouchStart;
		window.onkeyup = longPressEvent.onTouchEnd;
		/*
		window.addEventListener('keydown', (e) => {
			if (e.repeat) return;
			if (e.code === 'Space') {
				console.log('spacedown!');
				longPressEvent.onMouseDown(e);
			}
		});
		return () =>
			window.removeEventListener('keydown', longPressEvent.onMouseUp);
		
		window.addEventListener('keyup', (e) => {
			if (e.code === 'Space') {
				console.log('spaceup!');
				longPressEvent.onMouseUp(e);
			}
		});
		*/
	}, [longPressEvent]);

	return (
		<div className="App">
			<h1>Morse Code</h1>
			<p>
				Please press <strong>Space</strong> or{' '}
				<strong>Left Click</strong> to input a morse code, Dash (-) for
				pressing more than 1.5 sec, Dot (.) otherwise.
			</p>
			<span>Long press count: {longPressCount}</span>
			<span>Click count: {clickCount}</span>
			<span>Morse Code: {morseCode}</span>
		</div>
	);
}
