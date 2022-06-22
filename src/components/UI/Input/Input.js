import React, { useRef, useImperativeHandle } from 'react';

import classes from './Input.module.scss';

const Input = React.forwardRef((props, ref) => {
    const inputRef = useRef();

    useImperativeHandle(ref, () => {
        return inputRef.current;
    });

    return (
        <div
            className={`${classes.input} ${
                props.isValid === false ? classes.invalid : ''
            }`}
        >
            <input
                ref={inputRef}
                id={props.id}
                type={props.type}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
            />
            {props.isValid !== false && props.helperText && (
                <small className={classes['helper-text']}>
                    {props.helperText}
                </small>
            )}
            {props.isValid === false && props.errorText && (
                <small
                    className={`${classes['helper-text']} ${classes['error-text']}`}
                >
                    {props.errorText}
                </small>
            )}
        </div>
    );
});

export default Input;
