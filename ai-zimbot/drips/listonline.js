zimbot.create(async (m, {
      client
   }) => {
      let online = [...Object.keys(store.presences[m.chat])]
      client.reply(m.chat, online.map(v => '⍮  @' + v.replace(/@.+/, '')).join('\n'), m)
   },{
   usage: ['listonline'],
   hidden: ['here'],
   category: 'menu',
   error: false,
   group: true
}, __filename)