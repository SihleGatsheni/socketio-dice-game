const router = require('express').Router();

router.get('/', (req,res) =>{
	res.render('gameload');
})



module.exports = router;