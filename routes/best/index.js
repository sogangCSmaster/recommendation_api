const express = require('express');
const router = express.Router();
var raccoon = require('raccoon');

router.route('/best')
    .get((req, res, next) => {
        var { limit } = req.query;
        if(!limit){
            limit = 10;
        }
        raccoon.bestRated().then((results) => {
            res.send({
                status: 'success',
                data: {
                    results
                }
            })
        });
          
    })

module.exports = router;