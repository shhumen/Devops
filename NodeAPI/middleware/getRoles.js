const Role = require('../models/role')

async function getRoles(req, res, next) {
  let role
  try {
    role = await Role.findById(req.params.id)
    if (role == null) {
      return res
        .status(404) // not bulundu
        .json({ message: 'Role not found' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.role = role
  next() // bir sonrak middleware'a geç
  console.log('Middleware çalıştı -> çıkış')
}
module.exports = getRoles

// 100 -> Informational
// 200 -> Success, Created, Accepted
// 300 -> Redirection
// 400 -> Client Error (Kullanıcı bazlı)
// 500 -> Server Error (Sunucu bazlı)
