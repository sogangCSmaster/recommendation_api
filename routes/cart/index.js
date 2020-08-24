const express = require('express');
const router = express.Router();
var raccoon = require('raccoon');

router.route("/cart")
    .get(async(req, res, next) => {
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
            raccoon.recommendFor(userId + '_cart34', limit).then((results) => {
                res.send({
                    status: 'success',
                    data: {
                        results
                    }
                })
            });
        }
    })
    .post(async(req, res, next) => {
        var { userId, itemList, limit } = req.body;
        if(!userId){
            return res.status(400).send({
                status: 'error',
                msg: 'No userId was given.'
            });
        }
        if(!itemList){
            return res.status(400).send({
                status: 'error',
                msg: 'No itemList was given.'
            });
        }
        if(!Array.isArray(itemList)){
            return res.status(400).send({
                status: 'error',
                msg: 'itemList must be a list.'
            });
        }
        if(!limit){
            limit = 10;
        }
        limit = Number(limit);
        if(limit > 30){
            limit = 30;
        }
        for(var i=0; i<itemList.length; i++){
            await raccoon.liked(userId + '_cart34', itemList[i]);
        }
        raccoon.recommendFor(userId + '_cart34', limit).then((results) => {
            res.send({
                status: 'success',
                data: {
                    results
                }
            })
        });
    })

module.exports = router;