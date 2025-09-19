import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import HomePage from '../app/page'
import AuthPage from '../app/auth/page'
import CollectionsPage from '../app/collections/page'
import CartPage from '../app/cart/page'
import AccountPage from '../app/account/page'
import OrderPage from '../app/order/page'
import ProductPage from '../app/product/[id]/page'
import CategoryPage from '../app/category/[slug]/page'
import CheckoutPage from '../app/checkout/page'
import AboutPage from '../app/about/page'
import ContactPage from '../app/contact/page'
import CustomPage from '../app/custom/page'
import SizeGuidePage from '../app/size-guide/page'
import NotFoundPage from '../app/404'

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange enableSystem>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/product/:id" element={<ProductPage params={{ id: window.location.pathname.split('/')[2] }} />} />
          <Route path="/category/:slug" element={<CategoryPage params={{ slug: window.location.pathname.split('/')[2] }} />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/custom" element={<CustomPage />} />
          <Route path="/size-guide" element={<SizeGuidePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App