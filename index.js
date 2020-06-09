const server = require('./src/server')
const db = require('./src/lib/db')
const cors = require('cors')

server.use(cors())

// connection Port
const PORT = process.env.PORT || 8080

async function main () {
  await db.connect()
  console.log('DataBase is connected')
  server.listen(PORT, () => {
    console.log('Server is running')
  })
}

main()
  .then(() => console.log('Server Ready'))
  .catch(e => console.log('error:', e))
