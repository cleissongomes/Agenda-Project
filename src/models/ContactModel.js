const mongoose = require('mongoose');
const validator = require('validator');

const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    telephone: { type: String, required: false, default: '' },
    date: { type: Date, default: Date.now },
});


const ContactModel = mongoose.model('Contact', ContactSchema);

class Contact {


}

module.exports = Contact;