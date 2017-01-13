/**
 * Created by supervlad on 12/13/16.
 */

import Research from '../models/research'

export const getResearches = async (ctx) => {
  try {
    const researches = await Research.find()
    ctx.body = { payload: researches }
  }
  catch (error) {
    ctx.throw(error)
  }
}

export const getResearch = async (ctx) => {
  try {
    const id = ctx.params.rid
    const research = await Research.findById(id)
    ctx.body = { payload: research }
  }
  catch (error) {
    ctx.throw(error)
  }
}

export const postResearch = async (ctx) => {
  try {
    const newResearch = new Research(ctx.request.body)
    await newResearch.save()
    ctx.body = { payload: newResearch }
  }
  catch (error) {
    ctx.throw(error)
  }
}

export const deleteResearch = async (ctx) => {
  try {
    const id = ctx.params.rid
    const removed = await Research.findByIdAndRemove(id)
    ctx.body = { payload: removed ? true : removed }
  }
  catch (error) {
    ctx.throw(error)
  }
}
