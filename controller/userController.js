// import model

const users =require('../model/userSchema')


// logic to resolve client request

// register
exports.register = async(req,res)=>{
    console.log(req.file);
    //  get other input from req body

    const file = req.file.filename
    const {fname,lname,email,mobile,gender,status,location} = req.body
    if(!fname || !lname || !email || !mobile || !gender || !status || !location || !file){
        res.status(403).json("All inputs are required")
    }
    try{
        // check existing employee
        const preuser = await users.findOne({email})
        if(preuser){
            res.status(406).json('Employee Already Exist');
        }
        else{
            const newUser = new users({
                fname,lname,email,mobile,gender,status,profile:file,location
            })
            // save in db
            await newUser.save()
            res.status(200).json(newUser)
        }
    }
    catch(error){
        res.status(401).json(error)
    }
}

// get all users

exports.getusers = async(req,res)=>{
    // get search query from request
    const search = req.query.search
    const query={
        fname:{$regex:search,$options:"i"}
    }
    try{
       const allusers= await users.find(query)
       res.status(200).json(allusers)

    }
    catch(error){
        res.status(401).json(error)
    }
}

// view profile
 exports.viewprofile = async(req,res)=>{
    // get params from req
    const {id} = req.params
    // get details for user having the given id
    try{
        const preuser = await users.findOne({_id:id})
        res.status(200).json(preuser)
    }
    catch(error){
        res.status(401).json("employee doesnot exist")
    }

 }
 

//  deletetUser
exports.deletetUser= async(req,res)=>{
    // get id from req 
    const {id}=req.params

   try{
     // remove details for the user given id
     const removeItem = await users.findByIdAndDelete({_id:id})
     res.status(200).json(removeItem)
   }
   catch(error){
    res.status(401).json(error)
   }

}
// editUser
exports.editUser = async(req,res)=>{
    // get values from request
    const {id}= req.params
    const {fname,lname,email,mobile,gender,status,location,user_profile} = req.body
    const file = req.file?req.file.filename:user_profile

    // mongodb
    try{
        const updateUser = await users.findByIdAndUpdate({_id:id},{
            fname,lname,email,mobile,gender,status,profile:file,location

        },{
            new:true 
        }
        )
        // to save in this mongodb
        await updateUser.save()
        // res to client
        res.status(200).json(updateUser)
    }
    catch(error){
        res.status(401).json(error)
    }
} 