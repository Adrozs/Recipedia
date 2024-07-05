import React, { useEffect, useRef, useState } from 'react';

export const ResizeText = ({ text, minSize = 20, maxSize = 48, className }) => {
    const textRef = useRef();
    const [fontSize, setFontSize] = useState(maxSize);
    const [isWrapped, setIsWrapped] = useState(false);

    useEffect(() => {
        const adjustFontSize = () => {
            const parentWidth = textRef.current.parentElement.offsetWidth;
            let newFontSize = maxSize;
            let needsWrap = false;

            textRef.current.style.fontSize = `${newFontSize}px`;
            textRef.current.style.whiteSpace = 'nowrap';

            while (newFontSize > minSize && textRef.current.scrollWidth > parentWidth) {
                newFontSize -= 0.5; // Reduce font size
                textRef.current.style.fontSize = `${newFontSize}px`;
            }

            // Ensure the text fits within the container even after setting the initial font size
            if (textRef.current.scrollWidth > parentWidth) {
                needsWrap = true;
                setFontSize(minSize);
            } else {
                setFontSize(newFontSize);
            }

            setIsWrapped(needsWrap);
        };

        adjustFontSize();
        window.addEventListener('resize', adjustFontSize);

        return () => {
            window.removeEventListener('resize', adjustFontSize);
        };
    }, [text, minSize, maxSize]);

    return (
        <div
            ref={textRef}
            className={`${className}`}
            style={{
                fontSize: `${fontSize}px`,
                whiteSpace: isWrapped ? 'normal' : 'nowrap',
                overflow: isWrapped ? 'visible' : 'hidden',
            }}
        >
            {text}
        </div>
    );
};