const {
    TradeTrustErc721Factory,
    TitleEscrowCreatorFactory,
    TitleEscrowFactory,
} = require('@govtechsg/token-registry');
const { Wallet, getDefaultProvider } = require('ethers');
const log = require('./log');
const commander = require('commander');
const prompts = require('prompts');
const { v4: uuidv4 } = require('uuid');
const { wrapDocument } = require('@govtechsg/open-attestation');
const { utils } = require('ethers');
const fs = require('fs');
const path = require('path');
const os = require('os');

require('dotenv').config();

function getProviderForNetwork() {
    if (!process.env.NETWORK) {
        throw new Error(
            'No network selected. Set envrionment variable NETWORK'
        );
    }
    const network = process.env.NETWORK;

    return getDefaultProvider(network);
}

function getWallet(provider) {
    if (!process.env.PRIVATE_KEY) {
        throw new Error(
            'Please set a private key in the PRIVATE_KEY environment variable'
        );
    }
    const privKey = process.env.PRIVATE_KEY;

    return new Wallet('0x' + privKey, provider);
}

function getTokenRegistry(provider) {
    if (!process.env.TOKEN_REGISTRY) {
        throw new Error(
            'Please set a ERC-721 token registry in the TOKEN_REGISTRY environment variable'
        );
    }
    const registryAddress = process.env.TOKEN_REGISTRY;
    return TradeTrustERC721Factory.connect(registryAddress, provider);
}

async function deployRegistry() {
    const provider = getProviderForNetwork();
    const deployerWallet = getWallet(provider);
    log.info(
        `Deploying ERC-721 token registry with deployer account ${deployerWallet.address}`
    );
    const tradeTrustERC721Factory = new TradeTrustErc721Factory(deployerWallet);
    const tokenRegistry = await tradeTrustERC721Factory.deploy(
        'TradeTrust',
        'TST'
    );
    await tokenRegistry.deployed();

    console.log(tokenRegistry);
    log.info(`ERC-721 token registry deployed at ${tokenRegistry.address}`);

    return tokenRegistry;
}

async function generateWallet() {
    const wallet = Wallet.createRandom();
    log.info(
        `Created wallet with address ${wallet.address} and private key ${wallet.privateKey}`
    );
    log.info(`Add this line to your .env to use this account:`);
    log.info(`PRIVATE_KEY=${wallet.privateKey}`);
    log.info(`To use this account you need to fund this account with Ether`);
    log.info(
        `Use a testnet faucet by importing this private key into MetaMask`
    );
}

async function deployTitleEscrow(beneficiary, holder) {
    const provider = getProviderForNetwork();
    const deployerWallet = getWallet(provider);
    const creator = getTitleEscrowCreator();
    const tokenRegistry = getTokenRegistry(provider);
    log.info(
        `Deploying TradeTrust TitleEscrow with deployer account ${deployerWallet.address}`
    );
    const titleEscrowFactory = new TitleEscrowFactory(deployerWallet);
    const titleEscrow = await titleEscrowFactory.deploy(
        tokenRegistry.address,
        beneficiary,
        holder,
        creator.address
    );

    await titleEscrow.deployed();
    log.info(`TradeTrust TitleEscrow deployed at ${titleEscrow.address}`);
    return titleEscrow;
}

async function buildDocumentv3(options) {
    return {
        reference: uuidv4(),
        name: 'Maersk Bill of Lading',
        validFrom: new Date().toISOString(),
        template: {
            name: 'BILL_OF_LADING',
            type: 'EMBEDDED_RENDERER',
            url: options.template.url,
        },
        issuer: {
            id: options.issuer.id,
            name: options.issuer.name,
            identityProof: {
                type: 'DNS-TXT',
                location: options.issuer.dnsUrl,
            },
        },
        proof: {
            type: 'OpenAttestationSignature2018',
            method: 'TOKEN_REGISTRY',
            value: options.proof.registryAddress,
        },
        doc: options.doc,
    };
}

async function buildDocumentv2(options) {
    return {
        id: uuidv4(),
        name: 'Maersk Bill of Lading',
        validFrom: new Date().toISOString(),
        $template: {
            name: 'BILL_OF_LADING',
            type: 'EMBEDDED_RENDERER',
            url: options.template.url,
        },
        issuers: [{
            tokenRegistry: options.proof.registryAddress,
            name: options.issuer.name,
            identityProof: {
                type: 'DNS-TXT',
                location: options.issuer.dnsUrl,
            },
        }],
        ...options.doc,
    };
}

async function asWrappedDocument(data) {
    const provider = getProviderForNetwork();
    const tokenRegistry = getTokenRegistry(provider);
    const rawDocument = await buildDocumentv2({
        template: { url: 'https://renderer.ebl.dev' },
        issuer: {
            id: 'https://blocklab.nl',
            name: 'Blocklab',
            dnsUrl: 'ebl.dev',
        },
        proof: { registryAddress: tokenRegistry.address },
        doc: data,
    });
    return wrapDocument(rawDocument, {
        version: 'https://schema.openattestation.com/2.0/schema.json',
    });
}

