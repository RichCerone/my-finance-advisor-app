import React, {useState, useEffect} from "react";
import Message from "../common/Message";
import AccountCard from "./AccountCard";

/**
 * Creates an account tab.
 * 
 * This shows and allows management of all
 * user accounts.
 * 
 * @returns JSX component.
 */
function AccountsTab() {
    // Define hooks.
    const [components, setComponents] = useState();
    const [accountsLength, setAccountsLength] = useState(0); // This hook is specifically to track if we need to call useEffect() to rerender more react components.
    const [messageType, setMessageType] = useState(null);
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

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-grow" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>  
            </div>
        );
    }
    else if (messageType === "info") {
        const message = "Looks like you have no accounts to manage, yet! Go ahead and add your first!"
        return (
            <Message id="accountMessage" iconClassName="bi bi-info-circle-fill" message={message} messageType={messageType} />
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
            {components}
        </div>
    );
}

export default AccountsTab;