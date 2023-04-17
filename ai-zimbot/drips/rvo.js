zimbot.create(async (m, {
      client
   }) => {
      try {
         if (!m.quoted) return client.reply(m.chat, Func.texted('bold', `⚙️🚶‍Reply view once message to use this command.`), m)
         if (m.quoted.message) {
            let type = Object.keys(m.quoted.message)[0]
            let q = m.quoted.message[type]
            let media = await client.downloadMediaMessage(q)
            if (/video/.test(type)) {
               return await client.sendFile(m.chat, media, '', q.caption || '', m)
            } else if (/image/.test(type)) {
               return await client.sendFile(m.chat, media, '', q.caption || '', m)
            }
         } else client.reply(m.chat, Func.texted('bold', `Stress ??`), m)
      } catch (e) {
         console.log(e)
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },{
   usage: ['retrieve'],
   use: 'reply viewonce',
   category: 'menu',
   error: false,
   group: true
}, __filename)