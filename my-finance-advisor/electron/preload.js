const { contextBridge, ipcRenderer } = require('electron')

// These are registered channels that are allow to talk to main process.
const sendChannels = [
  'api:getToken',
  'api:getAccountsByUser',
  'api:updateAccount'
];

// Exposes electron API to client.
contextBridge.exposeInMainWorld('electronApi', {
  send: (channel, data) => {
    if (sendChannels.includes(channel)) {
      return ipcRenderer.invoke(channel, data);
    }
    else
    {
      console.warn(`'${channel}' is not a valid channel.`);
    }
  }
});