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


async function myfun(client) {

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





async function main(client) {

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

async function runcontract(client) {

	  const hello = new HelloContract(client, helloAddress, helloKeys);
 await hello.deploy();
	 console.log(hello.address, hello.keys);
 var response = await hello.sayHello();
 console.log(response);
// const response = await hello.runLocal('sayHello', {});
 response = await hello.run('sayHello', {});
 console.log(response);

}

async function queries(client) {
    const transactions = await client.queries.transactions.query({}, 'id now status');
    console.log('All Transactions: ', transactions);
}


(async () => {
    try {
        const client = new TONClient();
        client.config.setData({
		servers: ['http://127.0.0.1:80']
        });
	     console.log("one");
        await client.setup();
	     console.log("two");
        await myfun(client);
	     console.log("three");
        // await main(client);

        await runcontract(client);
        await queries(client);
        console.log('Hello TON Done');
    process.exit(0);
    } catch (error) {
        console.error(error);
    }
})();

