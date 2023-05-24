//import student and interview model
const Student = require('../models/student');
const Interview = require('../models/interview');

//controller function for creating student data
module.exports.create = async function (req, res) {
    try {
        // Create a new student object using the provided form data
        let student = await Student.create({
            batch: req.body.batch,
            name: req.body.name,
            email: req.body.email,
            college: req.body.college,
            status: req.body.status,
            dsa_score: req.body.dsa_score,
            webd_score: req.body.webd_score,
            react_score: req.body.react_score,
            user: req.user._id
        });

        // Save the student object to the database
        await student.save();

        // res.status(201).json({ message: 'Student created successfully.' });
        return res.redirect('back');
    } catch (err) {
        console.log("Error in creating student", err)
    };
};

module.exports.destroy = async function (req, res) {
    try {
      let student = await Student.findById(req.params.id)
      if (student.user == req.user.id) {
  
        student.deleteOne();

        await Interview.deleteMany({ student: req.params.id });

        return res.redirect("back");
  
      }
    } catch (error) {
      console.error(error);
      return res.redirect("back");
    }
  };