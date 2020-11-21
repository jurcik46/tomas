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
   var result = await db.run('SELECT * FROM articles JOIN author ON articles.author_id = author.id')
   return result[0];
}

module.exports = {createArticle, getAuthor, getAllArticle};