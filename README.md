#### Basic examples of TON

##### Example1

- examples/example1sanity.js

```
node example1sanity.js 
Hello TON Done


```
##### Example2 

- examples/example2direct.js

```
node example2direct.js 
TONClientError {
  message: 'Account has no code and data (0) at computeSkipped',
  source: 'node',
  code: 0,
  data:
   { phase: 'computeSkipped',
     transaction_id:
      'c9e465e0bdb093d83ef853ad0d05dd7e72eb662cdc39fd22a3db616a074757ba' } }

```
##### Example3
- examples/example3helper.js

```
node example3helper.js 
TONClientError {
  message: 'Account has no code and data (0) at computeSkipped',
  source: 'node',
  code: 0,
  data:
   { phase: 'computeSkipped',
     transaction_id:
      '3e1a88a9bc1b7f92d9eef2f00391aac5d0d496cf2a03e31cc5e8b77996b42478' } }

```
##### Example4
- examples/directexample4.js


```
 node directexample4.js 
step-1
step-2 Deposit funds to contract address
Future address of the contract will be:0:4c4b17908ffa3d703c3b12e6b97ab101af6d01fd6566aaade4c0d118e68d862a
Grams were transfered from giver to 0:4c4b17908ffa3d703c3b12e6b97ab101af6d01fd6566aaade4c0d118e68d862a
step-3 Deploy contract and run directly 
Hello contract was deployed at address: 0:4c4b17908ffa3d703c3b12e6b97ab101af6d01fd6566aaade4c0d118e68d862a
Hello contract was responded to touch: 2a1b79d23f902fbe453f7fd2456611eb61a50053dce5106fde5daa43e4058f0b
Hello contract was ran on a client TVM and also responded to sayHello: { output: { value0: '0x5e33dd15' }, fees: null }
step-4 Deploy contract and run through helper 
Querying Blockchain transactions 
All Transactions:  [ { id:
     '4b498bff24bd46245af3245fb235b5f224defc6758da0ab1a2d138aecf75b28f',
    now: 1580314713,
    status: 3,
    __typename: 'Transaction' },


```


##### Example5

- examples/helperexample5.js

```
node helperexample5.js 
step-1
step-2 Deposit funds to contract address
Future address of the contract will be:0:6dfc119328cbe99215e2e36ddceb22f3e7e782cc4ae4323e5f66034c9b5e387d
Grams were transfered from giver to 0:6dfc119328cbe99215e2e36ddceb22f3e7e782cc4ae4323e5f66034c9b5e387d
step-3 Deploy contract and run through helper 
Deploy done
0:6dfc119328cbe99215e2e36ddceb22f3e7e782cc4ae4323e5f66034c9b5e387d { public:
   '2164531673d301bf94d76ec7d180a1afa5edb20ed80fd4cbb8b4ae8694f668ae',
  secret:
   'fa4743097eb5a3183792fd227fd6df60e7741d85ef0091a43b814d46eff24bec' }
Calling getter sayHello 
{ value0: '0x5e33dd75' }
Running sayHello using runLocal  
{ value0: '0x5e33dd75' }
Running sayHello contract using run  
{ value0: '0x5e33dd75' }
step-5 Querying Blockchain 
Querying Blockchain transactions 
All Transactions:  [ { id:
     '4b498bff24bd46245af3245fb235b5f224defc6758da0ab1a2d138aecf75b28f',
    now: 1580314713,
    status: 3,


```

#### Client server example

##### Example6

* Relevant files

- examples/clientserverss1.js
- examples/clientservercs1.js
- examples/clientserverkey1.json (created dynamically)

The server side creates a contract and deploys. The client side uses the key-pair to access the deployed contract functions.

##### The Server side
- examples/clientserverss1.js

```
node clientserverss1.js 
Future address of the contract will be:0:4e1d11eb84bbc9bd0bd44a6359cc22e720e16597fc811c98ae19c7e996e21974
Grams were transfered from giver to 0:4e1d11eb84bbc9bd0bd44a6359cc22e720e16597fc811c98ae19c7e996e21974
{ value0: '0x5e33cf0a' }
{ value0: '0x5e33cf0a' }
{ value0: '0x5e33cf0a' }
Serverside TON Sample deployed
```

##### The keys file 

- examples/clientserverkey1.json (created dynamically)

```
{"public":"889693093ddb3d24fb81d3c37d97c7f7d87a7aafb56054ee1f1040841c28f458","secret":"de278afcf85238163f1139e163c632d39c442498ff3fcfa2ab3bc84c0de5d946"}


```
##### The Client side
- examples/clientservercs1.js

```
node clientservercs1.js 
Future address of the contract will be:0:4e1d11eb84bbc9bd0bd44a6359cc22e720e16597fc811c98ae19c7e996e21974
Grams were transfered from giver to 0:4e1d11eb84bbc9bd0bd44a6359cc22e720e16597fc811c98ae19c7e996e21974
{ value0: '0x5e33cf0a' }
{ value0: '0x5e33cf0a' }
{ value0: '0x5e33cf0a' }
Client side TON sample working

```

