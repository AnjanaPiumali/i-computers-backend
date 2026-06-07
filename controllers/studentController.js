import Student from "../models/Student.js";

// export function getAllStudents(req , res) {
//     Student.find().then((students) => {
//         console.log(students);
//         res.json(students);
//     });
// };


export async function getAllStudents (req,res) {
    try {
        const students = await Student.find();
        res.json(students);

    } catch (error) {
        console.error("Enter fetching students:", error)
        return res.json({ message: "Internal server Error" })
    }
    
} 


export function createStudent(req, res) {
    if(isAdmin(req)){
        const student = new Student(req.body);

        student.save().then(()=>{
            res.json({message:"Student Create Successfully"})
        });
    }else {
        res.status(403).json({message:"You need to loging as an admin to create a student"});
    }

}

