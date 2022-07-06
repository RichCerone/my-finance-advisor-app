import React from "react";
import InvalidPropException from "../../exceptions/InvalidPropException";

/**
 * Creates a generic button.
 * 
 * @param {*} props Data properties for configuring the component.
 * @returns JSX component.
 */
function Button(props) {
    const {
        /**
         * Id of the element.
         */
        id = "",

        /**
         * The type of button to render.
         */
        type = "button",

        /**
         * The class for this button.
         */
        className,

        /**
         * Icon to render with the button.
         */
        iconClassName,

        /**
         * Whether the button is disabled.
         */
        isDisabled = false,

        /**
         * Action to perform when the button is clicked.
         */
        onClickAction = () => { return; },

        /**
         * Value to display in the button.
         */
        value = "",

        /**
         * Whether this button is processing an action.
         */
        notLoading = true
    } = props;

    // Check if button type is valid.
    if (!["submit", "button"].includes(type)) {
        throw new InvalidPropException(`${type} is an invalid prop parameter.`);
    }

    // If no icon class specified, render a standard button.
    if (iconClassName === undefined) {

        return(
            <button id={id} type={type} className={className} onClick={() => onClickAction()} disabled={isDisabled} >
                <span hidden={notLoading} className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                {value}
            </button>
        );
    }
    else {
        return(
            <button id={id} type={type} className={className} onClick={() => onClickAction()} disabled={isDisabled}>
                <span hidden={notLoading} className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <em hidden={notLoading === false} className={iconClassName}></em> {value}
            </button>
        );
    }
}

export default Button;