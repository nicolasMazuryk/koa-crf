/**
 * Created by supervlad on 12/7/16.
 */

import mongoose from 'mongoose'

const Schema = mongoose.Schema

const Research = new Schema({

  name: { type: String, required: true },
  date_start: { type: Date, default: Date.now() },
  date_end: Date,
  clinics: { type: [Schema.Types.ObjectId], default: [] }

})

export default mongoose.model('Research', Research)