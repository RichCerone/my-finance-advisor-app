import {useState} from "react";
import Label from "../common/Label";
import Button from "../common/Button";
import Input from "../common/Input";
import Select from "../common/Select";

function AccountCard(props) {
    const options = new Map([
        ["Savings","Savings"],
        ["Checking", "Checking"],
        ["Brokerage", "Brokerage"]
    ])
    const {
        /**
         * The header to display on the card (account name).
         */
        header = "",

        /**
         * The account's id.
         */
        accountId = "",

        /**
         * The account type.
         */
        accountType = "",

        /**
         * The bank that manages this account.
         */
        accountInstitution = "",

        /**
         * The balance available on this account.
         */
        balance = "0.00"
        
    } = props;

     // Define hooks.
     const [editState, setEditState] = useState({
        editModeEnabled: false
    });

    const [account, setAccount] = useState({
        accountName: header,
        accountId: accountId,
        balance: balance
    })

    /**
     * Sets the account card to edit mode.
     */
    const editAccount = () => {
        setEditState({
            editModeEnabled: true
        });
    }

     /**
      * Saves the account data.
      * 
      * @param {string} accountId The account id to save changes to.
      */
      const save = (accountId) => {
        // Call electron main and save to API.
        
        setEditState({
            editModeEnabled: false
        });
    }

    /**
     * Sets the account card to view mode.
     */
    const cancelEdit = () => {
        setEditState({
            editModeEnabled: false
        });
    }


    if (editState.editModeEnabled === false)
    {
        return (
            <div className="card mb-3">
                <h5 className="card-header">{header}</h5>
                <div className="card-body">
                    <div className="row">
                        <div className="col-4">
                            <Label forEl="accountId" value="Account Id: " className="fw-bold"/> <span id="accountId">{account.accountId}</span>
                        </div>
                        <div className="col-4">
                            <Label forEl="accountType" value="Account Type" className="fw-bold"/> <span id="accountType">{accountType}</span>
                        </div>
                        <div className="col-4">
                            <Label forEl="accountInstitution" value="Account Institution" className="fw-bold"/> <span id="accountInstitution">{accountInstitution}</span>
                        </div>
                    </div>
                    <div className="row mt-3">
                    <div className="col-12">
                            <Label forEl="balance" value="Total Balance" className="fw-bold" /> <span id="balance">${account.balance}</span>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <Button id="edit" className="btn btn-outline-primary" iconClassName="bi bi-pencil" value="Edit" onClickAction={() => editAccount()} />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="card mb-3">
            <h5 className="card-header">{header}</h5>
            <div className="card-body">
                <div className="mb-3">
                    <Label forEl="accountId" value="Account Id:" className="form-label fw-bold" /> <span id="accountId">{account.accountId}</span>
                </div>
                <div className="mb-3">
                    <Label forEl="accountName" value="Account Name:" className="form-label fw-bold" />
                    <Input inputId="accountName" placeholder="Custom tag for this account" value={account.accountName} className="form-control" />
                </div>
                <div className="mb-3">
                    <Label forEl="balance" value="Account Balance:" className="form-label fw-bold" />
                    <Input inputId="balance" type="text" placeholder="Ex. $1000.00" value={account.balance} className="form-control" />
                </div>
                <div className="row mb-3">
                    <Button id="save" className="btn btn-outline-success" iconClassName="bi bi-check" value="Save" onClickAction={() => save(account.accountId)} />
                </div>
                <div className="row mb-3">
                    <Button id="cancel" className="btn btn-outline-secondary" iconClassName="bi bi-x" value="Cancel" onClickAction={() => cancelEdit()} />
                </div>
            </div>
        </div>
    );
}

export default AccountCard;