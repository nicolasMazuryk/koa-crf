/**
 * Created by supervlad on 12/11/16.
 */

import Clinic from '../models/clinic'
import Research from '../models/research'
import Patient from '../models/patient'

export const getClinics = async (ctx) => {
  try {
    const { rid } = ctx.params
    const { clinics: ids } = await Research.findById(rid)
    const clinics = await Clinic.find({_id: { $in: ids }})
    ctx.body = { payload: clinics }
  }
  catch (error) {
    ctx.throw(error)
  }
}

export const getClinic = async (ctx) => {
  try {
    const clinic = await Clinic.findById(ctx.params.cid)
    ctx.body = { payload: clinic }
  }
  catch (error) {
    ctx.throw(error)
  }
}

export const postClinic = async (ctx) => {
  try {
    const { rid } = ctx.params
    const newClinic = new Clinic({...ctx.request.body, researchId: rid })
    const created = await newClinic.save()
    await Research.findOneAndUpdate({ _id: rid }, { $push: { clinics: created._id } })
    ctx.body = { payload: created }
  }
  catch (error) {
    ctx.throw(error)
  }
}

export const deleteClinic = async (ctx) => {
  try {
    const { cid } = ctx.params
    const deleted = await Promise.all([
      Clinic.remove({ _id: cid }),
      Patient.remove({ clinicId: cid })
    ])
    ctx.body = { payload: deleted ? true : deleted }
  }
  catch (error) {
    ctx.throw(error)
  }
}
