import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import Realistic from 'react-canvas-confetti/dist/presets/realistic';

const Confetti = forwardRef((props, ref) => {
    const fireworksRef = useRef<any | null>(null);

    useImperativeHandle(ref, () => ({
        start: () => {
            fireworksRef.current?.start();
        },
    }));

    return (
        <Realistic
            className="absolute top-0 left-0 w-full h-full z-50"
            onInit={(instance) => {
                fireworksRef.current = instance;
            }}
            autorun={{ speed: 2 }}
        />
    );
});

Confetti.displayName = 'Confetti';

export default Confetti;
