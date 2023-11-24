// index.js

const express = require('express');
const bodyParser = require('body-parser');
const Datastore = require('nedb');

const app = express();
const port = 3000;

// 데이터베이스 설정
const db = new Datastore({ filename: 'movies.db', autoload: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// 홈페이지 렌더링
app.get('/', (req, res) => {
    res.render('moveDB', { result: null, searched: false });
});

// 영화 검색 처리
app.post('/search', (req, res) => {
    const movieTitle = req.body.movieTitle;

    // 데이터베이스에서 영화 검색
    db.findOne({ title: movieTitle }, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }

        // 결과를 화면에 렌더링
        res.render('moveDB', { result, searched: true });
    });
});

// 서버 시작
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
