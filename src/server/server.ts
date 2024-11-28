import fastify from 'fastify'
import { createTask } from '../functions/task/create'
import z from 'zod'
import { weekPendingTask } from '../functions/task/week_pending'



const app = fastify()


app.get('/pending-task', async () => {

  const {getTaskPeding} = await weekPendingTask()

  return getTaskPeding
})



app.post('/task', async (request) => {
  
  const createTaskSchema = z.object({
    title: z.string(),
    desiredWeeklyFrequency: z.number().int().min(1).max(7),
  })

  const body = createTaskSchema.parse(request.body)

  await createTask({
    title: body.title,
    desiredWeeklyFrequency: body.desiredWeeklyFrequency
  })
})

app
  .listen({
    port: 9090,
  })
  .then(() => {
    console.log('Server run port 9090')
  })

  