'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { FaGithub, FaLinkedinIn, FaInstagram } from 'react-icons/fa'
import { FiArrowUpRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { gsap } from '@/lib/gsap'

import profile from '@/data/profile.json'
import content from '@/data/content.json'
import styles from '@/styles/sections/HeroSection.module.css'

const SOCIAL_ICON_MAP = { GitHub: FaGithub, LinkedIn: FaLinkedinIn, Instagram: FaInstagram }
const SIDEBAR_LABELS  = ['Instagram', 'GitHub', 'LinkedIn']
const AWARD_CERTS = [
  { src: '/assets/award-insta-2026-mar.png', title: 'Robogent AI', meta: 'Infosys Insta Award - Mar 2026' },
  { src: '/assets/award-insta-2026-feb.png', title: 'GenAI Initiative', meta: 'Infosys Insta Award - Feb 2026' },
  { src: '/assets/award-insta-2025-nov.png', title: 'GenAI Solutioning', meta: 'Infosys Insta Award - Nov 2025' },
  { src: '/assets/award-insta-2025-jul.png', title: 'MFG Pro+ GenAI POC', meta: 'Infosys Insta Award - Jul 2025' },
  { src: '/assets/award-insta-2024-jun.png', title: 'Quality Engineering', meta: 'Infosys Insta Award - Jun 2024' },
  { src: '/assets/award-insta-2023-mar.png', title: 'Creative Delivery', meta: 'Infosys Insta Award - Mar 2023' },
  { src: '/assets/award-ulta-appreciation-2024.png', title: 'Ulta Beauty', meta: 'Client Appreciation - Jan 2024' },
]
function splitTagline(text, highlight) {
  if (!highlight) return [text]
  const parts = text.split(highlight)
  return parts.reduce((acc, part, i) => {
    acc.push(part)
    if (i < parts.length - 1) {
      acc.push(<span key={i} className={styles.taglineAccent}>{highlight}</span>)
    }
    return acc
  }, [])
}

export default function HeroSection() {
  const sectionRef     = useRef(null)
  const greetRef       = useRef(null)
  const roleRef        = useRef(null)
  const firstName      = useRef(null)
  const lastName       = useRef(null)

  const ctaBtnRef      = useRef(null)
  const statsRef       = useRef(null)
  const taglineCardRef = useRef(null)
  const availCardRef   = useRef(null)
  const socialRef      = useRef(null)

  const [activeIdx, setActiveIdx]   = useState(0)
  const [animating, setAnimating]   = useState(false)
  const [direction, setDirection]   = useState(1)  // 1 = forward, -1 = back
  const [paused, setPaused]         = useState(false)
  const intervalRef                 = useRef(null)

  const goTo = (idx, dir = 1) => {
    if (animating) return
    const next = (idx + AWARD_CERTS.length) % AWARD_CERTS.length
    if (next === activeIdx) return
    setDirection(dir)
    setAnimating(true)
    setActiveIdx(next)
    setTimeout(() => setAnimating(false), 480)
  }

  const next = () => goTo(activeIdx + 1, 1)
  const prev = () => goTo(activeIdx - 1, -1)

  useEffect(() => {
    if (paused) return
    intervalRef.current = setInterval(next, 3200)
    return () => clearInterval(intervalRef.current)
  })

  function handleViewProjects() {
    const scroller = document.querySelector('main')
    if (scroller) {
      gsap.to(scroller, { scrollTop: 3 * window.innerHeight, duration: 1.0, ease: 'power3.inOut' })
    }
  }

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const fadeY = [
      greetRef.current, roleRef.current,
      firstName.current, lastName.current,
      ctaBtnRef.current, statsRef.current,
    ].filter(Boolean)

    const fadeX = [taglineCardRef.current, availCardRef.current].filter(Boolean)

    gsap.set(fadeY, { opacity: 0, y: 30 })
    gsap.set(fadeX, { opacity: 0, x: 20 })
    if (socialRef.current) gsap.set(socialRef.current, { opacity: 0, x: -20 })

    const tl = gsap.timeline({ paused: true })
    tl.to(greetRef.current,       { opacity: 1, y: 0, duration: 0.5,  ease: 'power2.out' })
      .to(roleRef.current,        { opacity: 1, y: 0, duration: 0.5,  ease: 'power2.out' }, '-=0.3')
      .to(firstName.current,      { opacity: 1, y: 0, duration: 0.6,  ease: 'power2.out' }, '-=0.2')
      .to(lastName.current,       { opacity: 1, y: 0, duration: 0.6,  ease: 'power2.out' }, '-=0.4')
      .to(ctaBtnRef.current,      { opacity: 1, y: 0, duration: 0.4,  ease: 'power2.out' }, '-=0.2')
      .to(statsRef.current,       { opacity: 1, y: 0, duration: 0.5,  ease: 'power2.out' }, '-=0.2')
      .to(taglineCardRef.current, { opacity: 1, x: 0, duration: 0.5,  ease: 'power2.out' }, '-=0.4')
      .to(availCardRef.current,   { opacity: 1, x: 0, duration: 0.5,  ease: 'power2.out' }, '-=0.3')
      .to(socialRef.current,      { opacity: 1, x: 0, duration: 0.5,  ease: 'power2.out' }, '-=0.4')

    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { tl.play(); observer.disconnect() } },
      { threshold: 0.3 },
    )
    observer.observe(section)
    return () => { observer.disconnect(); tl.kill() }
  }, [])

  const sidebarSocials = SIDEBAR_LABELS
    .map(label => profile.socials.find(s => s.label === label))
    .filter(Boolean)

  return (
    <section ref={sectionRef} className={styles.section}>

      {/* Social Sidebar */}
      <div ref={socialRef} className={styles.socialSidebar}>
        {sidebarSocials.map(social => {
          const Icon = SOCIAL_ICON_MAP[social.label]
          if (!Icon) return null
          return (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label={social.label}
            >
              <Icon size={15} />
              <span className={styles.socialLabel}>{social.label}</span>
            </a>
          )
        })}
        <div className={styles.scrollIndicator}>
          <span className={styles.scrollText}>Scroll down</span>
          <svg width="14" height="22" viewBox="0 0 14 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="1" y="1" width="12" height="20" rx="6" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="7" cy="6" r="2" fill="currentColor"/>
          </svg>
        </div>
      </div>

      {/* Left Content Column */}
      <div className={styles.content}>

        {/* Greeting */}
        <div ref={greetRef} className={styles.greeting}>
          <span className={styles.greetText}>{"Hi, I'm"}</span>
          <span ref={roleRef} className={styles.roleText}>{profile.roles.short}</span>
        </div>

        {/* Stacked Name */}
        <div className={styles.nameBlock}>
          <p ref={firstName} className={styles.name}>{profile.name.first}</p>
          <p ref={lastName}  className={styles.name}>{profile.name.last}</p>
        </div>

        {/* View Projects CTA */}
        <button ref={ctaBtnRef} type="button" className={styles.viewBtn} onClick={handleViewProjects}>
           View Work <FiArrowUpRight />
        </button>

        <div className={styles.toolsBoardCard}>
          <Image
            src="/assets/MyAI-Tools.png"
            alt="AI tools Abdul Talib works with"
            fill
            sizes="(max-width: 767px) calc(100vw - 3rem), 32rem"
            className={styles.toolsBoardImg}
          />
        </div>

        {/* Stats Row */}
        <div ref={statsRef} className={styles.stats}>
          {[...profile.stats.slice(0, 2), content.hero.specialistStat].map(s => (
            <div key={s.label} className={styles.statCard}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>

      </div>

      {/* Tagline + Availability Cards */}
      <div className={styles.cardsCol}>
        <div ref={taglineCardRef} className={styles.taglineCard}>
          <p className={styles.taglineText}>
            {splitTagline(profile.tagline, content.hero.taglineHighlight)}
          </p>
          <p className={styles.freelanceNote}>{content.hero.freelanceNote}</p>
        </div>

        {profile.available && (
          <div ref={availCardRef} className={styles.availCard}>
            <div className={styles.availHeader}>
              <span className={styles.availDot} />
              <span className={styles.availStatus}>{content.hero.availableLabel}</span>
            </div>
            <p className={styles.locationLine}>Based in {profile.location.based}</p>
            <p className={styles.locationLine}>Available {profile.location.availability}</p>
          </div>
        )}
      </div>
      <aside
        className={styles.awardsPanel}
        aria-label="Awards and recognition"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Floating text header – no background */}
        <div className={styles.awardsHeader}>
          <span className={styles.awardsEyebrow}>Awards & Recognition</span>
          <strong>7x Industry Awards</strong>
          <p>6 Infosys Insta Awards for GenAI innovation and quality engineering + Ulta Beauty Client Appreciation for identifying critical production defects.</p>
        </div>

        {/* Full-width carousel */}
        <div className={styles.carouselWrap}>
          <div className={styles.carouselTrack}>
            {AWARD_CERTS.map((award, i) => (
              <div
                key={award.src}
                className={[
                  styles.carouselSlide,
                  i === activeIdx ? styles.carouselActive : '',
                  i === activeIdx && animating
                    ? (direction > 0 ? styles.carouselEnterFwd : styles.carouselEnterBwd)
                    : '',
                ].join(' ')}
                aria-hidden={i !== activeIdx}
              >
                <a
                  href={award.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.carouselLink}
                  tabIndex={i !== activeIdx ? -1 : 0}
                >
                  <Image
                    src={award.src}
                    alt={award.meta}
                    fill
                    sizes="(min-width: 1024px) 38vw, 90vw"
                    className={styles.carouselImg}
                    priority={i === 0}
                  />
                </a>
              </div>
            ))}
          </div>

          {/* Prev / Next */}
          <button className={`${styles.carouselBtn} ${styles.carouselPrev}`} onClick={prev} aria-label="Previous award">
            <FiChevronLeft size={18} />
          </button>
          <button className={`${styles.carouselBtn} ${styles.carouselNext}`} onClick={next} aria-label="Next award">
            <FiChevronRight size={18} />
          </button>

          {/* Dot indicators */}
          <div className={styles.carouselDots}>
            {AWARD_CERTS.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === activeIdx ? styles.dotActive : ''}`}
                onClick={() => goTo(i, i > activeIdx ? 1 : -1)}
                aria-label={`Award ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </aside>
    </section>
  )
}
