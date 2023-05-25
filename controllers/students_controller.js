//import student and interview model
const Student = require('../models/student');
const Interview = require('../models/interview');

//importing json2csv package in const
const CsvParser = require('json2csv').Parser;

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

module.exports.download = async function (req, res) {
  try {
    let students = [];

    let studentData = await Student.find({})
    .populate('interviews', 'company interview_date result')

    studentData.forEach((student) => {
      const { name, batch, email, college, status, dsa_score, webd_score, react_score, interviews} = student;
      students.push({ name, batch, email, college, status, dsa_score, webd_score, react_score, interviews});
    });

    
    const csvFields = ['Name', 'Batch', 'Email', 'College', 'Status', 'Dsa_score', 'Webd_score', 'React_score', 'Interviews'];
    const csvParser = new CsvParser({ csvFields });
    const csvData = csvParser.parse(students);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=studentsData.csv");

    res.status(200).end(csvData);


  } catch (err) {
    console.log("Error in downloading the data", err);
  }
};