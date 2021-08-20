const grpc = require('grpc');
const path = require('path');
const protoLoader = require('@grpc/proto-loader');
const loaderConfig = require('../config/proto');

    const nixDefinition = protoLoader.loadSync(
        path.resolve(__dirname, '..', 'pb', 'nix.proto'), 
        loaderConfig
    );

    const protonix = grpc.loadPackageDefinition(nixDefinition);
    const nixClient = new protonix.PurchaseService('localhost:3335',
    grpc.credentials.createInsecure());

    module.exports = nixClient;