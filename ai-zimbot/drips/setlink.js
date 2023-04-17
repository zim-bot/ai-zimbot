zimbot.create(async (m, {
      client,
      args,
      prefix,
      command,
      Func
   }) => {
      try {
         let setting = global.db.setting
         if (!text) return client.reply(m.chat, Func.example(prefix, command, global.db.setting.link), m)
         const isUrl = Func.isUrl(text)
         if (!isUrl) return client.reply(m.chat, Func.texted('bold', `*🖥️url is invalid okay.*`), m)
         setting.link = text
         client.reply(m.chat, Func.texted('bold', `*🖥️ Link successfully set.*`), m)
      } catch (e) {
         client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },{
   usage: ['setlink'],
   use: 'url',
   category: 'owner',
   owner: true,
   cache: true,
   
}, __filename)