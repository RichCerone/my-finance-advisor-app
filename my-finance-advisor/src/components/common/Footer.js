import React from 'react';

/**
 * Creates a generic footer.
 * 
 * @param {*} props Data properties for configuring the component.
 * @returns JSX component.
 */
function Footer(props) {

    const {
        content
    } = props;

    return(
        <nav class="navbar fixed-bottom bg-light">
            <div class="container-fluid">
                {content}
            </div>
      </nav>
    );
}

export default Footer;