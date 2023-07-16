const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    Telephone: { type: String, required: true }
});


const ContactModel = mongoose.model('Contact', ContactSchema);

class Contact {


}

module.exports = Contact;