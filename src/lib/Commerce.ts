import Commerce from '@chec/commerce.js'

const COMMERCE_CHEC_PUBLIC_KEY='pk_test_575827a12ced2078111841605721c9affc1182f5d2fac'

if (!COMMERCE_CHEC_PUBLIC_KEY)
  throw new Error('error, key missing')

export const commerce = new Commerce(
  COMMERCE_CHEC_PUBLIC_KEY,
  true
)