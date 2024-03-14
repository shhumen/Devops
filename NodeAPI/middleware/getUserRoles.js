const UserRole = require('../models/userRole')

async function getUserRoles(req, res, next) {
  let userRole
  try {
    userRole = await UserRole.findById(req.params.id)
    if (userRole == null) {
      return res
        .status(404) // not bulundu
        .json({ message: 'Role not found' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.userRole = userRole
  next() // bir sonrak middleware'a geç
  console.log('Middleware çalıştı -> çıkış')
}
module.exports = getUserRoles

// 100 -> Informational
// 200 -> Success, Created, Accepted
// 300 -> Redirection
// 400 -> Client Error (Kullanıcı bazlı)
// 500 -> Server Error (Sunucu bazlı)
