'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
let contacts = require('./data');

app.get('/api/contacts', (request, response) => {
    if (!contacts) {
        response.status(404).json({ message: 'No contacts found.' });
      }
   response.json(contacts);
});

app.get('/api/contacts/:id', (request, response) => {

    let contactId = request.params.id;
  
    let contact = contacts.filter(contact => {
      return contact.id == contactId;
    });
  
    if (!contact) {
      response.status(404).json({ message: 'Contact not found' });
    }
  
    response.json(contact[0]);
  });

  app.post('/api/contacts', (request, response) => {

    let contact = {
      id: contacts.length + 1,
      first_name: request.body.first_name,
      last_name: request.body.last_name,
      email: request.body.email,
      website: request.body.website
    };
  
    contacts.push(contact);
  
    response.json(contact);
  
  });

const hostname = 'localhost';
const port = 3001;

app.listen(port, hostname, () => {
    console.log('Server is running at http://${hostname}:${port}');
});