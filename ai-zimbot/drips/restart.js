zimbot.create(async (m, {
      client,
      Func
   }) => {
      await client.reply(m.chat, Func.texted('bold', 'Restarting . . .'), m).then(async () => {
         await props.save()
         process.send('reset')
      })
   },{
   usage: ['restart'],
   category: 'owner',
   owner: true
}, __filename)