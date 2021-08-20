const grpc = require('grpc');
const path = require('path');
const protoLoader = require('@grpc/proto-loader');
const loaderConfig = require('../config/proto');

    const hidraDefinition = protoLoader.loadSync(
        path.resolve(__dirname, '..', 'pb', 'hydra.proto'), 
        loaderConfig
    );

    const protoHidra = grpc.loadPackageDefinition(hidraDefinition);
    const hidraClient = new protoHidra.UserService('localhost:3334',
    grpc.credentials.createInsecure());

    module.exports = hidraClient;