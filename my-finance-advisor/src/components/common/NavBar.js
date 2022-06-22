import React, {Component} from 'react';

/**
 * Display's the application's navbar.
 */
class NavBar extends Component {
    render() {
        const {
            /**
             * The name of the application to display in the navbar title.
             */
            appName
        } = this.props

        return(
            <nav className="navbar bg-dark">
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1 text-white"><i className="bi bi-coin"></i> {appName}</span>
                </div>
            </nav>
        );
    }
}

export default NavBar;