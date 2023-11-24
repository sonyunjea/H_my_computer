const express = require('express');
const sqlite3 = require('sqlite3');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// 데이터베이스 연결
let db = new sqlite3.Database('./Final.db', sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the Final.db database.');
});

app.get('/', (req, res) => {
  res.render('index'); // EJS 파일 렌더링 (입력 폼 포함)
});

app.post('/search', (req, res) => {
  const movieName = req.body.movieName;

  
  db.get("SELECT * FROM data WHERE moviename = ?", [movieName], (err, movie) => {
    if (err) {
      res.send("An error occurred");
      console.error(err.message);
    } else {
      if (movie) {
        // 같은 장르의 다른 감독들을 무작위로 두 명 추출
        db.all("SELECT * FROM data WHERE Tag = ? AND Directoname != ? ORDER BY RANDOM() LIMIT 2", [movie.Tag, movie.Directoname], (err, randomDirectors) => {
          if (err) {
            res.send("An error occurred while fetching similar directors");
            console.error(err.message);
          } else {
            res.render('movie-details', { movie: movie, similarDirectors: randomDirectors });
          }
        });
      } else {
        res.render('movie-details', { movie: null });
      }
    }
  });
});

app.get('/recommend-movies', (req, res) => {
  const directorName = req.query.director;
  
  db.all("SELECT * FROM data WHERE Tag IN (SELECT Tag FROM data WHERE Directoname = ?)", [directorName], (err, rows) => {
    if (err) {
      res.status(500).send("An error occurred");
      console.error(err.message);
    } else {
      res.json(rows); // 검색된 영화 목록을 JSON 형태로 반환
    }
  });
});



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
