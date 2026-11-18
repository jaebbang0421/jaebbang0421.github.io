import { motion } from 'framer-motion'
import Head from 'next/head'

// Page transition: each page fades in from below and fades out upward.
const variants = {
  hidden: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

const Layout = ({ children, title }) => {
  const t = title ? `${title} | Jae Young Jang` : 'Jae Young Jang'
  return (
    <motion.article
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.4, type: 'easeInOut' }}
      style={{ position: 'relative' }}
    >
      <Head>
        <title>{t}</title>
        <meta property="og:title" content={t} />
      </Head>
      {children}
    </motion.article>
  )
}

export default Layout
