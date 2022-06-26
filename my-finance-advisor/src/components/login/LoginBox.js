import React from 'react';
import InputGroup from '../common/InputGroup';
import Label from '../common/Label';
import Button from '../common/Button';

function LoginBox() {

    /**
     * Changes the password icon and shows or hides the password text
     * based on the icon's current state.
     * 
     * @param {string} iconId The id of the icon element.
     * @param {string} inputId The id of the input element.
     */
    const showOrHidePassword = (iconId, inputId) => {
        try {
            const icon = document.getElementById(iconId);
            const input = document.getElementById(inputId);

            if (icon.className === "bi bi-eye-fill")
            {
                icon.className = "bi bi-eye-slash-fill";
                input.placeholder = "No peaking!";
                input.type = "password";
            }
            else
            {
                icon.className = "bi bi-eye-fill"
                input.placeholder = "You peaked... -_-";
                input.type = "text";
            }
        }
        catch (e)
        {
            console.error(`showOrHidePassword error: ${e.message}`)
        }
    }

    return(
        <div className="container-fluid mt-5">
            <div className="d-flex justify-content-center">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex justify-content-center">
                            <h3>Login</h3>
                        </div>

                        <div className="mb-3">
                            <Label forEl="username" value="Username" className="form-label"/>
                            <InputGroup iconClass="bi bi-person-fill" inputId="username" placeholder="ex. JohnDoe" className="form-control"/>
                        </div>

                        <div className="mb-3">
                            <Label forEl="password" value="Password" className="form-label"/>
                            <InputGroup iconId="passwordIcon" iconAction={() => showOrHidePassword("passwordIcon", "password")} iconClass="bi bi-eye-slash-fill" inputId="password" type="password" placeholder="No peaking!" className="form-control"/>
                        </div>

                        <div className="d-flex justify-content-center">
                            <div className="mb-3">
                                <Button id="login" className="btn btn-outline-primary" value="Login"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginBox;