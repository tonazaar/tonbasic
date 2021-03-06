const { TONClient } = require('ton-client-node-js');
HelloContract = require('./helloContract');

var helloKeys ;
var helloAddress ;

const giverAddress = '0:841288ed3b55d9cdafa806807f02a0ae0c169aa5edfe88a789a6482429756a94';
const giverAbi = 
{
	"ABI version": 1,
	"functions": [
		{
			"name": "constructor",
			"inputs": [],
			"outputs": []
		},
		{
			"name": "sendGrams",
			"inputs": [
				{"name":"dest","type":"address"},
				{"name":"amount","type":"uint64"}
			],
			"outputs": []
		}
	],
	"events": [],
	"data": []
};

async function get_grams_from_giver(client, account) {
    const { contracts, queries } = client;
    const result = await contracts.run({
        address: giverAddress,
        functionName: 'sendGrams',
        abi: giverAbi,
        input: {
            dest: account,
            amount: 5000000000
        },
        keyPair: null,
    });

    const wait = await queries.accounts.waitFor(
        {
            id: { eq: account },
            balance: { gt: "0" }
        },
		'id balance'
    );
};


async function getaddressAndDepositfunds(client) {

helloKeys = await client.crypto.ed25519Keypair();

var futureHelloAddress = (await client.contracts.createDeployMessage({
        package: HelloContract.package,
        constructorParams: {},
        keyPair: helloKeys,
    })).address;
   console.log("Future address of the contract will be:"+ futureHelloAddress);

await get_grams_from_giver(client, futureHelloAddress);
    console.log("Grams were transfered from giver to " + futureHelloAddress);
}





async function runcontractdirectly(client) {

    helloAddress = (await client.contracts.deploy({
    package: HelloContract.package,
    constructorParams: {},
    keyPair: helloKeys,
})).address;
console.log("Hello contract was deployed at address: "+ helloAddress);


   const response = await client.contracts.run({
        address: helloAddress,
        abi: HelloContract.package.abi,
        functionName: 'touch',
        input: {},
        keyPair: helloKeys,
    });
    console.log('Hello contract was responded to touch:', response.transaction.id);
  
  const localResponse = await client.contracts.runLocal({
        address: helloAddress,
        abi: HelloContract.package.abi,
        functionName: 'sayHello',
        input: {},
        keyPair: helloKeys,
    });
    console.log('Hello contract was ran on a client TVM and also responded to sayHello:', localResponse);

}


async function queries(client) {
    console.log("Querying Blockchain transactions ");
    const transactions = await client.queries.transactions.query({}, 'id now status');
    console.log('All Transactions: ', transactions);
}


(async () => {
    try {
        const client = new TONClient();
        client.config.setData({
		servers: ['http://127.0.0.1:80']
        });
        console.log("step-1");
        await client.setup();
	     console.log("step-2 Deposit funds to contract address");
        await getaddressAndDepositfunds(client);
	     console.log("step-3 Deploy contract and run directly ");
        await runcontractdirectly(client);
	     console.log("step-4 Deploy contract and run through helper ");
        await queries(client);
        console.log('Hello TON Working');
    process.exit(0);
    } catch (error) {
        console.error(error);
    }
})();

