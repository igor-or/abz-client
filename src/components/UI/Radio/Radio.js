import React, { useState, useImperativeHandle } from 'react';

import classes from './Radio.module.scss';

const Radio = React.forwardRef((props, ref) => {
    const [selectedOption, setSelectedOption] = useState(props.items[0].id);

    const onValueChange = event => {
        setSelectedOption(+event.target.value);
    };

    useImperativeHandle(ref, () => {
        return {
            value: selectedOption,
        };
    });

    return (
        <div className={classes.radio}>
            <p>{props.title}</p>
            {props.items.map(item => (
                <div key={item.id}>
                    <label>
                        <input
                            type="radio"
                            name="position"
                            value={item.id}
                            checked={selectedOption === item.id}
                            onChange={onValueChange}
                        />
                        <span>{item.name}</span>
                    </label>
                </div>
            ))}
        </div>
    );
});

export default Radio;
