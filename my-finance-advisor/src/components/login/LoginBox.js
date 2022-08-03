import React, {useState} from "react";
import InputGroup from "../common/InputGroup";
import Label from "../common/Label";
import Button from "../common/Button";
import Message from "../common/Message";
import { useNavigate } from "react-router-dom";

/**
 * Creates a login box.
 * 
 * @returns JSX component.
 */
function LoginBox() {
    
    // We will use navigation to load the next view once the login is successful.
    const navigate = useNavigate();

    // Define hooks.
    const [passwordState, setPasswordState] = useState({
        iconClassName: "bi bi-eye-slash-fill",
        placeholder: "No peaking",
        type: "password",
        className: "form-control"
    });

    const [userInputClassName, setUserInputClassName] = useState("form-control");

    const [loginState, setLoginState] = useState({
        disabled: false, 
        notLoading: true
    });

    const [messageState, setMessageState] = useState({
        iconClassName: "",
        message: "",
        messageType: "info",
        dismissible: false,
        isHidden: true,
    });

    /**
     * Sets the login buttons loading state.
     * 
     * @param {boolean} init true to init the loading state, else false.
     */
    const initLoading = (init) => {
        if (init) {
            setLoginState({disabled: true, notLoading: false});
        }
        else {
            setLoginState({disabled: false, notLoading: true});
        }
    }
    /**
     * Changes the password icon and shows or hides the password text
     * based on the icon's current state.
     */
    const showOrHidePassword = () => {
        try {
            if (passwordState.iconClassName === "bi bi-eye-fill")
            {
                setPasswordState({
                    iconClassName: "bi bi-eye-slash-fill",
                    placeholder: "No peaking",
                    type: "password",
                    className: passwordState.className
                });
            }
            else
            {
                setPasswordState({
                    iconClassName: "bi bi-eye-fill",
                    placeholder: "You peaked...-_-",
                    type: "text",
                    className: passwordState.className
                });
            }
        }
        catch (e)
        {
            console.error(`showOrHidePassword error: ${e.message}`)
        }
    }

    /**
     * Validates the username.
     */
    const validateUsername = () => {
        try {
            const username = document.getElementById("username").value;

            if (username === undefined || username === null || username.length < 1)
            {   
                setUserInputClassName("form-control is-invalid");
                setLoginState({disabled: true, notLoading: true});
                setMessageState({
                    iconClassName: "bi bi-exclamation-circle-fill",
                    message: "The username is invalid.",
                    messageType: "error",
                    dismissible: messageState.dismissible,
                    isHidden: false
                });

                return false;
            }
            else
            {
                setUserInputClassName("form-control is-valid");
                setLoginState({disabled: false, notLoading: true});
                setMessageState({
                    iconClassName: messageState.iconClassName,
                    message: "",
                    messageType: messageState.messageType,
                    dismissible: messageState.dismissible,
                    isHidden: true
                });

                return true;
            }
        }
        catch (e) {
            console.error(`validateUsername error: ${e.message}`)
        }
    }

    /**
     * Validates the password.
     */
    const validatePassword = () => {
        try {
            const password = document.getElementById("password").value;

            if (password === undefined || password === null || password.length < 1)
            {
                
                setPasswordState({
                    iconClassName: passwordState.iconClassName,
                    placeholder: passwordState.placeholder,
                    type: passwordState.type,
                    className: "form-control is-invalid"
                });
                setLoginState({disabled: true, notLoading: true});
                setMessageState({
                    iconClassName: "bi bi-exclamation-circle-fill",
                    message: "The password is invalid.",
                    messageType: "error",
                    dismissible: messageState.dismissible,
                    isHidden: false
                });
            }
            else
            {
                setPasswordState({
                    iconClassName: passwordState.iconClassName,
                    placeholder: passwordState.placeholder,
                    type: passwordState.type,
                    className: "form-control is-valid"
                });
                setLoginState({disabled: false, notLoading: true});
                setMessageState({
                    iconClassName: messageState.iconClassName,
                    message: "",
                    messageType: messageState.messageType,
                    dismissible: messageState.dismissible,
                    isHidden: true
                });
            }
        }
        catch (e) {
            console.error(`validateUserName error: ${e.message}`)
        }
    }

    /**
     * Logs the user into the app.
     */
    const login = async () => {
        try {
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            
            if (validateUsername(username) === false) {
                return;
            }
            else if (validatePassword(password) === false) {
                return;
            }

            initLoading(true);

            const token = await window.electronApi.send("api:getToken", {username: username, password: password});
            sessionStorage.setItem("token", token);

            initLoading(false);
            navigate("/menu");
        }
        catch (e) {
            console.error(e);
        }
    }

    return(
        <div>
            <div className="container-fluid mt-5">
                <div className="d-flex justify-content-center">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex justify-content-center">
                                <h3>Login</h3>
                            </div>

                            <div className="mb-3">
                                <Message 
                                id="loginMessage"
                                iconClassName={messageState.iconClassName}
                                message={messageState.message}
                                messageType={messageState.messageType}
                                dismissible={messageState.dismissible}
                                isHidden={messageState.isHidden}/>
                            </div>

                            <div className="mb-3">
                                <Label forEl="username" value="Username" className="form-label"/>
                                <InputGroup 
                                iconClass="bi bi-person-fill"
                                inputId="username"
                                placeholder="ex. JohnDoe"
                                className={userInputClassName}
                                onBlurValidation={() => validateUsername()}
                                onKeyUpValidation={() => validateUsername()}/>
                            </div>

                            <div className="mb-3">
                                <Label forEl="password" value="Password" className="form-label"/>
                                <InputGroup 
                                iconId="passwordIcon" 
                                iconAction={() => showOrHidePassword()} 
                                iconClass={passwordState.iconClassName}
                                inputId="password"
                                type={passwordState.type} 
                                placeholder={passwordState.placeholder} 
                                className={passwordState.className} 
                                onBlurValidation={() => validatePassword()} 
                                onKeyUpValidation={() => validatePassword()}/>
                            </div>

                            <div className="d-flex justify-content-center">
                                <div className="mb-3">
                                    <Button 
                                    id="login" 
                                    notLoading={loginState.notLoading} 
                                    isDisabled={loginState.disabled} 
                                    className="btn btn-outline-primary" 
                                    value="Login" 
                                    onClickAction={async () => await login()}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginBox;