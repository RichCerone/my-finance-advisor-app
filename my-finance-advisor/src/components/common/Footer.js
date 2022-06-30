import React from 'react';

/**
 * Creates a generic footer.
 * 
 * @param {*} props Data properties for configuring the component.
 * @returns JSX component.
 */
function Footer(props) {

    const {
        /**
         * Content to show in the footer.
         */
        content
    } = props;

    return(
        <nav className="navbar fixed-bottom bg-light">
            <div className="container-fluid">
                {content}
            </div>
      </nav>
    );
}

export default Footer;