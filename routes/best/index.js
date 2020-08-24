const express = require('express');
const router = express.Router();
var raccoon = require('raccoon');

router.route('/best')
    .get((req, res, next) => {
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