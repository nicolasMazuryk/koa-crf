/**
 * Created by supervlad on 12/7/16.
 */

import mongoose from 'mongoose'

const Schema = mongoose.Schema

const Clinic = new Schema({

  name: { type: String, required: true },
  address: { type: String },
  doctors: { type: [Schema.Types.ObjectId], default: [] }

})

export default mongoose.model('Clinic', Clinic)