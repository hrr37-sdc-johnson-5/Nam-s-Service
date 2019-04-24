var cassandra = require('cassandra-driver')
var client = new cassandra.Client({ contactPoints: ['127.0.0.1'], 'localDataCenter':"datacenter1", keyspace: 'media_player' })

client.execute('select key from system.local', function (err, result) {
  if (err) throw err
  console.log(result.rows[0])
})

module.exports = client;