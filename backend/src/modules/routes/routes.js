const express = require('express')
const router = express.Router()

const {
  getAllSpends,
  createSpend,
  updateSpend,
  deleteSpend
} = require('../controllers/spend.controller')

router.get('/allSpends', getAllSpends)
router.post('/create', createSpend)
router.patch('/update', updateSpend)
router.delete('/delete', deleteSpend)

module.exports = router