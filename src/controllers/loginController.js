const { async } = require('regenerator-runtime');
const Login = require('../models/LoginModel');

exports.index = (req, res) => {
    if(req.session.user) return res.render('login-logado');
    return res.render('login');
};

exports.register = async function(req, res) {
    try { 
        const login = new Login(req.body);
        await login.register();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function() {
                return res.redirect('/login/index');
            });
            return;
        }
        req.flash('success', 'Your user has been successfully created.');
        req.session.save(function() {
            return res.redirect('/login/index');
        });
        return;

    }   catch(e) {
        console.log(e);
        return res.render('404');
    }
};

exports.login = async function(req, res) {
    try { 
        const login = new Login(req.body);
        await login.login();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function() {
                return res.redirect('/login/index');
            });
            return;
        }

        req.flash('success', 'You have entered the system.');
        req.session.user = login.user;
        req.session.save(function() {
            return res.redirect('/login/index');
        });
    } catch(e) {
        console.log(e);
        return res.render('404');
    }
};

exports.logout = async function(req, res) {
    req.session.destroy();
    req.redirect('/');
};