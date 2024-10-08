import fastify from 'fastify'

const app = fastify()

app
  .listen({
    port: 9090,
  })
  .then(() => {
    console.log('Server run port 9090')
  })

  