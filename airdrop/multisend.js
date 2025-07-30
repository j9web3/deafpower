require('dotenv').config();
const { ethers } = require("ethers");

// Verbinde zur Apertum Blockchain
const provider = new ethers.JsonRpcProvider("https://rpc.apertum.io");

// Signer: Private Key wird sicher aus .env geladen
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Deafpower Token (ERC20)
const tokenAddress = "0x9e757BAdF582A92899606E97165E90857F51646b";
const tokenABI = [
  "function transfer(address to, uint256 amount) public returns (bool)"
];
const token = new ethers.Contract(tokenAddress, tokenABI, signer);

// 📦 Empfänger-Liste: jeweils 10 Deafpower (mit 18 Dezimalstellen)
const recipients = [
  "0xf1bAEb8f8132F6112d50C39F38f4d6e12B4037fC",
  "0xE276AADFfd2092EC9c3DbA3BA23136834D01B67e",
  "0x697534D749ff5778C4857e033Bec46303034E1F0",
  "0x6b8BcEd3d62E3d308A42367e6E9A92fD90dAdF39",
  "0xEc4286c9f2fcB3D3d1c2ca253Bf47b72f4B31308",
  "0x23d0851dFc97d589Bc353b49E9A90B3473D1c5A3",
  "0xc1eF4EBf0A9983125A628a8a313D2117BCafa5ef",
  "0x8844fdd6e84f9e1a18DeA9FA2c15525c7eBe0157",
  "0x5fFAa1d52602d4d3a8bc77986ea87FEA7d8888Bd",
  "0xa6ae25Af565dDAa1E630b843F2c882Ecdc6D007B",
  "0x7d2E195133fc118acAb5a4d71f4f78Bf6F061c1E",
  "0x9a8d1cbce12940e5b6cE00F4d186867Cc7cBE15a",
  "0xC688FDE81DC0796369942ba6c00AB871D7E95CDb",
  "0x775B215C693311b6DD8e00E42E0B1A47d72483DA",
  "0x5dF7041dA87CcCa0a22ecf3128C60B2acD1BD232",
  "0xae6DeDce9f7CAd6C98Aa80076fA931428a890699",
  "0xb2e85656CD6384CE14a3153d9828Eed9cD6caF3A",
  "0x61a87D4BB2657f2181303f24273b15c590f596Bc",
  "0x94Bd21b773ba3fdDdeBD0537a82bcA63d815eb6f",
  "0x23d0851dFc97d589Bc353b49E9A90B3473D1c5A3",
  "0xDed62A4C6166fA7D8AbbeEb51953aDBd04697d2D",
  "0xC7eD68d0F620c7c401C99b52cF2A9A7Cd99F9a34",
  "0xDe82C42f006578dDF396615048a0772219B1636f",
  "0x2b8cC110Cc21e999B2fd5dF2a5dB293Bf69379AD",
  "0xF20FB8E3Ff6c832822505BeF792f5916b0C63090",
  "0x18EEcA658Cd30014103Eb54C65510a6dFa433707",
  "0x46B56A5A32F75C5e714730b8D26aEd63158868a4",
  "0x036096a769FDE1D41B7383d111F7E3f03B453892",
  "0x398F9a102Fd5ebEc7cc10389D974A0cEd5d8849F",
  "0x01Cb1350F7F10a07f4cf4F44B223982458bbA639",
  "0x4cd2c0f6647cCef655476Ea1D30a410eB9Ab26e8"
];

async function batchAirdrop() {
  const amount = ethers.parseUnits("10", 18); // 10 Deafpower mit 18 Dezimalstellen
  console.log(`🚀 Starting batch airdrop from: ${await signer.getAddress()}`);

  for (const address of recipients) {
    const tx = await token.transfer(address, amount);
    console.log(`✅ Sent 10 DEAFPOWER to ${address} | TX: ${tx.hash}`);
    await tx.wait();
  }

  console.log("🎉 Airdrop complete!");
}

batchAirdrop().catch(console.error);

