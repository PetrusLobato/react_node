import { db } from "../../db";
import { tasks } from "../../db/schema";
import type ITask from "../../interface";



export async function createTask ({title, desiredWeeklyFrequency}: ITask){

    const result = await db.insert(tasks).values({
        title,
        desiredWeeklyFrequency
    }).returning() 

    const t = result[0]

    return t


}