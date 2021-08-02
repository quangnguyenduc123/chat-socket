import Router from 'express'
import user from './user/user-route.js'
import account from './account/account-route.js'

const router = Router()

// user API
router.use('/api/user', user)
router.use('/api/account/', account)
// Handle 404 - page not found
router.use('*', (req, res, next) => {
  return res.status(404).json({
    code: 404,
    message: 'Page not found',
  })
})

export default router
