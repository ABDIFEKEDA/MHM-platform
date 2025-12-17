const  { createDoctor, getAllDoctors }=  require( "../models/doctorModel")

exports.createDoctor = async(req, res)=>{
    try {
        const id =  await createDoctor(req.body);
        res.status(201).json({msg: "Doctors Created successfully !", id});
        
    } catch (error) {
        res.status(400).json({msg: "Error Creating Doctor !",Error:error.message})
        
    }
}
exports.getDoctors = async(req,res)=>{
    try {
        const doctors = await getAllDoctors();
        res.json(doctors || []);
        
    } catch (error) {
        res.status(500).json({msg :"server Error",error:error.message});
        
    }
}