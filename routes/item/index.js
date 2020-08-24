const express = require('express');
const router = express.Router();
var raccoon = require('raccoon');


router.route('/item')
    .get((req, res, next) => {
        var { userId, limit } = req.query;
        
        if(!limit){
            limit = 10;
        }
        limit = Number(limit);
        if(limit > 30){
            limit = 30;
        }
        if(!userId){
            return res.status(400).send({
                status: 'error',
                msg: 'No userId was given.'
            });
        } else {
            raccoon.recommendFor(userId + '_item12', limit).then((results) => {
                res.send({
                    status: 'success',
                    data: {
                        results
                    }
                })
            });
        }
    })
    .post((req, res, next) => {
        var { userId, itemId, limit } = req.body;
        if(!userId){
            return res.status(400).send({
                status: 'error',
                msg: 'No userId was given.'
            });
        }
        if(!itemId){
            return res.status(400).send({
                status: 'error',
                msg: 'No itemId was given.'
            });
        }
        if(!limit){
            limit = 10;
        }
        limit = Number(limit);
        if(limit > 30){
            limit = 30;
        }
        raccoon.liked(userId + '_item12', itemId).then(() => {
            raccoon.recommendFor(userId + '_item12', limit).then((results) => {
                res.send({
                    status: 'success',
                    data: {
                        results
                    }
                })
            });
        });
    })

module.exports = router;