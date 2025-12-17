const  { createDoctor }=  require( "../models/doctorModel")

exports.createDoctor = async(req, res)=>{
    try {
        const id =  await createDoctor(req.body);
        res.status(201).json({msg: "Doctors Created successfully !", id});
        
    } catch (error) {
        res.status(400).json({msg: "Error Creating Doctor !",Error:error.message})
        
    }
}