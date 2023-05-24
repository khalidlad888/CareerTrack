const User = require('../models/user');
const Student = require('../models/student');
const Interview = require('../models/interview');

module.exports.home = async function (req, res) {
    try{
        let students = await Student.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'interviews',
            options: { sort: { createdAt: -1 } },
            populate: [
                { path: 'user' }
            ]
        })

        let users = await User.find({});

        return res.render('home', {
            title: " | Home",
            students:  students,
            all_users: users
        });
    }catch (err){
        console.log('Error', err);
    };
};