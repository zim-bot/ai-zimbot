zimbot.create(async (m, {
      client,
      isBotAdmin
   }) => {
      if (!m.quoted) return
      client.sendMessage(m.chat, {
         delete: {
            remoteJid: m.chat,
            fromMe: isBotAdmin ? false : true,
            id: m.quoted.id,
            participant: m.quoted.sender
         }
      })
   },{
   usage: ['delete'],
   hidden: ['del'],
   use: 'reply chat',
   category: 'menu',
   error: false,
   group: false
}, __filename)