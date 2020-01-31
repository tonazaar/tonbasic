const { TONClient } = require('ton-client-node-js');
HelloContract = require('./helloContract');

var helloKeys ;
var keys ;
var newfutureHelloAddress;
var helloAddress ;
var        deployee_package ;

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


//This creates the complete new contract image and data from pre-defined DeployData stored
//in the deploying contract
async function get_samecontract_asnew(client, account) {
    const { contracts, queries } = client;
	 
	deployeekeys = await client.crypto.ed25519Keypair();

newfutureHelloAddress = (await client.contracts.createDeployMessage({
        package: HelloContract.package,
        constructorParams: {},
        keyPair: helloKeys,
    })).address;
   console.log("Future address of the contract will be:"+ newfutureHelloAddress);



        deployee_package = HelloContract.package;
	keys = helloKeys;
        deployer_package = HelloContract.package;

//This creates the complete new contract image and data from pre-defined DeployData stored
//in the deploying contract
const deployData = await contracts.getDeployData({
        abi: deployee_package.abi,
        imageBase64: deployee_package.imageBase64,
        publicKeyHex: deployeekeys.public,
    });

    const address = "0:" + deployData.accountId || "";
//Creates a message body with serialized ABI constructor parameters
    const runBody = await contracts.createRunBody({
        abi: deployee_package.abi,
        function: "constructor",
        params: {
            _param1: 1,
            _param2: 2
        },
        internal: true,
    });


    const addressResult = await contracts.run({
        address: deployer.address,
        functionName: 'deploy3',
        abi: deployer_package.abi,
        input: {
            contr: deployData.imageBase64,
            addr: address,
//Transfer initial state gram amount
            grams: 300000000,
//Define Payload
            payload: runBody.bodyBase64,
        },
        keyPair: keys,
    });

//New contract address output
    expect(addressResult.output.value0).toEqual(address);
    await queries.accounts.waitFor(
        {
            id: { eq: address },
            balance: { gt: "0" }
        },
        'id balance'
    );

    const result = await contracts.run({
        address: address,
        functionName: 'get',
        abi: deployee_package.abi,
        input: {},
        keyPair: deployeekeys,
    });

    expect(result.output).toEqual({
        value0: '0x1',
        value1: '0x2'
    });

};






async function myfun(client) {

helloKeys = await client.crypto.ed25519Keypair();

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





async function clienttesting(client) {


/*
   const response = await client.contracts.run({
        address: helloAddress,
        abi: HelloContract.package.abi,
        functionName: 'touch',
        input: {},
        keyPair: helloKeys,
    });
    console.log('Hello contract was responded to touch:', response.transaction.id);
 */ 
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
 var hello;
// Works
	/*
 hello = new HelloContract(client, helloAddress, helloKeys);
 await hello.deploy();
 var response = await hello.sayHello();
 console.log(response);

	 */
// Does not work
//(Case-2)
 hello = new HelloContract(client, helloAddress, helloKeys);
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
        // await clienttesting(client);

        get_samecontract_asnew(client, newfutureHelloAddress) ;
        await runcontract(client);
        // await queries(client);
        console.log('Hello TON Done');
    process.exit(0);
    } catch (error) {
        console.error(error);
    }
})();

