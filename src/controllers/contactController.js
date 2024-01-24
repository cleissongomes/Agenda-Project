const { async } = require('regenerator-runtime');
const Contact = require('../models/ContactModel');

exports.index = (req, res) => {
  res.render('contact', {
    contact: {},
  });
};

exports.register = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.register();

    if (contact.errors.length > 0) {
      req.flash('errors', contact.errors);
      req.session.save(() => res.redirect('/contact/index'));
      return;
    }

    req.flash('success', 'Contact successfully registered.');
    req.session.save(() =>
      res.redirect(`/contact/index${contact.contact._id}`)
    );
    return;
  } catch (e) {
    console.log(e);
    return res.render('');
  }
};

exports.editIndex = async (req, res) => {
  if (!req.params.id) return res.render('404');

  const contact = new Contact();
  await contact.searchById(req.params.id);

  if (!contact) return res.render('404');

  res.render('contact', { contact });
};

exports.edit = async function (req, res) {
  try {
    if (!req.params.id) return res.render('404');
    const contact = new Contact(req.body);
    await contact.edit(req.params.id);

    if (contact.errors.length > 0) {
      req.flash('errors', contact.errors);
      req.session.save(() => res.redirect('/contact/index'));
      return;
    }

    req.flash('success', 'Contact successfully edited.');
    req.session.save(() =>
      res.redirect(`/contact/index${contact.contact._id}`)
    );
    return;
  } catch (e) {
    console.log(e);
    res.render('404');
  }
};
