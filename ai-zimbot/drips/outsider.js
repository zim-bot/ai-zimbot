zimbot.create(async (m, {
      client,
      args,
      prefix,
      command,
      participants
   }) => {
      try {
         let member = participants.filter(v => !v.admin).map(v => v.id).filter(v => !v.startsWith('263') && v != client.decodeJid(client.user.id))
         if (!args || !args[0]) {
            if (member.length == 0) return client.reply(m.chat, Func.texted('bold', `🫶 This group is clean from outsiders.`), m)
            let teks = `✅ *${member.length}* outsiders found, send *${isPrefix + command} -y* to remove them.\n\n`
            teks += member.map(v => '◦  @' + v.replace(/@.+/, '')).join('\n')
            client.reply(m.chat, teks, m)
         } else if (args[0] == '-y') {
            for (let jid of member) {
               await Func.delay(2000)
               await client.groupParticipantsUpdate(m.chat, [jid], 'remove')
            }
            await client.reply(m.chat, Func.texted('bold', `✅️ Done, ${member.length} outsiders successfully removed.`), m)
         }
      } catch (e) {
         client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },{
   usage: ['outsider'],
   use: '(option)',
   category: 'menu',
   admin: true,
   group: true,
   botAdmin: true
}, __filename)