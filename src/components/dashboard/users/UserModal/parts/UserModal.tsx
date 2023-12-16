import clsx from 'clsx';
import * as Yup from 'yup';
import { useToast } from 'components/dashboard/helpers/renderToastHelper';
import { useFormik } from 'formik';
import { HTMLInputTypeAttribute, SetStateAction, useState } from 'react';
import { createOrUpdateUser, getIsUsernameValid } from 'services/user.service';
import { User, UserInputData } from 'common/interfaces/UserData';
import { useQueryResponse } from 'common/core/QueryResponseProvider';
import { Status } from 'common/interfaces/ActionStatus';
import { throttle } from '_metronic/helpers/crud-helper/helpers';

interface UserModalProps {
    onClose: () => void;
    user?: User;
}

interface UserModalData extends UserInputData {
    confirmPassword: '';
}

// eslint-disable-next-line no-unused-vars
enum PassIcon {
    // eslint-disable-next-line no-unused-vars
    SHOW = 'ki-eye',
    // eslint-disable-next-line no-unused-vars
    HIDDEN = 'ki-eye-slash',
}

export const UserModal = ({ onClose, user }: UserModalProps): JSX.Element => {
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [passwordFieldType, setPasswordFieldType] = useState<HTMLInputTypeAttribute>('password');

    const [username, setUsername] = useState<string>('');
    const [usernameError, setUsernameError] = useState<string>('');
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState<boolean>(false);
    const [confirmPasswordFieldType, setConfirmPasswordFieldType] =
        useState<HTMLInputTypeAttribute>('password');
    const { refetch } = useQueryResponse();

    const initialUserData: UserModalData = {
        username: user?.username || '',
        password: '',
        confirmPassword: '',
    };

    const { handleShowToast } = useToast();

    const togglePasswordVisibility = (
        isVisible: boolean,
        setIsVisible: {
            (value: SetStateAction<boolean>): void;
            (value: SetStateAction<boolean>): void;
            (arg0: boolean): void;
        },
        setFieldType: {
            (value: SetStateAction<HTMLInputTypeAttribute>): void;
            (value: SetStateAction<HTMLInputTypeAttribute>): void;
            (arg0: string): void;
        }
    ) => {
        const newFieldType = isVisible ? 'password' : 'text';
        setFieldType(newFieldType);
        setIsVisible(!isVisible);
    };

    const handleChangePasswordVisible = () => {
        togglePasswordVisibility(isPasswordVisible, setIsPasswordVisible, setPasswordFieldType);
    };

    const handleChangeConfirmPasswordVisible = () => {
        togglePasswordVisibility(
            isConfirmPasswordVisible,
            setIsConfirmPasswordVisible,
            setConfirmPasswordFieldType
        );
    };

    const addUserSchema = Yup.object().shape({
        username: Yup.string().trim().required('Username is required'),
        password: Yup.string().trim().required('Password is required'),
        confirmPassword: Yup.string()
            .trim()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Password confirmation is required'),
    });

    const isUserNameValid = () => {
        getIsUsernameValid(username).then((response) => {
            if (response.status === Status.OK && response.exists === true) {
                setUsernameError(`The ${response.username} is already exists!`);
            }
            if (response.status === Status.ERROR) {
                setUsernameError(response.info);
            }
        });
    };

    const throttledValidation = throttle(isUserNameValid, 1500);

    const formik = useFormik({
        initialValues: initialUserData,
        validate: async (values): Promise<Partial<UserModalData>> => {
            setUsername(values.username);
            await throttledValidation();

            return { username: usernameError };
        },
        validationSchema: addUserSchema,
        onSubmit: async ({ username, password, confirmPassword }, { setSubmitting }) => {
            if (password !== confirmPassword) {
                handleShowToast({
                    message: 'Passwords do not match',
                    type: 'danger',
                });
                setSubmitting(false);
                return;
            }

            setSubmitting(true);
            try {
                const userData = user?.useruid ? { uid: user.useruid } : { loginname: username };
                const reqData = { ...userData, loginpassword: password };

                const responseData = await createOrUpdateUser(reqData);
                const message = user?.useruid
                    ? `<strong>${username}</strong> password successfully updated`
                    : `User <strong>${username}</strong> successfully created`;

                if (!responseData.error && !responseData.warning) {
                    handleShowToast({
                        message,
                        type: 'success',
                    });
                    onClose();
                    refetch();
                } else {
                    throw new Error(responseData);
                }
            } catch (err) {
                const { data } = err as { status: number; data: Record<string, string> };
                const message = data.warning || data.error;
                handleShowToast({ message, type: 'danger' });
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <>
            <form className='form' onSubmit={formik.handleSubmit}>
                <div className='d-flex flex-column scroll-y me-n7 pe-7'>
                    <div className='fv-row mb-8'>
                        <label className='form-label fs-6 fw-bolder text-dark'>Username</label>
                        <input
                            placeholder='Username'
                            {...formik.getFieldProps('username')}
                            className={clsx(
                                'form-control',
                                {
                                    'is-invalid': formik.touched.username && formik.errors.username,
                                },
                                {
                                    'is-valid': formik.touched.username && !formik.errors.username,
                                }
                            )}
                            type='text'
                            name='username'
                            autoComplete='off'
                            disabled={Boolean(user)}
                        />
                        {formik.touched.username && formik.errors.username && (
                            <div className='fv-plugins-message-container'>
                                <span role='alert'>{formik.errors.username}</span>
                            </div>
                        )}
                    </div>

                    <div className='fv-row mb-10 position-relative'>
                        <label className='form-label fw-bolder text-dark fs-6 mb-0'>Password</label>
                        <input
                            type={passwordFieldType}
                            placeholder='Password'
                            autoComplete='off'
                            {...formik.getFieldProps('password')}
                            className={clsx(
                                'form-control bg-transparent',
                                {
                                    'border-danger':
                                        formik.touched.password && formik.errors.password,
                                },
                                {
                                    'border-success':
                                        formik.touched.password && !formik.errors.password,
                                }
                            )}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <div className='fv-plugins-message-container position-absolute'>
                                <div className='fv-help-block'>
                                    <span role='alert'>{formik.errors.password}</span>
                                </div>
                            </div>
                        )}

                        <i
                            className={clsx(
                                `ki-outline fs-2 ${
                                    isPasswordVisible ? PassIcon.SHOW : PassIcon.HIDDEN
                                } position-absolute end-0 top-50 px-3 cursor-pointer text-hover-primary`
                            )}
                            onClick={handleChangePasswordVisible}
                        />
                    </div>

                    <div className='fv-row mb-10 position-relative'>
                        <label className='form-label fw-bolder text-dark fs-6 mb-0'>
                            Password Confirmation
                        </label>
                        <input
                            type={confirmPasswordFieldType}
                            placeholder='Confirm Password'
                            autoComplete='off'
                            {...formik.getFieldProps('confirmPassword')}
                            className={clsx(
                                'form-control bg-transparent',
                                {
                                    'border-danger':
                                        formik.touched.confirmPassword &&
                                        formik.errors.confirmPassword,
                                },
                                {
                                    'border-success':
                                        formik.touched.confirmPassword &&
                                        !formik.errors.confirmPassword,
                                }
                            )}
                        />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                            <div className='fv-plugins-message-container position-absolute'>
                                <div className='fv-help-block'>
                                    <span role='alert'>{formik.errors.confirmPassword}</span>
                                </div>
                            </div>
                        )}

                        <i
                            className={clsx(
                                `ki-outline fs-2 ${
                                    isConfirmPasswordVisible ? PassIcon.SHOW : PassIcon.HIDDEN
                                } position-absolute end-0 top-50 px-3 cursor-pointer text-hover-primary`
                            )}
                            onClick={handleChangeConfirmPasswordVisible}
                        />
                    </div>
                </div>
                <div className='text-center pt-15'>
                    <button
                        type='submit'
                        className='btn btn-primary'
                        data-kt-users-modal-action='submit'
                        disabled={formik.isSubmitting || !formik.isValid || !formik.touched}
                    >
                        <span className='indicator-label'>Submit</span>
                        {formik.isSubmitting && (
                            <span className='indicator-progress'>
                                Please wait...
                                <span className='spinner-border spinner-border-sm align-middle ms-2' />
                            </span>
                        )}
                    </button>
                </div>
            </form>
        </>
    );
};
