import dayjs from 'dayjs'
import { db } from '../../db'
import { taskCompletions, tasks } from '../../db/schema'
import { and, count, eq, gte, lte, sql } from 'drizzle-orm'
import { title } from 'process'

export async function weekPendingTask() {
  const lastDayWeek = dayjs().endOf('week').toDate()
  const fristDayWeek = dayjs().startOf('week').toDate()

  const createUpToWeek = db
    .$with('create_up_to_week')
    .as(db.select().from(tasks).where(lte(tasks.createdAt, lastDayWeek)))

  const taskCompletionsCounts = db.$with('task_completions_counts').as(
    db
      .select({
        taskId: taskCompletions.taskId,
        completionCount: count(taskCompletions.id).as('completionCount'),
      })
      .from(taskCompletions)
      .where(
        and(
          gte(taskCompletions.createdAt, fristDayWeek),
          lte(taskCompletions.createdAt, lastDayWeek)
        )
      )
      .groupBy(taskCompletions.taskId)
  )

  const getTaskPeding = await db
    .with(createUpToWeek, taskCompletionsCounts)
    .select({
      id: createUpToWeek.id,
      title: createUpToWeek.title,
      desiredWeeklyFrequency: createUpToWeek.desiredWeeklyFrequency,
      completionCount: sql` COALESCE(${taskCompletionsCounts.completionCount},0)`.mapWith(Number) 

    })
    .from(createUpToWeek)
    .leftJoin(taskCompletionsCounts, eq(taskCompletionsCounts.taskId,createUpToWeek.id))

  return  {getTaskPeding}
}
