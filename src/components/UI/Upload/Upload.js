import React, { useRef } from 'react';

import classes from './Upload.module.scss';

const Upload = props => {
    const textAreaRef = useRef();

    const onFileChange = event => {
        const file = event.target.files[0];
        textAreaRef.current.value = file.name;
        props.onFileChange(file);
    };

    return (
        <div
            className={`${classes.upload} ${
                props.isValid === false ? classes.invalid : ''
            }`}
        >
            <div>
                <label htmlFor="photo">Upload</label>
                <input
                    type="file"
                    id={props.id}
                    placeholder="Upload your photo"
                    onChange={onFileChange}
                />
                <textarea
                    rows="1"
                    disabled
                    placeholder="Upload your photo"
                    ref={textAreaRef}
                />
            </div>
            {props.isValid === false && props.errorText && (
                <small className={classes['error-text']}>
                    {props.errorText}
                </small>
            )}
        </div>
    );
};

export default Upload;
