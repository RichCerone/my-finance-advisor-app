import {useEffect, useState} from "react";
import Label from "../common/Label";
import Button from "../common/Button";
import Input from "../common/Input";
import Message from "../common/Message";

/**
 * Creates an account information card.
 * 
 * @param {*} props Data properties for configuring the component.
 * @returns JSX component.
 */
function AccountCard(props) {
    // TODO: May need this for the create state of the card.
    const options = new Map([
        ["Savings","Savings"],
        ["Checking", "Checking"],
        ["Brokerage", "Brokerage"]
    ]);

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

    /**
     * Define hooks.
     */

     // Monitors the edit state of the card.
     const [editState, setEditState] = useState({
        editModeEnabled: false
    });

    // Monitors the account data.
    const [account, setAccount] = useState({
        account_id: accountId,
        account_name: header,
        balance: balance
    })
    
    // Monitors the data of the card's header.
    const [headerState, setHeaderState] = useState(header);

    // Monitors the account name data.
    const [accountName, setAccountName] = useState(header);

    // Monitors the account balance data.
    const [accountBalance, setAccountBalance] = useState(balance);

    // Monitors the save button's state.
    const [saveButtonState, setSaveButtonState] = useState({
        notLoading: true,
        isDisabled: false
    });

    // Monitors the message data and state that displays in the card.
    const [messageState, setMessageState] = useState({
        message: "",
        hidden: true,
        type: "info"
    })

    /**
     * Effects.
     */
    useEffect(() => {
        /**
         * After page load we need to re-update the account name and balance input values
         * with the latest user input. Once the values are update the entire account state
         * is updated as well for when the user wants to save changes.
         */
        setAccountName(accountName);
        setAccountBalance(accountBalance);
        setAccount({
            account_id: accountId,
            account_name: accountName,
            balance: accountBalance
        });
    }, [accountName, accountBalance, accountId]);
    
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
      const save = async (accountId) => {
        setSaveButtonState({
            notLoading: false,
            isDisabled: true
        });

        setAccount({
            account_id: accountId,
            account_name: accountName,
            balance: balance
        });

        // Reset message state.
        setMessageState({
            message: "",
            hidden: true,
            type: "info"
        })
        
        // Call electron main and save to API.
        const response = await window.electronApi.send("api:updateAccount", account);
        
        setSaveButtonState({
            notLoading: true,
            isDisabled: false
        });

        if (response.isError) {
            console.error(response);
            setMessageState({
                message: response.error,
                hidden: false,
                type: "error"
            })
        }        
        else
        {
            // Set header state to updated account name.
            setHeaderState(account.account_name);

            // Disable edit mode.
            setEditState({
                editModeEnabled: false
            });
        }        
    }

    /**
     * Sets the account card to view mode.
     */
    const cancelEdit = () => {
        setEditState({
            editModeEnabled: false
        });
    }

    // View card.
    if (editState.editModeEnabled === false)
    {
        return (
            <div className="card mb-3">
                <h5 className="card-header">{headerState}</h5>
                <div className="card-body">
                    <div className="row">
                        <div className="col-4">
                            <Label forEl="accountId" value="Account Id: " className="fw-bold"/> <span id="accountId">{account.account_id}</span>
                        </div>
                        <div className="col-4">
                            <Label forEl="accountType" value="Account Type: " className="fw-bold"/> <span id="accountType">{accountType}</span>
                        </div>
                        <div className="col-4">
                            <Label forEl="accountInstitution" value="Account Institution: " className="fw-bold"/> <span id="accountInstitution">{accountInstitution}</span>
                        </div>
                    </div>
                    <div className="row mt-3">
                    <div className="col-12">
                            <Label forEl="balance" value="Total Balance" className="fw-bold" /> <span id="balance">${accountBalance}</span>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <Button id="edit" className="btn btn-outline-primary" iconClassName="bi bi-pencil" value="Edit" onClickAction={() => editAccount()} />
                    </div>
                </div>
            </div>
        );
    }

    // Edit card.
    return (
        <div className="card mb-3">
            <h5 className="card-header">{headerState}</h5>
            <div className="card-body">
                <div className="mb-3">
                    <Message id="message" iconClassName="bi bi-exclamation-circle-fill" message={messageState.message} messageType={messageState.type} isHidden={messageState.hidden} />
                </div>
                <div className="mb-3">
                    <Label forEl="accountId" value="Account Id:" className="form-label fw-bold" /> <span id="accountId">{account.account_id}</span>
                </div>
                <div className="mb-3">
                    <Label forEl="accountName" value="Account Name:" className="form-label fw-bold" />
                    <Input inputId="accountName" placeholder="Custom tag for this account" value={accountName} className="form-control" onChangeAction={val => setAccountName(val)} />
                </div>
                <div className="mb-3">
                    <Label forEl="balance" value="Account Balance:" className="form-label fw-bold" />
                    <Input inputId="balance" type="text" placeholder="Ex. $1000.00" value={accountBalance} className="form-control" onChangeAction={val => setAccountBalance(val)} />
                </div>
                <div className="row mb-3">
                    <Button id="save" className="btn btn-outline-success" iconClassName="bi bi-check" value="Save" onClickAction={() => save(account.account_id)} isDisabled={saveButtonState.isDisabled} notLoading={saveButtonState.notLoading} />
                </div>
                <div className="row mb-3">
                    <Button id="cancel" className="btn btn-outline-secondary" iconClassName="bi bi-x" value="Cancel" onClickAction={() => cancelEdit()} />
                </div>
            </div>
        </div>
    );
}

export default AccountCard;