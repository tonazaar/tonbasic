const { TONClient } = require('ton-client-node-js');
HelloContract = require('./helloContract');

async function main(client) {
}

async function main1(client) {
	const hello = new HelloContract(client);
 await hello.deploy();
 console.log(hello.address, hello.keys);
 const response = await hello.sayHello();
}


(async () => {
    try {
        const client = new TONClient();
        client.config.setData({
            servers: ['http://0.0.0.0']
        });
        await client.setup();
        await main(client);
        await main1(client);
        console.log('Hello TON Done');
    process.exit(0);
    } catch (error) {
        console.error(error);
    }
})();
