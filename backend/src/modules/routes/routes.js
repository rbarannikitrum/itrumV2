const express = require('express')
const router = express.Router()

const {
  getAllSpends,
  createSpend,
  updateSpend,
  deleteSpend
} = require('../controllers/spend.controller')

router.get('/allSpends', getAllSpends)
router.post('/createSpend', createSpend)
router.patch('/updateSpend', updateSpend)
router.delete('/deleteSpend', deleteSpend)

module.exports = router