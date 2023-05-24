//import student and interview model
const Interview = require('../models/interview');
const Student = require('../models/student');

//controller function for creating interview data
module.exports.create = async function (req, res) {
    try {
        // find student object using findbyid and if student exists append the interview call
        let student = await Student.findById(req.body.student)
        if (student) {
            let interview = await Interview.create({
                company: req.body.company,
                interview_date: req.body.interview_date,
                result: req.body.result,
                student: req.body.student,
                user: req.user._id
            })

            //appending interview 
            student.interviews.push(interview);
            student.save();

        };
        return res.redirect('back');
    } catch (err) {
        console.log("Error in creating student", err)
    };
};
