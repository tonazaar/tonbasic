# tonbasic

#### Client server example

The serverside creates a contract and deploys. The client side uses the key-pair to access the contract functions.

##### The Server side
```
node clientserverss1.js 
Future address of the contract will be:0:4e1d11eb84bbc9bd0bd44a6359cc22e720e16597fc811c98ae19c7e996e21974
Grams were transfered from giver to 0:4e1d11eb84bbc9bd0bd44a6359cc22e720e16597fc811c98ae19c7e996e21974
{ value0: '0x5e33cf0a' }
{ value0: '0x5e33cf0a' }
{ value0: '0x5e33cf0a' }
Serverside TON Sample deployed
```

##### The keys created file clientserverkey1.json

```
{"public":"889693093ddb3d24fb81d3c37d97c7f7d87a7aafb56054ee1f1040841c28f458","secret":"de278afcf85238163f1139e163c632d39c442498ff3fcfa2ab3bc84c0de5d946"}


```
##### The Client side
```
node clientservercs1.js 
Future address of the contract will be:0:4e1d11eb84bbc9bd0bd44a6359cc22e720e16597fc811c98ae19c7e996e21974
Grams were transfered from giver to 0:4e1d11eb84bbc9bd0bd44a6359cc22e720e16597fc811c98ae19c7e996e21974
{ value0: '0x5e33cf0a' }
{ value0: '0x5e33cf0a' }
{ value0: '0x5e33cf0a' }
Client side TON sample working

```

