const express=require('express');
const router=express.Router();
const { verifyToken } =require('../middleware/auth');


const premiumFeaturesController=require('../controllers/premiumController')

router.get('/showLeaderboard',premiumFeaturesController.showLeaderBoard);
router.get('/checkPremium',verifyToken,premiumFeaturesController.checkPremium)

module.exports=router;