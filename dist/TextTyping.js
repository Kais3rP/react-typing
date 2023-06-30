var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import BlinkingCursor from 'BlinkingCursor';
import React, { useEffect, useState, } from 'react';
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
    const [counter, setcounter] = useState(0);
    const [_text, setText] = useState('');
    const [showCursor, setshowCursor] = useState(true);
    const [direction, setDirection] = useState('asc');
    // console.log('Type component, text:', _text);
    useEffect(() => {
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
export default TextTyping;
//# sourceMappingURL=TextTyping.js.map