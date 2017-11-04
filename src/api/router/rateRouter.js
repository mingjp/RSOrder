/* 
* @Author: Marte
* @Date:   2017-11-02 19:46:24
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-02 19:52:38
*/

/* 
* @Author: Marte
* @Date:   2017-11-01 13:57:55
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-01 16:03:07
*/

var db = require('../db.js');


module.exports = {
    rate: function(app){

        app.get('/rate', function(request, response){
            db.selects('select * from review ', function(rows){
                response.send(rows);
            })
            
        })


        app.get('/rate_delete', function(request, response){
            var id = request.query.reviewId;
            var reviewModSql = 'DELETE FROM review WHERE reviewId ='+id;
            db.update(reviewModSql, function(rows){
                response.send('true');
            })
        })

    }
}