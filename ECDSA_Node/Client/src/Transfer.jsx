import { useState } from "react";
//import Child from './signature';
import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes } from "ethereum-cryptography/utils";



function Transfer({ address, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  //let [signature, setSignature] = useState("");
  
  //const [Getsign, setGetsign] = useState("");

  //const Pkey = `0x${toHex(keccak256(publicKey.slice(1)).slice(-20))}`;
  

  const setValue = (setter) => (evt) => setter(evt.target.value);

  function hashMessage(message) {
    return keccak256(utf8ToBytes(message));
  }

  function data() {
    return hashMessage(
      JSON.stringify({
        //sender: address,
        amount: parseInt(sendAmount),
        // id: parseInt(transactions) + 1,
        recipient: recipient.toLowerCase(),
      })
    );
  }
  

  async function transfer(evt) {
    evt.preventDefault();
    const publicKey = secp.getPublicKey(privateKey);
    const Pkey = `0x${toHex(keccak256(publicKey.slice(1)).slice(-20))}`;
    const sig= await secp.sign(data(), privateKey, { recovered: true });
    //setSignature(sig[0]);
     //signature = sig[0];
    
    
    try {
      if(Pkey == address){
        const {
        data: { balance },
        } = await server.post(`send`, {
        
        //sender: address,
        amount: parseInt(sendAmount),
        recipient,
        //hMsg: String(data()),
        signature: String(sig[0]),
        recoveryBit: String(sig[1],)
        
      });
      setBalance(balance);
      console.log("Transfer Successfull!");
      console.log("Signature is: ", sig[0]);
      console.log("recovery bit: ", sig[1]);
      }
    else
      console.log("Wallet address and Private key don't match");

    } catch (ex) {
      alert(ex.response.data.message);
    }
  }
//console.log(signature);
  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
           
          onChange={setValue(setRecipient)}
        ></input>
      </label>
      <label>
        Private key
        <input
        type="password"
          placeholder="Type an address, for example: 09aBE"
          value={privateKey}
          onChange={setValue(setPrivateKey)}
        ></input>
      </label>

    

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
