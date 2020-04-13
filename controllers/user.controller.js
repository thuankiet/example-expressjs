const db = require('../db');
const shortid = require('shortid'); // tạo short-id

module.exports.index = (req, res) => res.render('users/index', {
    users: db.get('users').value()
});
// Vì file user.route là root path ('/') nên ta đặt là index cho file controller 

module.exports.search = (req, res) => {
    var q = req.query.q;
    var matchUsers = db.get('users').value().filter(user => {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) > -1;
    });
    res.render('users/index', {
        users: matchUsers
    });
};

module.exports.create = (req, res) => {
    res.render('users/create');
};

module.exports.get = (req, res) => {
    var id = req.params.id;
    var user = db.get('users').find({id: id}).value();
    res.render('users/view', {
        user: user
    });
};

module.exports.postCreate = (req, res) => {
    req.body.id = shortid.generate();
    var errors = [];

    if(!req.body.name) {
        errors.push('Name is required.')
    }

    if(!req.body.phone) {
        errors.push('Phone is required.')
    }

    if(errors.length) {
        res.render('users/create', {
            errors: errors,
            values: req.body // Khi tạo bị lỗi, phần đã nhập vào không bị mất đi
        });
        return; 
    }

    db.get('users').push(req.body).write();
    res.redirect('/users');  
};