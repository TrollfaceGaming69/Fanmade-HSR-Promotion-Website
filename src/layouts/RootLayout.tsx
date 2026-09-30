import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const RootLayout = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, left: 0 })
  }, [pathname])

  return (
    <div
      ref={scrollRef}
      className="overflow-y-auto overflow-x-hidden h-svh scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
    >
      <Nav />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default RootLayout
