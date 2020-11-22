var db = require('../db');


async function createArticle(name,content,authorFirstName, authorSecondName, authorEmail){
    try
    {
        const authorId = await getOrCreateAuthor(authorFirstName, authorSecondName, authorEmail);
        if(authorId)
            var resultsArticle =  await db.run(`INSERT INTO articles (author_id, name, content)
                    VALUES  (?, ?, ?)`,[authorId, name, content])

        if(!resultsArticle)
             return false;
        return true;
    }
    catch(error){
        console.log(error); 
        return false;
    }
}

async function updateArticle(name,content,authorFirstName, authorSecondName, authorEmail,authorId, articleId ){
    try
    {
        const resAuthor = await db.run(`UPDATE author
        SET first_name = ?, second_name = ?, email = ?
        WHERE id = ?`,[authorFirstName, authorSecondName, authorEmail,authorId]) 
        const resultsArticle =  await db.run(`UPDATE articles
            SET name = ?, content = ?
                     WHERE id = ?`,[name, content,articleId])
        return true;
    }
    catch(error){
        console.log(error); 
        return false;
    }
}


async function getOrCreateAuthor(authorFirstName, authorSecondName, authorEmail){
        var authorId = await getAuthor(authorEmail);
        if(authorId.length == 0){
            var resultsAuthor =  await db.run(`INSERT INTO author (first_name, second_name, email)
            VALUES  (?, ?, ?)`,[authorFirstName, authorSecondName, authorEmail])
            authorId = await getAuthor(authorEmail)
        }
        return authorId[0].id;
}

 async function getAuthor(authorEmail){
    var ress =  await db.run('SELECT * FROM `author` WHERE `email` = ?',[authorEmail]);
    return ress[0];
}


async function getAllArticle(){
   var result = await db.run('SELECT ar.*, a.first_name, a.second_name, a.email FROM articles as ar '+
                              'JOIN author a ON ar.author_id = a.id')
   return result[0];
}

async function getArticle(articleId){
    var ress =  await db.run('SELECT ar.*, a.first_name, a.second_name, a.email FROM articles AS ar '+
    'JOIN author a ON ar.author_id = a.id WHERE ar.id = ?',[articleId]);
    return ress[0][0];
}

async function deleteArticle(articleId){
    var ress =  await db.run('DELETE FROM articles WHERE articles.id = ?',[articleId]);
    return ress[0];
}

module.exports = {createArticle, getAuthor, getAllArticle, getArticle, deleteArticle, updateArticle};