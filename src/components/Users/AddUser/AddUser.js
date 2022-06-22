import React, {
    useState,
    useReducer,
    useRef,
    useContext,
    useEffect,
    useCallback,
} from 'react';

import Button from '../../UI/Button/Button';

import AuthContext from '../../../store/auth-context';

import classes from './AddUser.module.scss';
import Input from '../../UI/Input/Input';
import Upload from '../../UI/Upload/Upload';
import Radio from '../../UI/Radio/Radio';
import Heading from '../../UI/Heading/Heading';

import apiClient from '../../../api-client';

import successImage from '../../../assets/success-image.svg';

import { validate } from '../../../util/input-validator'; 

const inputReducer = (state, action) => {
    if (action.type === 'RESET') {
        const resettedState = { ...state };

        resettedState[action.field].isValid = true;

        return resettedState;
    }

    return {
        ...state,
        [action.field]: {
            value: action.val,
            isValid: action.isValid,
        },
    };
};

const AddUser = props => {
    const [positions, setPositions] = useState([]);
    const [attachment, setAttachment] = useState({
        file: null,
        isValid: true,
        errorText: '',
    });
    const [showSuccess, setShowSuccess] = useState(false);

    const [inputState, dispatchInput] = useReducer(inputReducer, {
        name: { value: '', isValid: undefined },
        email: { value: '', isValid: undefined },
        phone: { value: '', isValid: undefined },
    });

    const authCtx = useContext(AuthContext);

    const nameRef = useRef('');
    const emailRef = useRef('');
    const phoneRef = useRef('');
    const positionIdRef = useRef('');

    const fetchPositions = useCallback(async () => {
        try {
            const response = await apiClient.getPositions();
            setPositions(response.positions);
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        fetchPositions();
    }, [fetchPositions]);

    const attachFileHandler = async file => {
        const attachmentStatus = await validate.photo(file);
        setAttachment({
            file,
            isValid: attachmentStatus.isValid,
            errorText: attachmentStatus.errorText,
        });
    };

    const submitHandler = event => {
        event.preventDefault();

        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const phone = phoneRef.current.value;
        const selectedPosition = positionIdRef.current.value;

        const nameIsValid = validate.name(name);
        const emailIsValid = validate.email(email);
        const phoneIsValid = validate.phone(phone);

        const user = {
            name,
            email,
            phone,
            position_id: selectedPosition,
            photo: attachment.file,
        };

        if (nameIsValid && emailIsValid && phoneIsValid && attachment.file) {
            props.onAddUser(user);
            setShowSuccess(true);
        } else {
            if (!phoneIsValid) {
                phoneRef.current.focus();
            }
            if (!emailIsValid) {
                emailRef.current.focus();
            }
            if (!nameIsValid) {
                nameRef.current.focus();
            }

            dispatchInput({ field: 'name', val: name, isValid: nameIsValid });
            dispatchInput({
                field: 'email',
                val: email,
                isValid: emailIsValid,
            });
            dispatchInput({
                field: 'phone',
                val: phone,
                isValid: phoneIsValid,
            });
            if (!attachment.file) {
                attachFileHandler(null);
            }
        }
    };

    if (showSuccess) {
        setTimeout(() => {
            setShowSuccess(false);
        }, 5000);
        return (
            <section>
                <div className={classes.success}>
                    <Heading>User successfully registered</Heading>
                    <img
                        src={successImage}
                        alt="User successfully registered"
                    />
                </div>
            </section>
        );
    }

    return (
        <section>
            <div className={classes['add-user']}>
                <Heading>Working with POST request</Heading>
                <form
                    className={classes['add-user__form']}
                    onSubmit={submitHandler}
                >
                    <Input
                        ref={nameRef}
                        id="name"
                        type="text"
                        placeholder="Your name"
                        isValid={inputState.name.isValid}
                        errorText="The name must be at least 2 characters."
                        onChange={dispatchInput.bind(null, {
                            field: 'name',
                            type: 'RESET',
                        })}
                    />
                    <Input
                        ref={emailRef}
                        id="email"
                        type="text"
                        placeholder="Email"
                        isValid={inputState.email.isValid}
                        errorText="The email must be a valid email address."
                        onChange={dispatchInput.bind(null, {
                            field: 'email',
                            type: 'RESET',
                        })}
                    />
                    <Input
                        ref={phoneRef}
                        id="phone"
                        type="text"
                        placeholder="Phone"
                        isValid={inputState.phone.isValid}
                        errorText="Valid phone format: +38 (XXX) XXX - XX - XX"
                        onChange={dispatchInput.bind(null, {
                            field: 'phone',
                            type: 'RESET',
                        })}
                        helperText="+38 (XXX) XXX - XX - XX"
                    />
                    {positions.length && (
                        <Radio
                            ref={positionIdRef}
                            title="Select your position"
                            items={positions}
                        />
                    )}
                    <Upload
                        id="photo"
                        isValid={attachment.isValid}
                        onFileChange={attachFileHandler}
                        errorText={attachment.errorText}
                    />
                    <Button type="submit" disabled={!authCtx.isLoggedIn}>
                        Add User
                    </Button>
                </form>
            </div>
        </section>
    );
};

export default AddUser;
