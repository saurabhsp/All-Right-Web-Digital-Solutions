import { useEffect, useState } from 'react'
import ServicesPage from './pages/ServicesPage.jsx'
import PortfolioPage from './pages/PortfolioPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import './App.css'

const phone = '8482946737'
const whatsapp = `https://wa.me/91${phone}?text=Hi!%20I%27m%20interested%20in%20your%20services.`
const services = [
  { icon: '◉', title: 'Website Development', text: 'Fast, responsive websites designed to turn visitors into customers.', tag: 'WEB EXPERIENCES', className: 'web' },
  { icon: '◎', title: 'Social Media Marketing', text: 'Content, campaigns, and creative ideas that make your brand stand out.', tag: 'GROW YOUR BRAND', className: 'social' },
  { icon: '♫', title: 'Business Songs & Jingles', text: 'Original music that gives your business a sound people remember.', tag: 'SOUND THAT STAYS', className: 'music' },
  { icon: '⌘', title: 'Web Development Course', text: 'Practical, supportive training to help you build real websites.', tag: 'LEARN BY DOING', className: 'course' },
]
const projects = [
  { title: 'Business Website', category: 'Websites', type: 'web', text: 'A polished online home for a growing business.' },
  { title: 'Restaurant Website', category: 'Websites', type: 'restaurant', text: 'A bold digital menu and booking experience.' },
  { title: 'Online Store', category: 'Websites', type: 'shop', text: 'A clean shopping experience built to convert.' },
  { title: 'Social Media Designs', category: 'Social Media', type: 'social', text: 'Scroll stopping visuals for everyday growth.' },
  { title: 'Promotional Song', category: 'Songs & Jingles', type: 'music', text: 'A memorable sound for a memorable brand.' },
  { title: 'Business Banner', category: 'Designs', type: 'banner', text: 'A confident visual message for your next campaign.' },
]
const contact = [
  { icon: '✆', label: 'WhatsApp', value: phone, href: whatsapp },
  { icon: '☎', label: 'Call Us', value: phone, href: `tel:+91${phone}` },
  { icon: '✉', label: 'Email Us', value: 'allrightwebsolution@gmail.com', href: 'mailto:allrightwebsolution@gmail.com' },
  { icon: '◎', label: 'Instagram', value: '@allrightwebsolution', href: 'https://www.instagram.com/allrightwebsolution/' },
  { icon: '⌖', label: 'Our Location', value: 'Amravati, Maharashtra', href: 'https://maps.google.com/?q=Amravati+Maharashtra' },
]

