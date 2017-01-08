/**
 * Created by supervlad on 12/7/16.
 */

import mongoose from 'mongoose'

const Schema = mongoose.Schema

const Research = new Schema({

  clinic_id: { type: String, required: true },
  date_of_birth: { type: Date, default: null },
  weight: { type: Array, default: 0 },
  visits: { type: Array, default: [] },
  side_effects: { type: Array, default: [] },
  therapy: { type: Array, default: [] },
  anamnesis: { type: Array, default: [] }

})

export default mongoose.model('Research', Research)