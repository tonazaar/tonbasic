const fs = require('fs');
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


async function depositFundstoContractAddress(client) {

helloKeys = await client.crypto.ed25519Keypair();
fs.writeFileSync('clientserverkey1.json', JSON.stringify(helloKeys));

var futureHelloAddress = (await client.contracts.createDeployMessage({
        package: HelloContract.package,
        constructorParams: {},
        keyPair: helloKeys,
    })).address;
   console.log("Future address of the contract will be:"+ futureHelloAddress);

helloAddress = futureHelloAddress;

await get_grams_from_giver(client, futureHelloAddress);
    console.log("Grams were transfered from giver to " + futureHelloAddress);
}






async function runcontract(client) {
 var hello;
 hello = new HelloContract(client, helloAddress, helloKeys);
 await hello.deploy();
 var response = await hello.sayHello();
 console.log(response);
 response = await hello.runLocal('sayHello', {});
 console.log(response);
 response = await hello.run('sayHello', {});
 console.log(response);

}



(async () => {
    try {
        const client = new TONClient();
        client.config.setData({
		servers: ['http://127.0.0.1:80']
        });
        await client.setup();
        await depositFundstoContractAddress(client);

        await runcontract(client);

        console.log('Server side TON Sample deployed');
    process.exit(0);
    } catch (error) {
        console.error(error);
    }
})();

