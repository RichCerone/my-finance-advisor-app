import React, {useState, useEffect} from "react";
import Message from "../common/Message";
import Button from "../common/Button";
import AccountCard from "./AccountCard";
import Modal from "../common/Modal";
import Label from "../common/Label";
import InputGroup from "../common/InputGroup";
import SelectGroup from "../common/SelectGroup";

/**
 * Creates an account tab.
 * 
 * This shows and allows management of all
 * user accounts.
 * 
 * @returns JSX component.
 */
function AccountsTab() {
    // Defines the different types of accounts that can be opened.
    const accountTypes = new Map([
        ["Savings","Savings"],
        ["Checking", "Checking"],
        ["Brokerage", "Brokerage"]
    ]);
    const accountTypeDefaultValue = "Select the Type of Account"

    /**
     * Define hooks.
     */
    
    // Maintains state for the account data for a new account. 
    const [newAccountData, setNewAccountData] = useState({
        account_id: "",
        account_name: "",
        account_type: "",
        account_institution: "",
        balance: ""
    });

    // Maintains state for the account id field when creating a new modal.
    const [newAccountId, setNewAccountId] = useState("")

    // Maintains state for the account name field when creating a new modal.
    const [newAccountName, setNewAccountName] = useState("");

    // Maintains state for the account type field when creating a new modal.
    const [newAccountType, setNewAccountType] = useState("");

    // Maintains state for the account institution field when creating a new modal.
    const [newAccountInstitution, setNewAccountInstitution] = useState("");

    // Maintains state for the account balance field when creating a new modal.
    const [newBalance, setNewBalance] = useState("");

    // Maintains state for the create button when creating a new modal.
    const [createButtonState, setCreateButtonState] = useState({
        notLoading: true,
        isDisabled: true
    });

    // Maintains state for the modal message displayed when creating an account.
    const [modalMessageState, setModalMessageState] = useState({
        message: "",
        hidden: true,
        iconClassName: "",
        type: "info"
    });

    // Maintains state for the account card components when loading into the tab.
    const [accountCards, setAccountCards] = useState();

    // This hook is specifically to track if we need to call useEffect() to rerender more react components.
    const [accountsLength, setAccountsLength] = useState(0); 

    // Maintains state for the account card components when loading into the tab.
    const [tabMessageState, setTabMessageState] = useState({
        message: "",
        type: "",
        isHidden: false
    });
    
    // Maintains state on whether the tab is loading.
    const [isLoading, setIsLoading] = useState(true);

    /**
     * Define useEffect functions.
     */

    /**
     * This effect is called when loading account card components.
     * It is triggered when the accountLength hook is updated.
     */
    useEffect(() => {
        async function getAccounts() {
            const accounts = [];            
            const response = await window.electronApi.send("api:getAccountsByUser", sessionStorage.getItem("username"));

            if (response.data === 404) {
                setTabMessageState({
                    message: "Looks like you have no accounts to manage, yet! Go ahead and add your first!",
                    type: "info",
                    isHidden: false
                });
            }
            else if (response.isError) {
                setTabMessageState({
                    message: "Sorry, looks like something went wrong.",
                    type: "error",
                    isHidden: false
                });
            }
            else {
                const content = response.data.content;
                for (let i = 0; i < content.length; i++)
                {
                    accounts.push(React.createElement(AccountCard, {
                            key: content[i]["account_id"],
                            header: content[i]["account_name"],
                            accountId: content[i]["account_id"],
                            accountType: content[i]["account_type"],
                            accountInstitution: content[i]["account_institution"],
                            balance: content[i]["balance"]
                        }));
                }

                setAccountsLength(accounts.length);
                setAccountCards(accounts);
                setIsLoading(false);
            }
        };

        getAccounts();
    }, [accountsLength]);

    /**
     * This effect is called when any of the fields in the create account modal are modified.
     * This effect is triggered by any of the input components in the create account modal.
     */
    useEffect(() => {
        setNewAccountId(newAccountId);
        setNewAccountName(newAccountName);
        setNewAccountType(newAccountType);
        setNewAccountInstitution(newAccountInstitution);
        setNewBalance(newBalance);
        setNewAccountData({
            account_id: newAccountId,
            account_name: newAccountName,
            account_type: newAccountType,
            account_institution: newAccountInstitution,
            balance: newBalance
        });

        if (newAccountData.account_id === "" || newAccountData.account_name === "" || newAccountData.account_type === accountTypeDefaultValue
            || newAccountData.account_institution === "" || newBalance === "")
        {
            setCreateButtonState({
                notLoading: true,
                isDisabled: true  
            });
        }
        else
        {
            setCreateButtonState({
                notLoading: true,
                isDisabled: false  
                });
        }
    }, [newAccountId, newAccountName, newAccountType, newAccountInstitution, newBalance, 
        newAccountData.account_id, newAccountData.account_name, newAccountData.account_type, 
        newAccountData.account_institution, newAccountData.balance]);
    
    /**
     * Define Functions.
     */

    /**
     * Handles creating a new account.
     */
    const createAccount = async () => {
        setCreateButtonState({
            notLoading: false,
            isDisabled: true
        });

        // Reset message state.
        setModalMessageState({
            message: "",
            hidden: true,
            type: "info"
        });

        // Make call to create a new account.
        const response = await window.electronApi.send("api:createAccount", newAccountData);

        setCreateButtonState({
            notLoading: true,
            isDisabled: false
        });

        if (response.isError === false)
        {
            setModalMessageState({
                message: "Account created!",
                hidden: false,
                iconClassName: "bi bi-check-circle-fill",
                type: "success"
            });
            
            // We increment the account length to trigger our effect method to rerender any new accounts.
            setIsLoading(true);
            setAccountsLength(accountsLength + 1);
        }
        else if (response.isError) {
            console.error(response);

            let errorMessage;
            switch (response.data) {
                case 409: 
                    errorMessage = "This account number already exists."
                    break;
                
                default:
                    errorMessage = "An unexpected error occurred."
            }

            setModalMessageState({
                message: errorMessage,
                hidden: false,
                iconClassName: "bi bi-exclamation-circle-fill",
                type: "error"
            });
        }
    }

    /**
     * Render logic.
     */
    if (isLoading) {
        return (
            <div>                
                <div className="d-flex justify-content-center">
                    <div className="spinner-grow" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>  
                </div>
            </div>
        );
    }

    /**
     * If there is no message tab state, we can assume 
     * that there were account cards to retrieve.
     */
    if (tabMessageState.type === "")
    {
        setTabMessageState({
            message: "",
            type: "success",
            isHidden: true
        });
    }

    if (tabMessageState.type === "error") {
        return (
            <Message id="accountMessage" iconClassName="bi bi-emoji-frown-fill" message={tabMessageState.message} messageType={tabMessageState.type} />
        );
    }
   
    return (
        <div>
            <div className="d-flex justify-content-end mb-3">
                <Button id="createAccount" className="btn btn-outline-success" iconClassName="bi bi-plus" value="Create" showsModal={true} modalTarget="#createAccountModal"></Button>
            </div>
            <Message id="accountMessage" iconClassName="bi bi-info-circle-fill" message={tabMessageState.message} messageType={tabMessageState.type} isHidden={tabMessageState.isHidden} />        
            {accountCards}
            <Modal 
            id="createAccountModal"
            title="Create Account"
            isStatic={true}
            body={
                <div>
                    <div className="mb-3">
                        <Message id="message" iconClassName={modalMessageState.iconClassName} message={modalMessageState.message} messageType={modalMessageState.type} isHidden={modalMessageState.hidden} />
                    </div>
                    <div className="mb-3">
                        <Label forEl="accountId" className="form-label fw-bold" value="Account Id:" />
                        <InputGroup inputId="accountId" placeholder="Account Number" className="form-control" iconClass="bi bi-piggy-bank-fill" value={newAccountId} onChangeAction={val => setNewAccountId(val)} />                    
                    </div>
                    <div className="mb-3">
                        <Label forEl="accountName" className="form-label fw-bold" value="Account Name:" />
                        <InputGroup inputId="accountName" placeholder="Custom Name for the Account" className="form-control" iconClass="bi bi-cursor-text" value={newAccountName} onChangeAction={val => setNewAccountName(val)} />
                    </div>
                    <div className="mb-3">
                        <Label forEl="accountType" className="form-label fw-bold" value="Account Type:" />
                        <SelectGroup inputId="accountType" defaultPlaceholder={accountTypeDefaultValue} options={accountTypes} className="form-control" iconClass="bi bi-tag-fill" value={newAccountType} onChangeAction={val => setNewAccountType(val)} />
                    </div>
                    <div className="mb-3">
                        <Label forEl="accountInstitution" className="form-label fw-bold" value="Account Institution:" />
                        <InputGroup inputId="accountInstitution" placeholder="Name of Bank That Manages This Account" className="form-control" iconClass="bi bi-bank2" value={newAccountInstitution} onChangeAction={val => setNewAccountInstitution(val)} />
                    </div>
                    <div className="mb-3">
                        <Label forEl="accountBalance" className="form-label fw-bold" value="Account Balance:" />
                        <InputGroup inputId="accountBalance" placeholder="Current Balance: Ex. $1000.00" className="form-control" iconClass="bi bi-currency-dollar" value={newBalance} onChangeAction={val => setNewBalance(val)} />
                    </div>
                </div>
            }
            actions={
                <div>
                    <Button id="close" className="btn btn-outline-secondary" iconClassName="bi bi-x" closesModal={true} value="Close" />
                    &nbsp;
                    <Button type="button" className="btn btn-outline-success" iconClassName="bi bi-plus" value="Create" isDisabled={createButtonState.isDisabled} notLoading={createButtonState.notLoading} onClickAction={() => createAccount()} />
                </div>
        
            } />
        </div>
    );
}

export default AccountsTab;