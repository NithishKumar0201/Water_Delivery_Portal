const bcrypt= require("bcryptjs");

const saltrounds=10;

async function hashGenerator (plainPass){
    //console.log(plainPass);
    const salt=await bcrypt.genSalt(saltrounds);
    const hash=await bcrypt.hash(plainPass, salt);
    return hash;
};
const hashvalidator= async (inputedPass, hashedPass)=>{
    //console.log(hashedPass);
    //console.log("coming here hashvalidater"+ inputedPass +" "+ hashedPass);
    const results= await bcrypt.compare(inputedPass, hashedPass);
    //console.log(results);
    return results;
};

module.exports.hashGenerator=hashGenerator;
module.exports.hashvalidator=hashvalidator;
