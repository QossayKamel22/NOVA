import { Link } from 'react-router-dom'
import Logo from '../../components/Logo/Logo'
import Button from '../../components/Button/Button'
import { IconTasks, IconGoals, IconNotes, IconInsights } from '../../components/Icons/Icons'
import styles from './Landing.module.css'

const features = [
  { icon: IconTasks, title: 'Tasks', desc: 'Plan your day with clarity. Priorities, categories, and due times that keep you moving.' },
  { icon: IconGoals, title: 'Goals', desc: 'Track long-term progress with clean visual milestones — see exactly how far you’ve come.' },
  { icon: IconNotes, title: 'Notes', desc: 'Capture ideas the moment they strike, organized into categories you’ll actually use.' },
  { icon: IconInsights, title: 'Insights', desc: 'Understand your own productivity patterns with calm, minimal analytics.' },
]

export default function Landing() {
  return (
    <div className={styles.page}>
      <header className={styles.nav}>
        <div className={`${styles.navInner} container`}>
          <Logo size={30} />
          <nav className={styles.links} aria-label="Site">
            <a href="#features">Features</a>
            <a href="#product">Product</a>
            <a href="#insights">Insights</a>
            <Link to="/login">Sign In</Link>
          </nav>
          <Link to="/register" className={styles.navCta}>
            <Button size="sm">Enter Nova →</Button>
          </Link>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={`${styles.heroInner} container`}>
          <span className={styles.eyebrow}>Your Command Center</span>
          <h1 className={styles.headline}>
            Your day.<br />
            <span className={styles.accentText}>Organized.</span>
          </h1>
          <p className={styles.subhead}>
            Tasks, goals, notes and insights.<br className="desktop-only" /> All in one beautiful workspace.
          </p>
          <div className={styles.heroActions}>
            <Link to="/register"><Button size="lg">Enter Nova →</Button></Link>
            <Link to="/login"><Button size="lg" variant="secondary">Sign In</Button></Link>
          </div>
        </div>

        <div className={styles.heroVisual} aria-hidden="true">
          <div className={styles.blobA} />
          <div className={styles.blobB} />
          <div className={styles.glassCard}>
            <div className={styles.glassRow}>
              <span className={styles.glassDotDone} />
              <span className={styles.glassLine} style={{ width: '70%' }} />
            </div>
            <div className={styles.glassRow}>
              <span className={styles.glassDot} />
              <span className={styles.glassLine} style={{ width: '55%' }} />
            </div>
            <div className={styles.glassRow}>
              <span className={styles.glassDot} />
              <span className={styles.glassLine} style={{ width: '80%' }} />
            </div>
            <div className={styles.glassProgress}><div className={styles.glassProgressFill} /></div>
          </div>
        </div>
      </section>

      <section id="features" className={styles.features}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Everything you need. Nothing you don’t.</h2>
          <div className={styles.featureGrid}>
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className={styles.featureCard}>
                <div className={styles.featureIcon}><Icon width={20} height={20} /></div>
                <h3 className={styles.featureTitle}>{title}</h3>
                <p className={styles.featureDesc}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="product" className={styles.cta}>
        <div className={`${styles.ctaInner} container`}>
          <h2 className={styles.ctaTitle}>Ready to get organized?</h2>
          <p className={styles.ctaDesc}>Join NOVA and turn scattered thoughts into a calm, focused workspace.</p>
          <Link to="/register"><Button size="lg">Enter Nova →</Button></Link>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={`${styles.footerInner} container`}>
          <Logo size={24} withTagline />
          <span className={styles.copy}>© {new Date().getFullYear()} NOVA. All rights reserved.</span>
        </div>
      </footer>
    </div>
  )
}
