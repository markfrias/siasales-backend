const CustomerTableSchema = require ('../Schema/OrderDetails')

exports.createCustomerTableSchema = async (req, res) => {

    try{
        let OrderDetails;

        OrderDetails = new CustomerTableSchema (req.body);

        await OrderDetails.save();
        res.send(OrderDetails);


    } catch (error) {
        console.log(error);
        res.status(500).send('there is an error');
}
}
//create controler






























exports.create = (req, res) => {
    //validate request
  if (req.body.title){
      return res.status(400).send({
          message: "OrderDetails content can not be empty"
      })
  }
  //create OrderDetails Document
  //const OrderDetails = new CustomerTableSchema ({
   // OrderDetailsID: req.body.title||"OrderDetailsID",
   // Discount:req.body.content||      2,
    //TaxRate: req.body.content ||  3,
    //OtherFees: req.body.content || 22

  //});
  exports.createCustomertableSchema = async (req, res) => {   
try{
   let OrderDetails;

    OrderDetails = new CustomerTableSchema(req.body);

   await CustomerTableSchema.save();
    res.send(OrderDetails);

} catch (error) {
    console.log(error);
    res.status(500).send('there is an error');
}
}
}

  //save this data
 //CustomerTableSchema.save()
  //.then(data=>{
      //res.send(data);
  //})
  //.catch(err =>{
     // res.status(500).send({
       //   message:err.message ||"Some Error occured while creating"
      //})
  //})