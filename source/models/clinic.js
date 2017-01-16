/**
 * Created by supervlad on 12/7/16.
 */

import mongoose from 'mongoose'

const Schema = mongoose.Schema

const Clinic = new Schema({

  name: { type: String, required: true },
  address: { type: String },
  researchId: { type: Schema.Types.ObjectId, required: true },
  doctors: [Schema.Types.ObjectId]

})

export default mongoose.model('Clinic', Clinic)
