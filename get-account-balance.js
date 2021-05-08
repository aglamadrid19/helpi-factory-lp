const ContractKit = require('@celo/contractkit');
const Web3 = require('web3');

require('dotenv').config();

const main = async () => {
    // Create connection to DataHub Celo Network node
    const web3 = new Web3(process.env.REST_URL);
    const client = ContractKit.newKitFromWeb3(web3);

    // Initialize account from our private key
    const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);

    // 1. Query account balances
    const accountBalances = await client.getTotalBalance(account.address)
        .catch((err) => { throw new Error(`Could not fetch account: ${err}`); });

    console.log('CELO balance: ', client.web3.utils.fromWei(accountBalances.CELO.toString(10)));
    console.log('cUSD balance: ', client.web3.utils.fromWei(accountBalances.cUSD.toString(10)));
    // console.log('Locked CELO balance: ', client.web3.utils.fromWei(accountBalances.lockedCELO.toString(10)));
    // console.log('Pending balance: ', accountBalances.pending.toString(10));

};

main().catch((err) => {
    console.error(err);
});