const express = require("express")
const router = express.Router()
const authenticateUser = require("../middleware/authentication")
const testUser = require("../middleware/testUser")
const { register, login, updateUser } = require("../controllers/auth")

const apiRateLimiter = require("express-rate-limit")

const rateLimiter = apiRateLimiter({
  windowMs: 10 * 60 * 1000,
  max: 50,
  message: {
    msg: "Too many request from this IP please try again after 10 mins...",
  },
})

router.post("/register", rateLimiter, register)
router.post("/login", rateLimiter, login)
router.patch("/updateUser", authenticateUser, testUser, updateUser)

module.exports = router
