import React from 'react';

/**
 * Creates a generic label.
 * 
 * @param {*} props Data properties for configuring the component.
 * @returns JSX component.
 */
function Label(props) {
    const {
        /**
         * The element this label is for.
         */
        forEl = "",

        /**
         * The class properties this elements has.
         */
        className = "",

        /**
         * The value to appear within the label.
         */
        value

    } = props;

    return <label htmlFor={forEl} className={className}>{value}</label>
}

export default Label;