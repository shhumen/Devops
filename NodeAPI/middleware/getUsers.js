const User = require('../models/user')

async function getUser(req, res, next) {
  let user
  try {
    user = await User.findById(req.params.id)
    if (user == null) {
      return res
        .status(404) // not bulundu
        .json({ message: 'User not found' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.user = user
  next()
}

module.exports = getUser

// 100 -> Informational
// 200 -> Success, Created, Accepted
// 300 -> Redirection
// 400 -> Client Error (Kullanıcı bazlı)
// 500 -> Server Error (Sunucu bazlı)
