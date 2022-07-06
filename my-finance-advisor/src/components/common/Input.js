import React from "react";

/**
 * Creates a generic input component.
 * 
 * @param {*} props Data properties for configuring the component.
 * @returns JSX component.
 */
function Input(props) {
    const {
            /**
             * The JSX element's id.
             */
            id = "",

            /**
             * The type of the JSX input field to display.
             */
            type = "text", 

            /**
             * Any placeholder value to put in the field.
             */
            placeholder = "",
            
            /**
             * Any CSS class value to show on the JSX component.
             */
            className,
            
            /**
             * Validation to perform on blur of the input.
             */
            onBlurValidation = () => { return; },

            /**
             * Validation to perform on key up on the input.
             */
            onKeyUpValidation = () => { return; }
    } = props;

    return <input id={id} type={type} placeholder={placeholder} className={className} aria-label={id} aria-describedby={id} onBlur={() => onBlurValidation()} onKeyUp={() => onKeyUpValidation()} />;
}

export default Input;