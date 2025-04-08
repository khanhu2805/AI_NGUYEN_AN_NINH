const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');


const app = express();
app.use(cors());
const port = 5000;

let result_ninh = null;
// let result_dieu = null;

app.use(bodyParser.json());

// Cấu hình phục vụ file HTML từ thư mục 'public'
// app.use(express.static(path.join(__dirname, 'public')));

// API nhận kết quả từ Teachable Machine và lưu trữ

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index_nguyen_an_ninh.html'));
});

// app.get('/hoang-dieu', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index_hoang_dieu.html'));
// });

app.post('/process-result', (req, res) => {
    const result = req.body.result;
    console.log("Received result from Teachable Machine:", result);

    // Lưu kết quả nhận diện
    result_ninh = result;

    res.json({ status: "success", result: result_ninh });
});

// app.post('/hoang-dieu/process-result', (req, res) => {
//     const result = req.body.result;
//     console.log("Received result from Teachable Machine:", result);

//     // Lưu kết quả nhận diện
//     result_dieu = result;

//     res.json({ status: "success", result: result_dieu });
// });

// API để ESP32 lấy thông tin kết quả nhận diện
app.get('/get-result', (req, res) => {
    if (result_ninh) {
        res.json({ status: "success", result: result_ninh });
    } else {
        res.json({ status: "error", message: "No result available" });
    }
});

// app.get('/hoang-dieu/get-result', (req, res) => {
//     if (result_dieu) {
//         res.json({ status: "success", result: result_dieu });
//     } else {
//         res.json({ status: "error", message: "No result available" });
//     }
// });

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
