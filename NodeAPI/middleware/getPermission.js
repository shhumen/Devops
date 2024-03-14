const Permission = require('../models/permission')

async function getPermission(req, res, next) {
  let permission
  try {
    permission = await Permission.findById(req.params.id)
    if (permission == null) {
      return res
        .status(404) // not bulundu
        .json({ message: 'Category not found' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.permission = permission
  next()
}

module.exports = getPermission

// 100 -> Informational
// 200 -> Success, Created, Accepted
// 300 -> Redirection
// 400 -> Client Error (Kullanıcı bazlı)
// 500 -> Server Error (Sunucu bazlı)
