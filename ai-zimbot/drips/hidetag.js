zimbot.create(async (m, {
      client,
      text,
      participants
   }) => {
      let users = participants.map(u => u.id)
      await client.reply(m.chat, text, null, {
         mentions: users
      })
   },{
   usage: ['hidetag'],
   use: 'text',
   category: 'menu',
   admin: true,
   group: true,
   premium: true
}, __filename)