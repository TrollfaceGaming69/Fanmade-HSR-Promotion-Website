import { Route, Routes } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'
import Gameplaypage from './pages/Gameplaypage'
import CharacterPage from './pages/CharacterPage'
import NewsPage from './pages/NewsPage'
import Faq from './pages/Faq'
import NotFound from './pages/NotFound'
import { ROUTES } from './routes'

const App = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path={ROUTES.home} element={<Home />} />
        <Route path={ROUTES.gameplay} element={<Gameplaypage />} />
        <Route path={ROUTES.characters} element={<CharacterPage />} />
        <Route path={ROUTES.news} element={<NewsPage />} />
        <Route path={ROUTES.faq} element={<Faq />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
