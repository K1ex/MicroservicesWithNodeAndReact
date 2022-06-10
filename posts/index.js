const bodyParser = require('body-parser')
const express = require('express')
const {randomBytes} = require('crypto')
const cors = require('cors')
const app = express();
app.use(bodyParser.json())
app.use(cors())
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({extended:false});
const NAME = "post"
const PORT = 4000;

//用于最初存储数据
const posts = {};

// 检索文章
app.get('/posts',(req,res) => {
    res.send(posts)
})

// 新增文章
app.post('/posts',jsonParser,(req,res) => {
    const id = randomBytes(4).toString('hex')
    const {title} = req.body;
    console.log(req.body)
    console.log(title)
    posts[id] = {
        id,title
    }

    res.status(201).send(posts[id]);
})

app.listen(PORT,() => {
    console.log(`${NAME} service listening on ${PORT}`)
})