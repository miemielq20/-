var express = require('express');
var router = express.Router();

//导入mysql数据库
const mysql2=require('mysql2')
const config=require('../config/config')
const promisePool = mysql2.createPool(config).promise();

/*添加 */
router.post('/add', async (req,res) =>{
    console.log(req.params)
    const {BookName,Author,TypeName,Remarks}=req.body
    const users = await promisePool.query(`insert into columns (BookName, Author, TypeName, Remarks) values ('${BookName}', '${Author}', '${TypeName}', '${Remarks}')`);
    res.send({
        ok:'1',
        data:users[0]
    })
});

/* 删除 */
router.delete('/del/:id',async (req,res) =>{
    console.log(req.params)
    const users = await promisePool.query(`DELETE FROM columns WHERE columns.id = ${req.params.id}`);
    res.send({
        ok:'1',
        data:users[0]
    })
});

/* 修改 */
router.put('/update/:id',async (req,res) =>{
    console.log(req.params)
    const {BookName,Author,TypeName,Remarks}=req.body  
    const users = await promisePool.query(`UPDATE columns SET BookName='${BookName}',Author='${Author}',TypeName='${TypeName}',Remarks='${Remarks}' WHERE columns.id = ${req.params.id}`);
    res.send({
        ok:'1',
        data:users[0]
    })
});

/* 查找 */
router.get('/select',async (req,res) =>{
    const {Search}=req.query
    let users=null;
    const len=Object.keys(req.query).length

    if(len!=0){
        users = await promisePool.query(`SELECT * FROM columns WHERE (BookName LIKE '%${Search}%') or (TypeName LIKE '%${Search}%') or (Author LIKE '%${Search}%') or (Remarks LIKE '%${Search}%') ORDER BY BookName DESC`);
    }else{
        users = await promisePool.query(`SELECT * FROM columns `);
    }
    res.send({
        ok:'1',
        data:users[0]
    })
});
module.exports = router;
