const express = require('express')
const {randomBytes} = require('crypto')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
app.use(cors())

app.use(bodyParser.json())
const jsonParser = bodyParser.json()
const NAME = "comments"
const PORT = 4001;

//用于最初存储数据
const commentsByPostId = {};

// 检索评论
app.get('/posts/:id/comments',(req,res) => {
    const postId = req.params.id;
    res.send(commentsByPostId[postId] || [])
})

// 新增评论
app.post('/posts/:id/comments',(req,res) => {
    const commentId = randomBytes(4).toString('hex')
    const {content} = req.body;
    const postID = req.params.id
    commentsByPostId[postID] = [...commentsByPostId[postID]||[],{id:commentId,content}]
    res.status(201).send(commentsByPostId[postID]);
})

app.listen(PORT,() => {
    console.log(`${NAME} service listening on ${PORT}`)
})