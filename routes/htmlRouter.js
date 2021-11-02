const router = require('express').Router();

router.get('/', (req, res) =>{
res.render("home")
})
router.get('/login', (req, res) =>{
    res.render("login")
    })
    router.get('/form', (req, res) =>{
        res.render("form")
        })
        router.get('/saved', (req, res) =>{
            res.render("saved")
            })
module.exports = router;
