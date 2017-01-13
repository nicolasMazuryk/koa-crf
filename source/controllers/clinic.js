/**
 * Created by supervlad on 12/11/16.
 */

import Clinic from '../models/clinic'
import Research from '../models/research'

export const getClinics = async (ctx) => {
  try {
    const rid = ctx.params.rid
    const { clinics: ids } = await Research.findById(rid, 'clinics')
    const clinics = await Clinic.find().where('_id').in(ids)
    ctx.body = { payload: clinics }
  }
  catch (error) {
    ctx.throw(error)
  }
}

export const postClinic = async (ctx) => {
  try {
    const id = ctx.params.rid
    const newClinic = new Clinic(ctx.request.body)
    await Promise.all([
      Research.findByIdAndUpdate(id, { $push: { clinics: newClinic._id } }),
      newClinic.save()
    ])
    ctx.body = { payload: newClinic }
  }
  catch (error) {
    ctx.throw(error)
  }
}

export const deleteClinic = async (ctx) => {
  try {
    const { rid, cid } = ctx.params
    const [deleted] = await Promise.all([
      Clinic.findByIdAndRemove(cid),
      Research.findByIdAndUpdate(rid, {$pull: {clinics: cid}})
    ])
    ctx.body = { payload: deleted ? true : deleted }
  }
  catch (error) {
    ctx.throw(error)
  }
}
