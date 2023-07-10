const express = require('express');
const bodyParser = require('body-parser');
const Ticket = require('./models/ticket');

const app = express();
app.use(bodyParser.json());

app.post('/api/tickets', (req, res) => {
  const { subject, description, status } = req.body;
  const ticket = new Ticket({ subject, description, status });

  ticket.save((err, savedTicket) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'An error occurred while creating the ticket.' });
    }
    res.status(201).json(savedTicket);
  });
});

app.get('/api/tickets', (req, res) => {
  Ticket.find({}, (err, tickets) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'An error occurred while retrieving the tickets.' });
    }
    res.json(tickets);
  });
});

app.get('/api/tickets/:id', (req, res) => {
  const ticketId = req.params.id;
  Ticket.findById(ticketId, (err, ticket) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'An error occurred while retrieving the ticket.' });
    }
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found.' });
    }
    res.json(ticket);
  });
});

app.put('/api/tickets/:id', (req, res) => {
  const ticketId = req.params.id;
  const { subject, description, status } = req.body;

  Ticket.findByIdAndUpdate(
    ticketId,
    { $set: { subject, description, status } },
    { new: true },
    (err, updatedTicket) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while updating the ticket.' });
      }
      if (!updatedTicket) {
        return res.status(404).json({ error: 'Ticket not found.' });
      }
      res.json(updatedTicket);
    }
  );
});

app.delete('/api/tickets/:id', (req, res) => {
  const ticketId = req.params.id;
  Ticket.findByIdAndRemove(ticketId, (err, deletedTicket) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'An error occurred while deleting the ticket.' });
    }
    if (!deletedTicket) {
      return res.status(404).json({ error: 'Ticket not found.' });
    }
    res.sendStatus(204);
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
