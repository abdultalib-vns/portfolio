'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import profile from '@/data/profile.json'
import styles from '@/styles/sections/ScreenLoader.module.css'

export default function ScreenLoader({ onDismiss }) {
  const overlayRef = useRef(null)
  const buttonRef = useRef(null)
  const startedRef = useRef(false)


  useEffect(() => {
    const button = buttonRef.current
    if (!button) return

    button.addEventListener('click', handleStart)
    button.addEventListener('pointerup', handleStart)
    button.addEventListener('touchend', handleStart)

    return () => {
      button.removeEventListener('click', handleStart)
      button.removeEventListener('pointerup', handleStart)
      button.removeEventListener('touchend', handleStart)
    }
  }, [])
  function handleStart(event) {
    event?.preventDefault?.()
    if (startedRef.current) return
    startedRef.current = true

    const overlay = overlayRef.current
    if (overlay) overlay.style.pointerEvents = 'none'

    window.dispatchEvent(new CustomEvent('loader-dismissed'))

    const finish = () => {
      window.dispatchEvent(new CustomEvent('loader-animation-done'))
      onDismiss?.()
    }

    if (!overlay) {
      finish()
      return
    }

    const top = document.createElement('div')
    top.className = styles.splitTop

    const bottom = document.createElement('div')
    bottom.className = styles.splitBottom

    const line = document.createElement('div')
    line.className = styles.centerLine

    document.body.appendChild(top)
    document.body.appendChild(bottom)
    document.body.appendChild(line)

    let completed = false
    const cleanup = () => {
      if (completed) return
      completed = true
      top.remove()
      bottom.remove()
      line.remove()
      finish()
    }

    gsap.to(overlay, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.out',
    })

    gsap.fromTo(
      line,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.25, ease: 'power2.out' }
    )

    gsap.to(top, {
      y: '-100%',
      duration: 1,
      ease: 'expo.inOut',
      force3D: true,
    })

    gsap.to(bottom, {
      y: '100%',
      duration: 1,
      ease: 'expo.inOut',
      force3D: true,
      onComplete: cleanup,
    })

    gsap.to(line, {
      opacity: 0,
      duration: 0.3,
      delay: 0.2,
    })

    window.setTimeout(cleanup, 1300)
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') handleStart(event)
  }

  return (
    <div ref={overlayRef} className={styles.overlay}>
      <div className={styles.liquidBg} aria-hidden />

      <p className={styles.monogram}>
        {profile.name.full.toUpperCase()}
      </p>

      <button
        ref={buttonRef}
        type="button"
        className={styles.startBtn}
        onClick={handleStart}
        onPointerUp={handleStart}
        onKeyDown={handleKeyDown}
      >
        Start
      </button>
    </div>
  )
}