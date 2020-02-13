import { Api, JsonRpc } from 'eosjs-rn';
import { TextEncoder, TextDecoder } from 'text-encoding';

const rpc = new JsonRpc('http://testnet.telos.eostribe.io');

let api = null;

const setSignatureProvider = signatureProvider => {
  api = new Api({
    rpc,
    signatureProvider,
    textDecoder: new TextDecoder(),
    textEncoder: new TextEncoder(),
  });
};

export { rpc, api, setSignatureProvider };
