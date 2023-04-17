zimbot.create(async (m, {
      client,
      text
   }) => {
      let number = m.quoted ? (m.quoted.sender).split`@` [0] : (m.sender).split`@` [0]
      let chat = text ? text : 'wadii'
      client.reply(m.chat, `https://wa.me/${number}?text=${encodeURI(chat)}`, m)
   },{
   usage: ['wame'],
   category: 'menu',
   error: false
}, __filename)