const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
app.use(cors({
origin: '*'
}));
//  포트입력 3000 기다리기
app.listen(port)



// DB없이 게시판 만들기 리스트 변수
let comments =[];


// 실행 경로 : PS C:\html_file\4>
//터미널 명령어 : node index.js
// 초기 인스톨 : npm install express
// 초기화면
app.get('/', function (req, res) {
    res.send('Hello World')
})

// 라우터 /강아지
app.get('/dog', function (req, res) {
    res.send('강아지')
})


// 라우터/file 링크클릭
app.get('/file', function (req, res) {
    res.send('<a href="https://www.example.com">이 링크를 클릭하세요</a>')
})

// fig 사운드 출력
app.get('/fig', function (req, res) {
    res.send({ 'sound': '꿀꿀' })
})

//변수로 받기1 : params
// app.get('/user/:id', (req, res) => {
//     const q = req.params
//     console.log(q.id)
//     res.json({'userid':q.id})
// })

//변수로 받기2 : 쿼리를 이용하는 방법
app.get('/user/:id', (req, res) => {
    const q = req.query
    console.log(q)


    res.json({'userid':q.name})


})


// DB없이 게시판 만들기
app.post('/creat',function(req,res){
console.log(req.body)
const{content} =req.body

comments.push(content)

console.log(comments)
res.send('hi')

})





