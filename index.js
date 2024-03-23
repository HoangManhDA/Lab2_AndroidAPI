//import thu vien

const express = require('express');
const mongoose = require('mongoose');

// const { userInfo } = require('os');

//tao doi tuong moi cho express

const app = express();

//ket noi voi csdl monodb

mongoose.connect('mongodb+srv://manhthph13394:LaciaArato1@manhthph13394.rjmh4gf.mongodb.net/?retryWrites=true&w=majority&appName=Manhthph13394'
, {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
}).then(()=> {
    console.log("Ket noi thanh cong voi mongodb");
}).catch((err)=>{
    console.error("Loi:", err);
});

//truy van csdl
//chọn csdl de thao tac
const db1 = mongoose.collection.usedb('db1');
//dinh nghia model cho bang du lieu
const SinhVienSchema = new mongoose.Schema({
    masv: String,
    tenSV: String,
});
// anh xa model vao bang du lieu
const SinhVien = db1.model('sinhvien', SinhVienSchema);
//tao link trieu goi tren trinh duyet
app.get('/', async(req, res)=>{
    try {
        const sinhvien = await SinhVien.find(); // doc du lieu tu bang sinh vien
        if (sinhvien.lenght > 0) {  // neu co ton tai du lieu
            res.json(sinhvien); //api tra ve ket qua
        }else{ // neu khong ton tai du lieu
                res.status(404).json({error:"khong co sinh vien"});
        }
    } catch (error) {
        console.error("Loi doc du lieu");
        res.status(500).json({error: "Doc du lieu loi"});
    }

}

) ;

//khoi chay may chu

const PORT =  process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log('Server dang chay o cong 3000');
});

module.exports = app;