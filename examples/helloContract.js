//
// This file was generated using TON Labs developer tools.
//

const abi = {
	"ABI version": 1,
	"functions": [
		{
			"name": "constructor",
			"inputs": [
			],
			"outputs": [
			]
		},
		{
			"name": "touch",
			"inputs": [
			],
			"outputs": [
			]
		},
		{
			"name": "sayHello",
			"inputs": [
			],
			"outputs": [
				{"name":"value0","type":"uint32"}
			]
		}
	],
	"events": [
	],
	"data": [
	]
};

const pkg = {
    abi,
    imageBase64: 'te6ccgECGwEABJ4AAgE0BgEBAcACAgPPIAUDAQHeBAAD0CAAQdgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAIo/wAgwAH0pCBYkvSg4YrtU1gw9KAJBwEK9KQg9KEIABCgAAAACzDbMAIBIA0KAc7/f/79AW1haW5fZXh0ZXJuYWwhjkr++QFjaGVja1NpZ27VIMcBjhL++gFjaGVja1NpZ24yITEx2zDgIIECANch1wv/IvkBIiL5EPKo/voBY2hlY2tTaWduMyIDXwPbMNgg0x/TPzMgCwGcjoDYjkL+/gFtYWluX2V4dGVybmFsMv74AXR2bV9qdW1wIiL++QF0dm1fanVtcDDxQAH+/gFtYWluX2V4dGVybmFsM18I2zDggHzy8F8IDAD8/vsBcmVwbGF5X3Byb3RwcO1E0Mgh9AQzAfQAIYEAgNdFmiHTP9M/NF4ANTOWgggbd0Az4iMluSX4I4ED6KgloLmwjiQkzws/Is8LPyHPFiDJ7VT+/AFyZXBsYXlfcHJvdDJ/BV8F2zDg/vwBcmVwbGF5X3Byb3QzcAVfBdswAgEgEw4CAUgQDwAPuY/cQOYbZhABCbmtZ74wEQH6/vgBYzRfdG9fYzftR+1E0PQFb4wg7Vf++QFjNF90b19jNzAwMPgAgGTtR28RgED0DpPTH9GRcOLIghBNaz3xghCAAAAAsc8LHyHPCx/+/AFzZW5kX2V4dF9tc2cg+CX4KP79AWJ1aWxkX2V4dF9tc2fIc88LASHPFnLPQCISAFbPCz+AIc9AIM81JM8xcaC8lnHPQCPPF5Vxz0EjzeIgyQRfBHD7ADBxatswAgEgFRQA6bo7yD2f74AWM0X3RvX2M37UftRND0BW+MIO1X/vkBYzRfdG9fYzcwMPgAMPgjtR/Iyx+AZO1HbxGAQPRD7UcBb1HtV/74AWM3X3RvX2M07UTQ9AHI7UdvEQH0ACHPFiDJ7VT++QFjN190b19jNDBfAnBq2zCAIBIBkWAQm4iQAnUBcB+v79AWNvbnN0cl9wcm90XzBwcIIIG3dA7UTQIPQEMjQggQCA10WOEtM/ATPTPwEyIHHXRZSAe/Lw3t7IJAH0ACPPCz8izws/cc9BIc8WIMntVP79AWNvbnN0cl9wcm90XzFfBQD4AP74AWM0X3RvX2M37UftRND0BW+MIO1XGACs/vkBYzRfdG9fYzcwMDD4I7UfyMsfgGTtR28RgED0Q+1HAW9R7Vf++AFjN190b19jNO1E0PQByO1HbxEB9AAhzxYgye1U/vkBYzdfdG9fYzQwXwJwagAB4txw/v0BbWFpbl9pbnRlcm5hbCL+/AFnZXRfc3JjX2FkZHIg0HPXIf79AWdldF9zcmNfYWRkcjDTAAExMSLHAI4vIMAAjiX++AF0dm1fanVtcCKCEFx+4gf++QF0dm1fanVtcDDxQAFfBtsw4F8G2zDgGgC0/v4BbWFpbl9pbnRlcm5hbDEi0x80IcABjiH++AF0dm1fanVtcCCAC/75AXR2bV9qdW1wMPFAAV8H2zDg/vgBdHZtX2p1bXAjIf75AXR2bV9qdW1wMPFAAV8H',
};

class HelloContract {
    /**
    * @param {TONClient} client
    * @param {string} address can be null if contract will be deployed
    * @param {TONKeyPairData} keys
    */
    constructor(client, address, keys) {
        this.client = client;
        this.address = address;
        this.keys = keys;
        this.package = pkg;
        this.abi = abi;
    }

    /**
     */
    async deploy() {
        if (!this.keys) {
            this.keys = await this.client.crypto.ed25519Keypair();
        }
        this.address = (await this.client.contracts.deploy({
            package: pkg,
            constructorParams: {},
            initParams: {},
            keyPair: this.keys,
        })).address;
    }

    /**
    * @param {string} functionName
    * @param {object} input
    * @return {Promise.<object>}
    */
    async run(functionName, input) {
        const result = await this.client.contracts.run({
            address: this.address,
            functionName,
            abi,
            input,
            keyPair: this.keys,
        });
        return result.output;
    }

   /**
    * @param {string} functionName
    * @param {object} input
    * @return {Promise.<object>}
    */
    async runLocal(functionName, input) {
        const result = await this.client.contracts.runLocal({
            address: this.address,
            functionName,
            abi,
            input,
            keyPair: this.keys,
        });
        return result.output;
    }

    /**
     */
    touch() {
        return this.run('touch', {});
    }

    /**
     */
    touchLocal() {
        return this.runLocal('touch', {});
    }

    /**
     * @typedef HelloContract_sayHello
     * @type {object}
     * @property {number} value0  (uint32)
     */

    /**
     * @return {Promise.<HelloContract_sayHello>}
     */
    sayHello() {
        return this.run('sayHello', {});
    }

    /**
     * @return {Promise.<HelloContract_sayHello>}
     */
    sayHelloLocal() {
        return this.runLocal('sayHello', {});
    }

}

HelloContract.package = pkg;

module.exports = HelloContract;
