/**
 * Created by supervlad on 1/12/17.
 */

import Patient from '../models/patient'

export const getPatients = async (ctx) => {
  try {
    const user = ctx.state.user
    if (user && user.role === 'doctor' && user.clinicId === ctx.params.cid) {
      const patients = await Patient.find({ doctorId: user.id })
      ctx.body = { payload: patients }
    }
    else {
      const patients = await Patient.find({})
      ctx.body = { payload: patients }
    }
  }
  catch (error) {
    ctx.throw(error)
  }
}

export const getPatient = async (ctx) => {
  try {
    const pid = ctx.params.pid
    const patient = await Patient.findById(pid)
    ctx.body = { payload: patient }
  }
  catch (error) {
    ctx.throw(error)
  }
}

export const postPatient = async (ctx) => {
  try {
    const patient = new Patient({...ctx.request.body, clinicId: ctx.params.cid})
    const created = await patient.save()
    ctx.body = { payload: created }
  }
  catch (error) {
    ctx.throw(error)
  }
}

export const putPatient = async (ctx) => {
  try {
    const { params, request } = ctx
    const updated = await Patient.findByIdAndUpdate(params.pid, request.body, { new: true })
    ctx.body = { payload: updated }
  }
  catch (error) {
    ctx.throw(error)
  }
}

export const deletePatient = async (ctx) => {
  try {
    const pid = ctx.params.pid
    const removed = await Patient.findByIdAndRemove(pid)
    ctx.body = { payload: removed ? true : removed }
  }
  catch (error) {
    ctx.throw(error)
  }
}
