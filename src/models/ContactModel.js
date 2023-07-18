const mongoose = require('mongoose');
const { async } = require('regenerator-runtime');
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
        this.contact = null;
    }

    async register(){
        this.validate();
        if(this.errors.length > 0) return;
        this.contact = await ContactModel.create(this.body);
    }

    validate() {
        this.cleanUp();
        if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Invalid email address.');
        if(!this.body.name) this.errors.push('Name is a required field.');
        if(!this.body.email && !this.body.telephone) { 
            this.errors.push('At least one contact needs to be sent: email or phone.');
        }
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