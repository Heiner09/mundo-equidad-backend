const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    vacancyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vacancy',
      required: true,
    },
    personaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    personalData: {
      fullName: String,
      email: String,
      phone: String,
    },
    cvSource: {
      type: String,
      enum: ['uploaded', 'system'],
      default: 'system',
    },
    cvUrl: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Application', applicationSchema);
