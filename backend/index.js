const authRoutes = require('./routes/authRoutes.js')
const { protect } = require('./middleware/authMiddleware.js');

export { authRoutes, protect };
