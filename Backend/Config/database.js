const mongoose= require ("mongoose");

const connectDatabase =()=>{

    mongoose.connect("mongodb+srv://mayank8887:8077520633@cluster0.vb0gn.mongodb.net/Ebath&body?retryWrites=true&w=majority")
}

module.exports = connectDatabase