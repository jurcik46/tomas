var db = require('../db');


async function createArticle(name,content,authorFirstName, authorSecondName, authorEmail){
    try
    {
        //TODO find if author exist
        var resultsAuthor =  await db.execute(`INSERT INTO author (first_name, second_name, email)
                    VALUES  (?, ?, ?)`,[authorFirstName, authorSecondName, authorEmail],
                    function (error, results, fields) {
                        if(error)
                            console.log(error);
                        return results;
                      })
        if(!resultsAuthor)
            return false;

        var resultsArticle =  await db.execute(`
        INSERT INTO articles (author_id, name, content) values (1, 'name', 'obsah');
            VALUES  (?, ?, ?)`,[resultsAuthor.insertId, name, content],
            function (error, results, fields) {
                if(error)
                    console.log(error);
                return results;
              })
        if(!resultsArticle)
             return false;
        return true;
    }catch{
        return false;
    }
}

module.exports = {createArticle};