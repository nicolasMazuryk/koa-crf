/**
 * Created by supervlad on 12/7/16.
 */

import mongoose from 'mongoose'

const Schema = mongoose.Schema

const Patient = new Schema({

  doctorId: { type: String, required: true },
  dateOfBirth: { type: Date, default: null },
  weight: { type: Array, default: 0 },
  visits: { type: Array, default: [] },
  sideEffects: { type: Array, default: [] },
  therapy: { type: Array, default: [] },
  anamnesis: { type: Array, default: [] }

})

export default mongoose.model('Research', Patient)