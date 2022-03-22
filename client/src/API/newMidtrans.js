import { MidtransClient } from 'midtrans-node-client';


export let apiClient = new MidtransClient.Snap({
  isProduction : false,
  serverKey : process.env.REACT_APP_AUTHORIZATION,
  clientKey : process.env.REACT_APP_CLIENT_KEY
});