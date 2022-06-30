import React from 'react';

/**
 * Creates a generic input group.
 * 
 * @param {*} props Data properties for configuring the component.
 * @returns JSX component.
 */
function InputGroup(props) {
    const {
        
        /**
         * The class to use for the icon in the input group.
         */
        iconClass,
        
        /**
         * The id of the icon.
         */
        iconId = "",

        /**
         * The action for the icon to perform when clicked.
         */
        iconAction = () => { return; },

        /**
         * The JSX element's id.
         */
        inputId = "",

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
        onKeyUpValidation = () => { return; },
    } = props;


    return(
        <div className="input-group mb-3">
            <span className="input-group-text"><em id={iconId} className={iconClass} onClick={() => iconAction()}></em></span>
            <input id={inputId} type={type} placeholder={placeholder} className={className} aria-label={inputId} aria-describedby={inputId} onBlur={() => onBlurValidation()} onKeyUp={() => onKeyUpValidation()} />
        </div>
    )
}

export default InputGroup;