const NetworkSpeed = require('network-speed')
const test = new NetworkSpeed()
const { tmpdir } = require('os')
zimbot.create(async (m, {
      client
   }) => {
      let old = new Date()
      let download = await getNetworkDownloadSpeed()
      async function getNetworkDownloadSpeed() {
         const baseUrl = 'https://eu.httpbin.org/stream-bytes/500000'
         const fileSizeInBytes = 500000
         const speed = await test.checkDownloadSpeed(baseUrl, fileSizeInBytes)
         return speed
      }
      let upload = await getNetworkUploadSpeed()
      async function getNetworkUploadSpeed() {
         const options = {
            hostname: 'www.google.com',
            port: 80,
            path: tmpdir(),
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            }
         }
         const fileSizeInBytes = 2000000
         const speed = await test.checkUploadSpeed(options, fileSizeInBytes)
         return speed
      }
      let text = '🖥*ᴅᴏᴡɴʟᴏᴀᴅ🔐* : ' + download.mbps + ' mbps\n'
      text += '🖥*ᴜᴘʟᴏᴀᴅ⏲️* : ' + upload.mbps + ' mbps\n'
      text += '🖥*ʀᴇsᴘᴏɴsᴇ📟* : ' + ((new Date - old) * 1) + ' ms'
      client.reply(m.chat, text, m)
   },{
   usage: ['ping'],
   hidden: ['p'],
   category: 'menu',
   error: false,
   cache: true
}, __filename)