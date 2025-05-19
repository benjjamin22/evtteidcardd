var express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema
var router = express.Router();

mongoose.set('strictQuery', false);
const connectDB = async() => {
    try {
        const conn = await mongoose.connect('MONGO_URI=mongodb+srv://Mydatabase:prototype22@database.tswsylv.mongodb.net/database?retryWrites=true&w=majority');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

connectDB()

var NoteSchemer = new Schema({
    id: { type: String, default: () => uuidv4(), required: true },
    Aname: {
        Name: { type: String, uppercase: true },
        Mname: { type: String, uppercase: true },
        Surname: { type: String, uppercase: true }
    },
    Ddateofbirth: {
        Day: { type: String, uppercase: true },
        Month: { type: String, uppercase: true },
        Year: { type: String, uppercase: true }
    },
    Status: { type: String, uppercase: true },
    School: { type: String, uppercase: true },
    YearofAdmin: { type: String, uppercase: true },
    Presentclass: { type: String, uppercase: true },
    DateofBirth: { type: String, uppercase: true },
    Gender: { type: String, uppercase: true },
    Bloodgroup: { type: String, uppercase: true },
    RegNo: { type: String, uppercase: true },
    Bloodgroup: { type: String, uppercase: true },
    ParentPhoneNo: { type: String, uppercase: true },
    ParentPhoneNo2: { type: String, uppercase: true },
    NIN: { type: String, uppercase: true, },
    HometownCommunity: { type: String, uppercase: true },
    picturepath: { type: String },
    client: { type: String },
    State: { type: String, uppercase: true },
    pin: { type: String, uppercase: true },
    pine: { type: String, uppercase: true },
    sn: { type: Number },
    time: { type: String, uppercase: true }
});

NoteSchemer.pre("save", function(next) {
    var docs = this;
    mongoose.model('Note', NoteSchemer).countDocuments()
        .then(function(counter) {
            docs.sn = counter + 1;
            next();
        });
});
var Note = mongoose.model("Note", NoteSchemer);

router.post("/", async(req, res) => {
    try {
        //const imagePath = `https://drive.google.com/uc?id=${file.data.id}`;
        function pad(n) {
            return n < 10 ? '0' + n : n;
        }

        // Get the current date and time
        const now = new Date();
        const year = now.getFullYear();
        const month = pad(now.getMonth() + 1); // Months are zero-based
        const day = pad(now.getDate());
        const hours = pad(now.getHours());
        const minutes = pad(now.getMinutes());
        const seconds = pad(now.getSeconds());

        // Format the date and time
        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
       // let _id_counter = 0
           // function uytd() {
           //=const ud = (_id_counter++).toString(36) + nanoid(10)
                //const uuido = nanoid(8) + ud
          //  }
           // const uuid = ud

       // const hashID = size => {
       // const MASK = 0x3d
       // const LETTERS = 'abcdefghjkmnpqrstuvwxyz'
       // const NUMBERS = '23456789'
       // const charset = `${NUMBERS}${LETTERS.toUpperCase()}`.split('')
       // const bytes = new Uint8Array(size)
       // crypto.getRandomValues(bytes)

       // return bytes.reduce((acc, byte) => `${acc}${charset[byte & MASK]}`, '')
        // }

        //const passo = hashID(6)
       let gen = n=> [...Array(n)].map(_=>Math.random()*10|0).join``

        // TEST: generate 6 digit number
        // first number can't be zero - so we generate it separatley
        let sixDigitStr = (1+Math.random()*9|0) + gen(9)
        let uuide = ( +(sixDigitStr) ) // + convert to num
        
        
        const uuid = nanoid(10);
            
        let newNote = new Note({
            Aname: {
                Name: req.body.Name,
                Mname: req.body.Mname,
                Surname: req.body.Surname
            },
            Ddateofbirth: {
                Day: req.body.Day,
                Month: req.body.Month + ',',
                Year: req.body.Year
            },
            School: req.body.School,
            Status: 'STUDENT',
            YearofAdmin: req.body.YearofAdmin,
            Presentclass: req.body.Presentclass,
            DateofBirth: req.body.DateofBirth,
            State: req.body.State,
            Gender: req.body.Gender,
            Bloodgroup: req.body.Bloodgroup,
            ParentPhoneNo: req.body.ParentPhoneNo,
            ParentPhoneNo2: req.body.ParentPhoneNo2,
            NIN: req.body.NIN,
            HometownCommunity: req.body.HometownCommunity,
            client: 'https://benjjamin22.github.io/filter/utilitie/ISEC/CSSO/'+ req.body.client + '.jpg',
            pin: uuid,
            pine: uuide,
            time: formattedDate            
        });


        await newNote.save();
        res.send(`<!DOCTYPE html><html><body><h1 style="font-size:6rem; margin-top:8rem;text-align: center;">SUCCESSFUL</h1>
           <h1 style="font-size:3rem; margin-top:0rem;text-align: center;">Name:${newNote.Aname.Name} ${newNote.Aname.Mname} ${newNote.Aname.Surname}</h1>
           <h1 style="font-size:3rem; margin-top:0rem;text-align: center;">this your pin:${newNote.pine} sn:${newNote.sn}</h1>
   </html>`)
    } catch (error) {
        res.status(500).send('Error saving data');
    } //finally {
    //fs.unlinkSync(req.file.path); // Clean up the uploaded file
    //}
    //res.json({message: `Post added successfully! Your Post Id is ${newPost.id}`,});
    //res.redirect("/"); <h1 style="font-size:5rem; margin-top:0rem;text-align: center;">${newNote.EmergencyNo}</h1>
})

module.exports = router;
