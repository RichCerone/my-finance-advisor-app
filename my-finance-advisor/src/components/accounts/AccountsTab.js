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
    const [newAccountData, setNewAccountData] = useState({
        account_id: "",
        account_name: "",
        account_type: "",
        account_institution: "",
        balance: ""
    });
    const [newAccountId, setNewAccountId] = useState("")
    const [newAccountName, setNewAccountName] = useState("");
    const [newAccountType, setNewAccountType] = useState("");
    const [newAccountInstitution, setNewAccountInstitution] = useState("");
    const [newBalance, setNewBalance] = useState("");
    const [createButtonState, setCreateButtonState] = useState({
        notLoading: true,
        isDisabled: true
    });
    const [messageState, setMessageState] = useState({
        message: "",
        hidden: true,
        type: "info"
    })
    const [components, setComponents] = useState();
    const [accountsLength, setAccountsLength] = useState(0); // This hook is specifically to track if we need to call useEffect() to rerender more react components.
    const [messageType, setMessageType] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getAccounts() {
            const accounts = [];            
            const response = await window.electronApi.send("api:getAccountsByUser", sessionStorage.getItem("username"));

            if (response.data === 404) {
                setMessageType("info");
            }
            else if (response.isError) {
                setMessageType("error");
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
                setComponents(accounts);
                setIsLoading(false);
            }
        };

        getAccounts();
    }, [accountsLength]);

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

    const createAccount = async () => {
        setCreateButtonState({
            notLoading: false,
            isDisabled: true
        });

        // Reset message state.
        setMessageState({
            message: "",
            hidden: true,
            type: "info"
        })

        const response = await window.electronApi.send("api:createAccount", newAccountData);

        setCreateButtonState({
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
    }

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
    else if (messageType === "info") {
        const message = "Looks like you have no accounts to manage, yet! Go ahead and add your first!"
        return (
            <div>
                <div className="d-flex justify-content-end mb-3">
                    <Button id="createAccount" className="btn btn-outline-success" iconClassName="bi bi-plus" value="Create"></Button>
                </div>
                <Message id="accountMessage" iconClassName="bi bi-info-circle-fill" message={message} messageType={messageType} />                
                <Modal 
                id="createAccountModal"
                title="Create Account"
                isStatic={true}
                body={
                    <div>
                        <div className="mb-3">
                            <Message id="message" iconClassName="bi bi-exclamation-circle-fill" message={messageState.message} messageType={messageState.type} isHidden={messageState.hidden} />
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
                            <SelectGroup inputId="accountType" defaultPlaceholder="Select the Type of Account" options={accountTypes} className="form-control" iconClass="bi bi-tag-fill" value={newAccountType} onChangeAction={val => setNewAccountType(val)} />
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
                        <Button id="cancel" className="btn btn-outline-secondary" iconClassName="bi bi-x" closesModal={true} value="Cancel" />
                        &nbsp;
                        <Button type="button" className="btn btn-outline-success" iconClassName="bi bi-plus" value="Create" isDisabled={createButtonState.isDisabled} notLoading={createButtonState.notLoading} />
                    </div>
            
                } />
            </div>            
        );
    }
    else if (messageType === "error") {
        const message = "Sorry, looks like something went wrong.";
        return (
            <Message id="accountMessage" iconClassName="bi bi-emoji-frown-fill" message={message} messageType={messageType} />
        );
    }
   
    return (
        <div>
            <div className="d-flex justify-content-end mb-3">
                <Button id="createAccount" className="btn btn-outline-success" iconClassName="bi bi-plus" value="Create" showsModal={true} modalTarget="#createAccountModal"></Button>
            </div>
            {components}
            <Modal 
            id="createAccountModal"
            title="Create Account"
            isStatic={true}
            body={
                <div>
                    <div className="mb-3">
                        <Message id="message" iconClassName="bi bi-exclamation-circle-fill" message={messageState.message} messageType={messageState.type} isHidden={messageState.hidden} />
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
                    <Button id="cancel" className="btn btn-outline-secondary" iconClassName="bi bi-x" closesModal={true} value="Cancel" />
                    &nbsp;
                    <Button type="button" className="btn btn-outline-success" iconClassName="bi bi-plus" value="Create" isDisabled={createButtonState.isDisabled} notLoading={createButtonState.notLoading} onClickAction={() => createAccount()} />
                </div>
        
            } />
        </div>
    );
}

export default AccountsTab;