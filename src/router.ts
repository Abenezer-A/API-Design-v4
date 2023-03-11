import {Router} from 'express'
import { body, oneOf, validationResult } from 'express-validator'
import { title } from 'process'
import { createProduct, deleteProduct, GetOneProducts, getProducts, updateProduct } from './handlers/products'
import { createUpdate, deleteUpdate, getoneUpdate, getUpdates, updateUpdate } from './handlers/update'
import { handleInputErrors } from './modules/middleware'

const router = Router()

/**
 * Product
 */
router.get('/product', getProducts)
router.get('/product/:id', GetOneProducts)
router.put('/product/:id', body('name').isString, handleInputErrors, (req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        res.status(400);
        res.json({ errors: errors.array() });
    }

})

router.post('/product', body('name').isString(), handleInputErrors, createProduct) 
router.delete('/product/:id', deleteProduct)

/**
 * Update
 */
router.get('/update', getUpdates)
router.get('/update/:id', getoneUpdate)
router.put('/update/:id', 
  body(title).optional(),
  body('body').optional(), 
  body('status').isIn(['IN_PROGRESS','SHIPPED','DEPRECATED']).optional(),
  body('version').optional(),
  updateUpdate
)
router.post('/update', 
  body('title').exists().isString(),
  body('body').exists().isString(),
  body('productId').exists().isString(),
  createUpdate
)
router.delete('/update/:id', deleteUpdate)

/**
 * updatepoint
 */
router.get('/updatepoint', () => {})
router.get('/updatepoint/:id', () => {})
router.put('/updatepoint/:id',
  body('name').optional().isString(),
  body('description').optional().isString(),
  () => {} 
)
router.post('/updatepoint',
  body('name').isString(),
  body('description').isString(),
  body('updateId').exists().isString(),
  () => {}
)
router.delete('/updatepoint/:id', () => {})

router.use((err, req, res, next) => {
  console.log(err)
  res.json({message: 'in router handler' })
})

export default router
