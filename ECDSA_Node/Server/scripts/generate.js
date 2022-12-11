const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");



const privateKey = secp.utils.randomPrivateKey();

console.log("Private Key: ",toHex(privateKey));

const publicKey = secp.getPublicKey(privateKey);
const Pkey = `0x${toHex(keccak256(publicKey.slice(1)).slice(-20))}`;
const hmsg = keccak256(utf8ToBytes("Hello"));

console.log("Public Key: ",Pkey);
//const sig= await secp.sign(hmsg, privateKey, { recovered: boolean = true })
(async () => {
    const sig= await secp.sign(hmsg, privateKey, { recovered: boolean = true });
    console.log(Uint8Array.from(Object.values(sig[0])));
    
  })();

//const recoveredpkey = secp.recoverPublicKey(keccak256(utf8ToBytes(hmsg.toString())),  Uint8Array.from(sig), true)


/*
Private Key:  c046cee8c488eecfde6347344e640d39b858cb04b1c5276a5807e71a013b22b7
Public Key:  0x3e9cc48e5d92a4384caba70cbbdc7450249d8462
*/


