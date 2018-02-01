var mongoose = require("mongoose");
var user = mongoose.model("User");
var session = require("express-session");
var question = mongoose.model("Question");
var game = mongoose.model("Game");

module.exports = {

    login: function (req, res) {
        user.find({}, (err, users) => {
            var userobject = {};
            let check = false;
            let tarindex = -1;
            for (let i = 0; i < users.length; i++) {
                if (users[i].username == req.body.username) {
                    check = true;
                    userobject = users[i];
                }
            }
            if (!check) {
                let user1 = new user({
                    username: req.body.username,
                    likes: []
                });
                user1.save();
                userobject = user1;
            }
            req.session.username = req.body.username;
            req.session.user = userobject;
            res.json(userobject);
        });
    },
    checksession: function (req, res) {
        res.json(req.session.user);
    },
    clearsession: function (req, res) {
        req.session.destroy();
        res.json("sucess");
    },
    getall: function (req, res) {

        user.find({}, (err, users) => {
            res.json(users);
        });
    },
    delete: function (req, res) {
        user.findOneAndRemove({
            _id: req.body.id
        }, (err, user) => {
            res.json(user);
        });
    },
    addquestion: function (req, res) {
        question.create(req.body, (err, done) => {
            if (err) {
                res.json({
                    failure: "fails"
                });
            } else {
                res.json({
                    sucess: "sucess"
                });
            }
        });
    },
    getallquestions: function (req, res) {
        question.find({}, (err, questions) => {
            console.log(questions);
            res.json(questions);
        });
    },
    postgame: function (req, res) {
        game.create(req.body, (err, result) => {
            if (err) {
                res.json(err);
            } else {
                res.json({
                    s: "sucess"
                });
            }
        });
    },
    allgames: function (req, res) {
        game.find({}).sort({
            score: -1
        }).exec(
            (err, games) => {
                res.json(games);
            }
        );
    }
};