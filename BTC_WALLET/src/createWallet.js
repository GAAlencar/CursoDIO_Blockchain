
// dependencias necessarias
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

// rede de testes (testnet)
const testNetwork = bitcoin.networks.testnet

// rede principal (mainnet)
const mainNetwork = bitcoin.networks.bitcoin

// derivação de carteiras HD

const testPath = `m/49'/1'/0'/0`
const mainPath = `m/49'/0'/0'/0`

// criando a mnemonic para a seed
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

// criando a raiz da carteira HD
let root = bip32.fromSeed(seed, testNetwork)

// criando uma conta (par pvt - pub keys)
let account = root.derivePath(testPath)
let node = account.derive(0).derive(0)

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: testNetwork
}).address

console.log("Carteira gerada");
console.log("Endereço: ", btcAddress);
console.log("Chave privada: ", node.toWIF());
console.log("Seed: ", mnemonic);
