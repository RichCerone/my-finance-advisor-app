import React from 'react';

/**
 * Creates a generic button.
 * 
 * @param {*} props Data properties for configuring the component.
 * @returns JSX component.
 */
function Button(props) {
    
    const {
        
        id = "",

        type = "button",

        className,

        iconClassName,

        onClickAction = () => { return; },

        value = ""
    } = props;

    if (iconClassName === undefined) {
        return(
            <button id={id} type={type} className={className} onClick={() => onClickAction}>{value}</button>
        );
    }
    else {
        return(
            <button id={id} type={type} className={className} onClick={() => onClickAction}><em className={iconClassName}></em> {value}</button>
        );
    }
}

export default Button;