<h2>ECDSA Node</h2>
This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

<h2>My personal take on the project</h2>
 I've made the logic so in order for an address to make a transfer he needs a signature with it's private key. To make things easier to test, I've created a section where the user can insert his private key (A PRIVATE KEY WITH NO REAL FUNDS PLEASE!!) and the app will generate a signature.

and the app send signature to server with recipient and amount and the transfer will occur. The server checks that the signature provided it hasn't been used already.

In the Wallet section the user can check the balances that the three example adresses do transfers with them

<h2>Video instructions</h2>
For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4

<h2>Client</h2>

The client folder contains a react app using vite. To get started, follow these steps:

1. Open up a terminal in the <code>/client</code> folder
2. Run <code>npm install</code> to install all the depedencies
3. Run <code>npm run dev</code> to start the application
4. Now you should be able to visit the app at <code>http://127.0.0.1:5173/</code>

<h2>Server</h2>

The server folder contains a node.js server using express. To run the server, follow these steps:

1. Open a terminal within the <code>/server<code> folder
2. Run <code>npm install</code> to install all the depedencies
3. Run <code>node index</code> to start the server
4. The application should connect to the default server port (3042) automatically!

  Hint - Use <code>nodemon</code> instead of<code> node</code> to automatically restart the server on any changes.
