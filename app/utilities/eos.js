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

const getTableRows = table => {
  return rpc.get_table_rows({
    json: true,
    code: 'productloger',
    scope: 'productloger',
    table,
  });
};

const addManager = (accountName, description) => {
  return api.transact(
    {
      actions: [
        {
          account: 'productloger',
          name: 'addmanager',
          authorization: [
            {
              actor: 'productloger',
              permission: 'active',
            },
          ],
          data: {
            manager: accountName,
            description: description,
          },
        },
      ],
    },
    {
      blocksBehind: 3,
      expireSeconds: 30,
    },
  );
};

const addUser = (managerName, accountName, description) => {
  return api.transact(
    {
      actions: [
        {
          account: 'productloger',
          name: 'adduser',
          authorization: [
            {
              actor: managerName,
              permission: 'active',
            },
          ],
          data: {
            user: accountName,
            manager: managerName,
            description: description,
          },
        },
      ],
    },
    {
      blocksBehind: 3,
      expireSeconds: 30,
    },
  );
};

const removeUser = (managerName, userId) => {
  return api.transact(
    {
      actions: [
        {
          account: 'productloger',
          name: 'rmuser',
          authorization: [
            {
              actor: managerName,
              permission: 'active',
            },
          ],
          data: {
            user: userId,
          },
        },
      ],
    },
    {
      blocksBehind: 3,
      expireSeconds: 30,
    },
  );
};

const logRecord = (accountName, productId, description) => {
  return api.transact(
    {
      actions: [
        {
          account: 'productloger',
          name: 'logrecord',
          authorization: [
            {
              actor: accountName,
              permission: 'active',
            },
          ],
          data: {
            logger: accountName,
            product_id: productId,
            description: description,
          },
        },
      ],
    },
    {
      blocksBehind: 3,
      expireSeconds: 30,
    },
  );
};

const logProduct = (accountName, productName, description, productTab) => {
  return api.transact(
    {
      actions: [
        {
          account: 'productloger',
          name: 'logproduct',
          authorization: [
            {
              actor: accountName,
              permission: 'active',
            },
          ],
          data: {
            logger: accountName,
            product_name: productName,
            description: description,
            product_tag: productTab,
          },
        },
      ],
    },
    {
      blocksBehind: 3,
      expireSeconds: 30,
    },
  );
};

export {
  rpc,
  api,
  setSignatureProvider,
  getTableRows,
  logRecord,
  logProduct,
  addManager,
  addUser,
  removeUser,
};
