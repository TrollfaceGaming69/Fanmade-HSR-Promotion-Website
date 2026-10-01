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
      // `no-scrollbar` is the project utility from index.css. It emits the standard
      // scrollbar-width plus the WebKit pseudo-element, so the page scrollbar is
      // hidden in Firefox too — `scrollbar-none` was a no-op class name.
      className="overflow-y-auto overflow-x-hidden h-svh no-scrollbar"
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
