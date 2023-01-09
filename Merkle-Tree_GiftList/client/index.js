const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';
async function main() {
const name = process.argv[2];
const merkleTree = new MerkleTree(niceList);
//console.log(name);
const index = niceList.findIndex(n => n === name);
//console.log(index);

  //const root = merkleTree.getRoot();
  const proof = merkleTree.getProof(index);
  //console.log("root: ", root);*/
const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name,
    proof,
  });

  console.log({ gift });
}

main();