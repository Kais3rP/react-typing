import React, { useEffect, useState } from 'react';
const BlinkingCursor = React.memo(({ cursor, color, delay }) => {
    const [isVisible, setisVisible] = useState(true);
    useEffect(() => {
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
export default BlinkingCursor;
//# sourceMappingURL=BlinkingCursor.js.map