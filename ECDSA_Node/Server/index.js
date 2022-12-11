const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils");
const secp = require( "ethereum-cryptography/secp256k1");

app.use(cors());
app.use(express.json());

const balances = {
  "0x1": 100,
  "0x2": 50,
  "0x3": 75,
  "0x3e9cc48e5d92a4384caba70cbbdc7450249d8462": 200
};

const usedSignatures = [];

function hashMessage(message) {
  return keccak256(utf8ToBytes(message));
}

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { recipient, amount, signature, recoveryBit } = req.body;
  //console.log(public_key);
  
  const document = {
    
    amount: parseInt(amount),
    //id: parseInt(transactions[sender.toLowerCase()] + 1),
    recipient: recipient,
  };
  (async () => {
  const pkey = await secp.recoverPublicKey(
    hashMessage(JSON.stringify(document)),
    Uint8Array.from(signature.split(",")),
    parseInt(recoveryBit)
  );
  
const public_key = `0x${toHex(keccak256(pkey.slice(1)).slice(-20))}`;

setInitialBalance(public_key);
setInitialBalance(recipient);
  if (balances[public_key] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } 
  else if (usedSignatures.includes(signature)) {
    res.status(400).send({ message: "Duplicate Transaction!" });
    console.log("Duplicate Transaction!")
  } 
  else {
    usedSignatures.push(signature);
    balances[public_key] -= amount;
    //console.log(balances[public_key]);
    balances[recipient] += amount;
    res.send({ balance: balances[public_key] });
    console.log("Transfer Successfull!");
  }
})();



  
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
