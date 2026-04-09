const mongoose = require('mongoose');

const cvSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    personalData: {
      fullName: String,
      phone: String,
      location: String,
      summary: String,
    },
    laboralProfile: [
      {
        company: String,
        position: String,
        startDate: Date,
        endDate: Date,
        description: String,
      },
    ],
    education: [
      {
        institution: String,
        degree: String,
        field: String,
        endDate: Date,
      },
    ],
    references: [
      {
        name: String,
        position: String,
        contact: String,
      },
    ],
    pdfUrl: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('CV', cvSchema);
