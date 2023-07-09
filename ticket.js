const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['Open', 'In Progress', 'Closed'], default: 'Open' },
  internId: { type: mongoose.Schema.Types.ObjectId, ref: 'Intern', required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'HR', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
