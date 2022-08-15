import AccountsTab from "../accounts/AccountsTab";

/**
 * Main menu for My Finance Advisor.
 * 
 * @returns JSX component.
 */
function Menu() {
    return(
        <div className="container-fluid">
            <div className="row">
                {/* Navigation Menu */}
                <div className="col-2">
                    <div className="container-fluid">
                        <ul className="nav nav-pills flex-column">
                            <li className="nav-item">
                                <button className="nav-link active" id="accountTab" aria-current="page">Accounts</button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link disabled" id="toolsTab" aria-current="page">Tools</button>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* Tabs */}
                <div className="col-10">
                    <div className="container-fluid">
                        <div className="tab-content">
                            <div className="tab-pane fade show active" id="account-tab-pane" role="tabpanel" aria-labelledby="accountTab" tabIndex="0">
                                <AccountsTab />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Menu;