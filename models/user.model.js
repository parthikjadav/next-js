const { default: mongoose, models, model } = require("mongoose");

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,"email already exist"]
    },
    username:{
        type:String,
        required:[true,"username is required"],
        match: [
            /^(?=.{5,25}$)(?![_.])(?!.*[_.]{2})[a-zÀ-ÿ-Z0-9._]+(?<![_.])$/,
            "Usuário inválido, deve conter entre 8-20 caracteres alfanuméricos e ser único",
        ],
    },
    image:{
        type:String,
        default:"https://cdn-icons-png.flaticon.com/512/149/149071.png"
    }
})

const User = models.User || model("User",userSchema);
module.exports = User;