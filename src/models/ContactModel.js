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
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    cleanUp() {
        for(const key in this.body) {
            if(typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            name: this.body.name,
            surname: this.body.surname,
            email: this.body.email,
            telephone: this.body.telephone 
        };
    }
}

module.exports = Contact;