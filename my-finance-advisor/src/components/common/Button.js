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

        isDisabled = false,

        onClickAction = () => { return; },

        value = "",

        notLoading = true
    } = props;

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