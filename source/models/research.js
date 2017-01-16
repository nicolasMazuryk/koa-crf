/**
 * Created by supervlad on 12/7/16.
 */

import mongoose from 'mongoose'

const Schema = mongoose.Schema

const Research = new Schema({

  name: { type: String, required: true },
  dateStart: { type: Date, default: Date.now() },
  dateEnd: { type: Date, default: null },
  clinics: [Schema.Types.ObjectId]

})

export default mongoose.model('Research', Research)
