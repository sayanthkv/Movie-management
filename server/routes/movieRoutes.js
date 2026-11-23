const express = require("express")

const { addmovie,fetchmovie, updatemovie,deleteMovie,favmovie} =require("../controllers/moviecontroller")


const router = express.Router()

router.post("/",addmovie)
router.get("/fetch",fetchmovie)
router.put("/:_id",  updatemovie);
router.delete("/:_id",deleteMovie) ;

router.put("/handlefav/:_id", favmovie);
module.exports = router;