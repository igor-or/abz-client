import React from 'react';

import { css } from '@emotion/react';
import ClipLoader from 'react-spinners/ClipLoader';

import variables from '../../../variables.scss';

const override = css`
    width: 4.8rem;
    height: 4.8rem;
    border-width: 0.5rem;
    margin: 0 auto;
`;

const Spinner = props => {
    return (
        <ClipLoader
            color={variables.bluecolor}
            loading={props.isLoading}
            css={override}
        />
    );
};

export default Spinner;