function Brand({ light = false }) {
  return <a className={`brand ${light ? 'brand-light' : ''}`} href="/" aria-label="All Right home"><img src="/brand-logo.png" alt=""/><span><strong>All Right</strong><small>Web and Digital Solution</small></span></a>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [filter, setFilter] = useState('All')
  const [active, setActive] = useState('home')
  const [path, setPath] = useState(window.location.pathname)
  const route = ['/', '/services', '/portfolio', '/about', '/contact'].includes(path) ? path : '/'
  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname)
    const onInternalLink = (event) => {
      const anchor = event.target.closest('a[href^="/"]')
      if (!anchor || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return
      const url = new URL(anchor.href)
      if (url.origin !== window.location.origin) return
      event.preventDefault()
      if (url.pathname !== window.location.pathname) window.history.pushState({}, '', url.pathname)
      setPath(url.pathname)
      setMenuOpen(false)
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
    window.addEventListener('popstate', onPopState)
    document.addEventListener('click', onInternalLink)
    return () => { window.removeEventListener('popstate', onPopState); document.removeEventListener('click', onInternalLink) }
  }, [])
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible') }), { threshold: .12 })
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [filter, route])
  useEffect(() => {
    const onScroll = () => {
      const sections = ['home', 'services', 'portfolio', 'about', 'contact']
      const current = sections.filter(id => document.getElementById(id)?.getBoundingClientRect().top < 180).at(-1)
      if (current) setActive(current)
    }
    if (route === '/') window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [route])
  const nav = ['Home', 'Services', 'Portfolio', 'About', 'Contact']
  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter)
  return <>
    <header className="site-header"><div className="container header-inner"><Brand/><button className="menu-toggle" aria-label="Toggle menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span/><span/><span/></button><nav className={menuOpen ? 'open' : ''} aria-label="Main navigation">{nav.map(item => <a key={item} href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className={(route === '/' ? active === item.toLowerCase() : route === `/${item.toLowerCase()}`) ? 'active' : ''} onClick={() => setMenuOpen(false)}>{item}</a>)}<a className="button button-gold nav-cta" href="/contact" onClick={() => setMenuOpen(false)}>Get a Quote <span>↗</span></a></nav></div></header>
    {route === '/' ? <main>
      <section className="hero-section" id="home"><div className="hero-orbit orbit-left"/><div className="container hero-grid"><div className="hero-copy reveal visible"><p className="eyebrow">WE ARE YOUR</p><h1>Digital<br/><span>Heroes!</span></h1><div className="gold-line"/><p className="hero-text">Helping businesses grow with beautiful websites, standout social media, memorable music, and practical web development training.</p><div className="hero-actions"><a className="button button-gold" href="#contact">Get Started <span>↗</span></a><a className="button button-outline" href="#services">Explore Services <span>↓</span></a></div><div className="hero-proof"><span className="proof-avatars">✦</span><span>Creative ideas. Real results.<br/><strong>Everything your brand needs.</strong></span></div></div><div className="hero-visual reveal visible"><div className="hero-halo"/><div className="visual-label top-label">DESIGN • DEVELOP • GROW</div><div className="laptop"><div className="laptop-screen"><div className="screen-brand"><img src="/brand-logo.png" alt="All Right logo"/><strong>All Right</strong><small>Web and Digital Solution</small></div></div><div className="laptop-base"/></div><div className="phone"><div className="phone-notch"/><img src="/brand-logo.png" alt=""/><b>All Right</b><small>Web and Digital Solution</small></div><div className="visual-label bottom-label"><b>✦</b> Your vision, made digital</div><div className="plant plant-one"/><div className="plant plant-two"/></div></div><div className="container quick-services">{services.map(s => <a href="#services" key={s.title}><span className="quick-icon">{s.icon}</span><strong>{s.title}</strong></a>)}</div></section>
      <section className="section services-section" id="services"><div className="container"><div className="section-heading centered reveal"><p className="eyebrow">OUR SERVICES</p><h2>Complete Digital Solutions<br/><em>for Your Business</em></h2><p>Everything you need to grow your brand, online and offline.</p></div><div className="service-grid">{services.map((s, i) => <article className="service-card reveal" key={s.title} style={{transitionDelay:`${i*90}ms`}}><div className={`service-art ${s.className}`}><span className="art-glow"/><span className="art-symbol">{s.icon}</span><small>{s.tag}</small></div><div className="service-body"><span className="service-icon">{s.icon}</span><h3>{s.title}</h3><p>{s.text}</p><a href="#contact">Let’s talk <span>↗</span></a></div></article>)}</div></div></section>
      <section className="section portfolio-section" id="portfolio"><div className="container"><div className="section-heading centered reveal"><p className="eyebrow">OUR WORK</p><h2>Our <em>Portfolio</em></h2><p>A glimpse of what thoughtful design can do.</p></div><div className="filters reveal" role="group" aria-label="Filter projects">{['All','Websites','Social Media','Songs & Jingles','Designs'].map(f => <button key={f} type="button" className={filter === f ? 'selected' : ''} onClick={() => setFilter(f)}>{f}</button>)}</div><div className="portfolio-grid">{filtered.map(p => <article className="portfolio-card reveal" key={p.title}><div className={`project-art ${p.type}`}><div className="project-window"><div className="window-dots">● ● ●</div><div className="project-content"><span>{p.category}</span><strong>{p.type === 'restaurant' ? 'GOOD FOOD. GOOD MOOD.' : p.type === 'banner' ? 'GROW YOUR BUSINESS' : p.type === 'music' ? 'MAKE SOME NOISE' : p.type === 'social' ? 'MAKE IT MEMORABLE' : p.type === 'shop' ? 'SHOP YOUR STYLE' : 'YOUR NEXT BIG IDEA'}</strong><i/></div></div></div><div className="project-caption"><div><small>{p.category}</small><h3>{p.title}</h3><p>{p.text}</p></div><a href="#contact" aria-label={`Ask about ${p.title}`}>↗</a></div></article>)}</div></div></section>
      <section className="section about-section" id="about"><div className="container about-grid"><div className="about-copy reveal"><p className="eyebrow">ABOUT US</p><h2>Your Trusted<br/><em>Digital Partner</em></h2><p>All Right Web and Digital Solution is a creative digital agency based in Amravati, Maharashtra. We help businesses build a strong online presence through professional websites, social media marketing, business songs, and hands-on web development training.</p><p>Every project starts with your story. We bring the design, technology, and support to help it shine.</p><div className="about-features"><div><span>✧</span><strong>Creative<br/>Solutions</strong></div><div><span>♢</span><strong>Quality<br/>Work</strong></div><div><span>◎</span><strong>Client<br/>First</strong></div><div><span>✆</span><strong>Ongoing<br/>Support</strong></div></div><blockquote>“Our goal is to help every business build a strong online presence with creative and effective digital solutions.”<cite>— All Right Web and Digital Solution</cite></blockquote></div><div className="about-visual reveal"><div className="about-photo"><div className="about-wall-logo"><img src="/brand-logo.png" alt="All Right brand logo"/></div><div className="about-desk"><div className="desk-screen"><span>all right.</span><i>Where ideas<br/>come alive.</i></div><div className="desk-pot">✿</div></div></div><div className="about-sticker">Made with<br/><strong>purpose ✦</strong></div></div></div></section>
      <section className="contact-section section" id="contact"><div className="container"><div className="section-heading centered reveal"><p className="eyebrow">GET IN TOUCH</p><h2>Let’s <em>Connect!</em></h2><p>Have a project, question, or idea? We’d love to hear from you.</p></div><div className="contact-grid"><div className="contact-list reveal"><h3>Start a conversation</h3><p>Choose the way that works best for you.</p>{contact.map(c => <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel={c.href.startsWith('http') ? 'noreferrer' : undefined} className="contact-link" key={c.label}><span className="contact-icon">{c.icon}</span><span><strong>{c.label}</strong><small>{c.value}</small></span><b>↗</b></a>)}</div><div className="contact-panel reveal"><div className="panel-orb"/><span className="eyebrow">READY WHEN YOU ARE</span><h3>Let’s make something <em>amazing.</em></h3><p>Tell us what you have in mind. We’ll help you find the right digital solution for your business.</p><a className="button button-dark" href={whatsapp} target="_blank" rel="noreferrer">Message us on WhatsApp <span>↗</span></a><a className="email-link" href="mailto:allrightwebsolution@gmail.com">or send us an email →</a><div className="panel-benefits"><span>✦ Quick response</span><span>♢ Reliable support</span><span>♡ Friendly communication</span></div></div></div></div></section>
    </main> : <main key={route}>{route === '/services' ? <ServicesPage services={services}/> : route === '/portfolio' ? <PortfolioPage projects={projects}/> : route === '/about' ? <AboutPage/> : <ContactPage contact={contact} whatsapp={whatsapp}/>}</main>}
    <footer className="footer"><div className="container footer-top"><div><Brand light/><p>Creative digital solutions that help businesses look better, reach further, and grow stronger.</p></div><div><h4>Explore</h4>{nav.map(n => <a href={n === 'Home' ? '/' : `/${n.toLowerCase()}`} key={n}>{n}</a>)}</div><div><h4>Our Services</h4>{services.map(s => <a href="/services" key={s.title}>{s.title}</a>)}</div><div><h4>Let’s Connect</h4><a href={`tel:+91${phone}`}>+91 {phone}</a><a href="mailto:allrightwebsolution@gmail.com">allrightwebsolution@gmail.com</a><a href="https://www.instagram.com/allrightwebsolution/" target="_blank" rel="noreferrer">Instagram ↗</a><span>Amravati, Maharashtra</span></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} All Right Web and Digital Solution. All rights reserved.</span><span>Made with creativity in Amravati ✦</span></div></footer>
  </>
}

export default App
