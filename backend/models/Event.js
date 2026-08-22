const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: [
        'Tech & Coding',
        'Cultural & Arts',
        'Sports & Fitness',
        'Workshops & Training',
        'Seminars & Talks',
        'Gaming & E-Sports',
        'Networking',
        'Other',
      ],
      default: 'Tech & Coding',
    },
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    venue: { type: String, required: true },
    locationType: { type: String, enum: ['In-Person', 'Online', 'Hybrid'], default: 'In-Person' },
    maxCapacity: { type: Number, required: true, min: 1 },
    registeredCount: { type: Number, default: 0 },
    bannerUrl: { type: String, default: '' },
    registrationDeadline: { type: String, required: true },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String, default: '' },
    status: {
      type: String,
      enum: ['Draft', 'Published', 'Ongoing', 'Completed', 'Cancelled'],
      default: 'Published',
    },
    organizerId: { type: String, required: true, index: true },
    organizerName: { type: String, required: true },
    tags: [{ type: String }],
    price: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Event || mongoose.model('Event', eventSchema);
