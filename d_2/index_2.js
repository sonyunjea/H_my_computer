const fs = require('fs');
const xlsx = require('xlsx');
const mongoose = require('mongoose');

// MongoDB 연결
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');

    // 엑셀 파일 읽기
    const workbook = xlsx.readFile('final.xlsx');
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Sheet를 JSON 형태로 변환
    const jsonData = xlsx.utils.sheet_to_json(sheet);

    // MongoDB에 데이터 삽입
    const YourModel = mongoose.model('YourModel', new mongoose.Schema({
        // 스키마 정의
        // 예: title: String, director: String, rating: Number, ...
    }));

    YourModel.insertMany(jsonData, (err, result) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Data inserted successfully:', result);
        }

        // 연결 종료
        mongoose.connection.close();
    });
});
