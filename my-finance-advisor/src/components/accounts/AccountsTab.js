import React from 'react';
import AccountCard from './AccountCard';

/**
 * Creates an account tab.
 * 
 * This shows and allows management of all
 * user accounts.
 * 
 * @returns JSX component.
 */
function AccountsTab() {
    let accounts = [];
    for (let i = 0; i < 3; i++)
    {
        accounts.push(React.createElement(AccountCard, {
            key: i,
            header: "My Bank",
            accountId: "1234",
            accountType: "Savings",
            accountInstitution: "Bank of America",
            balance: "1000.00"
        }))
    }
    return (
        <div>
            {accounts}
        </div>
    );
    
}

export default AccountsTab;