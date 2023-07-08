const { async } = require('regenerator-runtime');
const Login = require('../models/LoginModel');

exports.index = (req, res) => {
   res.render('login');
};

exports.register = async function(req, res) {
    try { 
        const login = new Login(req.body);
        await login.register();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function() {
                return res.redirect('back');
            });
            return;
        }

        req.flash('success', 'Your user has been successfully created.');
        req.session.save(function() {
            return res.redirect('back');
        });
    
        return res.send(login.errors);
    } catch(e) {
        console.log(e);
        return res.render('404');
    }
};

exports.login = async function(req, res) {

};