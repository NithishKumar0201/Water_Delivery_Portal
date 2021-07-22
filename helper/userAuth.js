const Order=require("../models/Orders");
var Post = require("../models/post");
module.exports={
    ensureUser: (req, res, next)=>{
        if(req.isAuthenticated())return next();
        res.redirect("./");
    }, 
    forwardUser:(req, res, next)=>{
        if(!req.isAuthenticated()){ 
            return  next();
          } 
        if(req.isAuthenticated()){ 
            res.redirect("./home");
          } 
    }, 
    getOrders:async (req, res,next)=>{

        if(req.user!=null){
            const ord=await Order.find({email: req.user.email });
           // console.log(ord);
            
            let arr=[];
            ord.forEach(obj=>{
              //  console.log(obj.orders);
            
                    arr.push(obj.orders);
               
            });
            res.locals.orders=arr;
            //console.log(arr);
            }
            return  next();
    },
    getPost: async(req, res ,next)=>{
        if(req.user!=null){
            const pos=await Post.find({public:true});
           // console.log(pos);
            
            let arr=[];
            pos.forEach(obj=>{
              //  console.log(obj.orders);
            
                    arr.push(obj);
               
            });
            res.locals.posts=arr;
            //console.log(arr);
            }
       return next();
    }
};