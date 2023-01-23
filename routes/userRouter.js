const router = require('express').Router();
const auth = require("../middleware/auth");
const userCtrl = require("../controllers/userCtrl");

//searchBar route
router.get('/search', auth, userCtrl.searchUser);

//get user route(after search)
router.get('/user/:id', auth, userCtrl.getUser);

//update user route
router.patch('/user/', auth, userCtrl.updateUser);


router.patch('/user/:id/follow', auth, userCtrl.follow);


router.patch('/user/:id/unfollow', auth, userCtrl.unfollow);


router.get('/suggestionsUser', auth, userCtrl.suggestionsUser);


module.exports = router;