const express = require("express");
const router = express.Router();

function routes() {
    const jobs = [{
        key: 1,
        name: "adaylarla ilgili teknik bir ödev hazirlamama gerekiyor",
        tags: "urgent"
    }, {
        key: 2,
        name: "yapılan işlerle ilgili activity kayıtları oluşturmam gerekiyor",
        tags: "regular"
    }, {
        key: 3,
        name: "teknik taskları planlayacağım",
        tags: "trivial"
    }];

    router.get("/jobs", (req, res) => {
        res.send(jobs);
    });

    return router;
}

module.exports = routes;