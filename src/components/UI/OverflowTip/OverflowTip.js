import React, { useRef, useState } from 'react';

import classes from './OverflowTip.module.scss';

import Tooltip from '../Tooltip/Tooltip';

const OverflowTip = props => {
    const [isOverflowed, setIsOverflowed] = useState(false);
    const [tipIsVisible, setTipIsVisible] = useState(false);
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const textElementRef = useRef();

    const handleMouseEnter = e => {
        let isOverflowed =
            textElementRef.current.scrollWidth >
            textElementRef.current.clientWidth;

        if (isOverflowed) {
            setIsOverflowed(isOverflowed);
            setTipIsVisible(true);
            setCoords({ x: e.pageX, y: e.pageY });
        }
    };
    
    const handleMouseLeave = () => {
        setTipIsVisible(false);
    };

    return (
        <div
            className={`${classes['hidden-overflow']} ${
                isOverflowed && classes.overflowed
            }`}
            ref={textElementRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {props.children}
            {isOverflowed && (
                <Tooltip
                    x={coords.x}
                    y={coords.y}
                    title={props.children}
                    isVisible={tipIsVisible}
                ></Tooltip>
            )}
        </div>
    );
};

export default OverflowTip;
