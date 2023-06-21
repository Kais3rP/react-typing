'use strict';

var React = require('react');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

const BlinkingCursor = React.memo(({ cursor, color, delay }) => {
    const [isVisible, setisVisible] = React.useState(true);
    React.useEffect(() => {
        const interval = setInterval(() => setisVisible((b) => !b), delay);
        return () => clearInterval(interval);
    }, [delay]);
    return (React.createElement("div", { style: {
            display: 'inline-block',
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.2s ease-in-out',
            color: color || 'inherit',
        } }, cursor));
});
BlinkingCursor.displayName = 'BlinkingCursor';

/* This handles the typing of the single text element */
const TextTyping = (_a) => {
    var { 
    /* Internal props */
    isLast, handleEndOfTyping, nextDelay = 0, repeatDelay = 0, setIsEnded, 
    /* Text opts */
    tag = 'p', yoyo = false, content = '', delay = 100, 
    /* Cursor opts */
    cursor = '|', cursorDelay = 300, cursorColor = '' } = _a, 
    /* Props */
    props = __rest(_a, ["isLast", "handleEndOfTyping", "nextDelay", "repeatDelay", "setIsEnded", "tag", "yoyo", "content", "delay", "cursor", "cursorDelay", "cursorColor"]);
    const Tag = tag;
    const [counter, setcounter] = React.useState(0);
    const [_text, setText] = React.useState('');
    const [showCursor, setshowCursor] = React.useState(true);
    const [direction, setDirection] = React.useState('asc');
    // console.log('Type component, text:', _text);
    React.useEffect(() => {
        /* Switch to the next element if it's not a valid object */
        if (typeof content !== 'string')
            handleEndOfTyping();
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
                }
                else
                    setcounter((c) => c - 1);
            }
            if (direction === 'asc') {
                /* If it reaches the end */
                if (counter >= content.length) {
                    /* if yoyo is enabled switch the direction */
                    if (yoyo)
                        setDirection('desc');
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
                else
                    setcounter((c) => c + 1);
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
    return content ? (React.createElement(Tag, Object.assign({}, props),
        _text,
        showCursor && (React.createElement(BlinkingCursor, { cursor: cursor, delay: cursorDelay, color: cursorColor })))) : null;
};

const TypeAnimation = React.memo(({ text = [], repeat = 0, repeatDelay = 1000, onAnimationEnd, indexTrigger, }) => {
    const [textCounter, settextCounter] = React.useState(0);
    const [repeatCounter, setrepeatCounter] = React.useState(0);
    /* This controls the end of the whole typing cycle, when all the texts in the array have been typed, if repeat is not set up no more typing is occurring */
    const [isEnded, setIsEnded] = React.useState(false);
    /* This controls the end of the typing of the first ellement of texts, it's used internally in case there is an infinite typing element
    nested that has to trigger the prosecution of typing when its first element is done to be typed */
    const [isNestedTriggerElementReached, setisNestedTriggerElementReached,] = React.useState(false);
    /* This is the function that is called when each element of the text array has done being typed and triggers the switch to the next one */
    const handleEndOfTyping = React.useCallback(() => {
        /* This ensures that if we have a nest TypeAnimation in the sequence with infinite loop, the next element in the original sequence fires when the first element of the nested animation has completed */
        console.log('Text counter', textCounter);
        if (typeof onAnimationEnd === 'function' &&
            !isNestedTriggerElementReached &&
            indexTrigger === textCounter) {
            onAnimationEnd();
            setisNestedTriggerElementReached(true);
        }
        else
            settextCounter((c) => c + 1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        indexTrigger,
        isNestedTriggerElementReached,
        onAnimationEnd,
        textCounter,
    ]);
    /* Effects */
    /* This handles the Repeat feature */
    React.useEffect(() => {
        /* Early return if :
        - repeat is not set
        - repeat is a negative number different from -1 ( used for infinite repeat )
        - repeatCounter is greater than the number of repeats to obtain and the number of repeats is different than -1 */
        if (!repeat ||
            repeat < -1 ||
            (repeatCounter >= repeat && repeat !== -1))
            return setIsEnded(false);
        if (isEnded) {
            settextCounter(-1); // restart the animation
            setrepeatCounter((c) => c + 1); // increase the repeat counter
            setIsEnded(false); // reset the animation state flag
        }
    }, [isEnded, repeat, repeatCounter, text]);
    /* Handle the reset of the array of text to show when the repeat flag is on, it has to perform an additional rerender to reset the first element of the array to the original empty state,
    otherwise it never unmounts if we set the textCounter back to 0 straight */
    React.useEffect(() => {
        if (textCounter === -1)
            settextCounter(0);
    }, [textCounter]);
    /* This is the text array to show with the sequence of elements that get typed */
    const textToShow = React.useMemo(() => text.slice(0, textCounter + 1), [text, textCounter]);
    /* Unmount rendering null when repeating the cycle */
    const hasToReset = isEnded && repeatCounter < repeat;
    return (React.createElement(React.Fragment, null, hasToReset
        ? null
        : textToShow.map((t, i) => t.text ? (React.createElement(TypeAnimation, Object.assign({ key: t
                .text[0].content }, t, { onAnimationEnd: handleEndOfTyping }))) : (React.createElement(TextTyping, Object.assign({ key: t.content }, t, { handleEndOfTyping: handleEndOfTyping, setIsEnded: setIsEnded, isLast: i === text.length - 1, nextDelay: typeof text[i + 1] === 'number'
                ? text[i + 1]
                : 0, repeatDelay: repeatDelay }))))));
});
TypeAnimation.displayName = 'TypeAnimation';

module.exports = TypeAnimation;
//# sourceMappingURL=index.js.map
