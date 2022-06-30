const { contextBridge, ipcRenderer } = require('electron')

  const sendChannels = [
    'api:getToken'
  ];

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