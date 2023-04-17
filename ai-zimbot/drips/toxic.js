zimbot.create(async (m, {
      client,
      args,
      prefix,
      command,
      Func
   }) => {
      try {
         if (command == '+toxic') {
            if (!args || !args[0]) return client.reply(m.chat, Func.example(prefix, command, 'fuck'), m)
            if (global.db.setting.toxic.includes(args[0])) return client.reply(m.chat, Func.texted('bold', `🖥 '${args[0]}' already in the database.`), m)
            global.db.setting.toxic.push(args[0])
            global.db.setting.toxic.sort(function(a, b) {
               if (a < b) {
                  return -1;
               }
               if (a > b) {
                  return 1;
               }
               return 0
            })
            client.reply(m.chat, Func.texted('bold', `⚙️ '${args[0]}' added successfully!`), m)
         } else if (command == '-toxic') {
            if (!args || !args[0]) return client.reply(m.chat, Func.example(prefix, command, 'fuck'), m)
            if (global.db.setting.toxic.length < 2) return client.reply(m.chat, Func.texted('bold', `🔩 Sorry, you can't remove more.`), m)
            if (!global.db.setting.toxic.includes(args[0])) return client.reply(m.chat, Func.texted('bold', `🔩 '${args[0]}' not in database.`), m)
            global.db.setting.toxic.forEach((data, index) => {
               if (data === args[0]) global.db.setting.toxic.splice(index, 1)
            })
            client.reply(m.chat, Func.texted('bold', `⚙️ '${args[0]}' has been removed.`), m)
         }
      } catch (e) {
         console.log(e)
         return client.reply(m.chat, global.status.error, m)
      }
   },{
   usage: ['+toxicword','-toxicword'],
   use: 'word',
   category: 'owner',
   error: false,
   owner: true,
   cache: true
}, __filename)