const { async } = require('regenerator-runtime');
const Contact = require('../models/ContactModel');

exports.index = (req, res) => {
    res.render('contact');
};

exports.register = async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.register();

        if(contact.errors.length > 0) {
            req.flash('errors', contact.errors);
            req.session.save(() => res.redirect('/contact/index'));
            return;
        }
    
        req.flash('success', 'Contact successfully registered.');
        req.session.save(() => res.redirect(`/contact/index${contact.contact._id}`));
        return;
    } catch(e) {
        console.log(e);
        return res.render('');
    }
};

exports.editIndex = (req, res) => {
    if(!req.params.id) return res.render('404');
    res.render('contact');
    };
