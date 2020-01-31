const { TONClient } = require('ton-client-node-js');
HelloContract = require('./helloContract');

async function main(client) {
  const helloKeys = await client.crypto.ed25519Keypair();
  const helloAddress = (await client.contracts.deploy({
        package: HelloContract.package,
        constructorParams: {},
        keyPair: helloKeys,
    })).address;
  console.log(`Hello contract was deployed at address: ${helloAddress}`);

  var hello = new HelloContract(client, helloAddress, helloKeys);
  await hello.deploy();
  console.log("Deploy done");
  console.log(hello.address, hello.keys);

  console.log("Calling getter sayHello ");
  var response = await hello.sayHello();
  console.log(response);

  console.log("Running sayHello using runLocal  ");
  response = await hello.runLocal('sayHello', {});
  console.log(response);

  console.log("Running sayHello contract using run  ");
  response = await hello.run('sayHello', {});
  console.log(response);


}



(async () => {
    try {
        const client = new TONClient();
        client.config.setData({
            servers: ['http://0.0.0.0']
        });
        await client.setup();
        await main(client);
        console.log('Hello TON Done');
    process.exit(0);
    } catch (error) {
        console.error(error);
    }
})();