async function deployTitleEscrowCreator() {
    const provider = getProviderForNetwork();
    const deployerWallet = getWallet(provider);
    log.info(
        `Deploying TradeTrust TitleEscrow Creator with deployer account ${deployerWallet.address}`
    );
    const titleEscrowCreatorFactory = new TitleEscrowCreatorFactory(
        deployerWallet
    );
    const titleEscrowCreator = await titleEscrowCreatorFactory.deploy();
    await titleEscrowCreator.deployed();

    log.info(
        `TradeTrust TitleEscrow Creator deployed at ${titleEscrowCreator.address}`
    );
    return titleEscrowCreator;
}

function getTitleEscrowCreator() {
    if (!process.env.TITLE_ESCROW_CREATOR) {
        throw new Error(
            'Please set a TitleEscrow Creator in the TITLE_ESCROW_CREATOR environment variable'
        );
    }

    const provider = getProviderForNetwork();
    const deployerWallet = getWallet(provider);
    const titleEscrowCreatorAddress = process.env.TITLE_ESCROW_CREATOR;
    return TitleEscrowCreatorFactory.connect(
        titleEscrowCreatorAddress,
        deployerWallet
    );
}

async function stateConfig() {
    const provider = getProviderForNetwork();
    const wallet = getWallet(provider);
    log.info(`Using account ${wallet.address}`);
    log.info('Balance is: ', (await wallet.getBalance()).toString());
    log.info(`On network ${process.env.NETWORK}`);
}

async function confirmPrompt(question, callback) {
    const response = await prompts({
        type: 'confirm',
        name: 'value',
        message: question,
        initial: true,
    });

    if (response.value === true) {
        return callback();
    }
}

function saveDocument(doc) {
    const filepath = path.join(
        os.homedir(),
        'ebl-documents',
        `eBL-${new Date().getTime()}.tt`
    );
    fs.writeFileSync(filepath, JSON.stringify(doc));
    return filepath;
}

process.on('uncaughtException', function (error) {
    log.error(error);
    process.exit(1);
});

process.on('unhandledRejection', function (error) {
    log.error(error);
    process.exit(1);
});

const program = new commander.Command();
const walletCmd = program.command('wallet');

walletCmd.command('new').action(async function () {
    generateWallet();
});

const configCmd = program.command('config');
configCmd.command('info').action(async function () {
    const provider = getProviderForNetwork();
    const wallet = getWallet(provider);
    log.info('Current user is: ', wallet.address);
    log.info('Balance is: ', (await wallet.getBalance()).toString());
});

program.command('deploy <contract>').action(async function (contract) {
    await stateConfig();
    switch (contract) {
        case 'ERC721':
            {
                await confirmPrompt(
                    `Deploy ERC721 on network ${process.env.NETWORK}`,
                    deployRegistry
                );
            }
            break;
        case 'TitleEscrowCreator':
            {
                await confirmPrompt(
                    `Deploy TitleEscrowCreator on network ${process.env.NETWORK}`,
                    deployTitleEscrowCreator
                );
            }
            break;
        default:
            {
                const errorMessage = `Unkown contract ${contract}.
            \r
            \rPossible options are: 
            \rERC721, TitleEscrow, TitleEscrowCreator
            `;
                throw new Error(errorMessage);
            }
            break;
    }
});

program.command('issue').action(async function () {
    await stateConfig();
    const documentToken = await asWrappedDocument({ blNumber: 10 });

    log.info('Document created: \n', documentToken);
    await confirmPrompt(`Save file?`, () => {
        const filepath = saveDocument(documentToken)
        log.info(`Saved document to ${filepath}`);
    });

    const response = await prompts([
        {
            type: 'text',
            name: 'beneficiary',
            message: 'Who will be the initial beneficiary of the BL',
        },
        {
            type: 'text',
            name: 'holder',
            message: 'Who will be the initial holder of the BL',
        },
    ]);

    const titleEscrow = await confirmPrompt(
        `Deploy TitleEscrow on network ${process.env.NETWORK}`,
        () => deployTitleEscrow(response.beneficiary, response.holder)
    );

    const provider = getProviderForNetwork();
    const wallet = getWallet(provider);
    const tokenRegistry = getTokenRegistry(wallet);
    const tx = await tokenRegistry['safeMint(address,uint256)'](
        titleEscrow.address,
        utils.bigNumberify(`0x${documentToken.signature.targetHash}`)
    );
    await tx.wait();

    log.info(`Token minted in transaction ${tx.hash}.`);
});


module.exports = program;
