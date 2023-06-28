const mongoose = require('mongoose');
const validator = require('validator');

const LoginSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    valida() {
        this.cleanUp();
        if(!validator.isEmail(this.body.email)) this.error.push('Invalid email address.');
        if(this.body.password.length < 3 || this.body.password.length > 50 ) {
            this.errors.push('Invalid Password: Password must be between 3 and 50 characters long.')
        }
    }

    cleanUp() {
        for(const key in this.body) {
            if(typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            email: this.body.email,
            password: this.body.password 
        };
    }
};

module.exports = Login;