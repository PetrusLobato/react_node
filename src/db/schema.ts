import { createId } from '@paralleldrive/cuid2'
import { pgTable, text, integer, timestamp } from 'drizzle-orm/pg-core'

export const tasks = pgTable('tasks', {
  id: text('id').primaryKey().$default(()=> createId()),

  title: text('title').notNull(),

  desiredWeeklyFrequency: integer('desird_weekly_frequency').notNull(),

  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
})

export const taskCompletions = pgTable('task_completions', {
  id: text('id').primaryKey().$default(()=> createId()),

  taskId: text('task_id')
    .references(() => tasks.id)
    .notNull(),

  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
})
