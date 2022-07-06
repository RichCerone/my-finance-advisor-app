import React from "react";

/**
 * Creates a generic nav bar.
 * 
 * @param {*} props Data properties for configuring the component.
 * @returns JSX component.
 */
function NavBar(props) {
    const {
        /**
         * The name of the application to display in the navbar title.
         */
        appName,

        /**
         * The icon to display in the nav.
         */
        appIcon,
    } = props

    return(
        <nav className="navbar bg-dark">
            <div className="container-fluid">
                <span className="navbar-brand mb-0 h1 text-white"><em title={appName} className={appIcon}></em> {appName}</span>
            </div>
        </nav>
    );
}

export default NavBar;