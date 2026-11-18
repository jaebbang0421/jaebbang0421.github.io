import { motion } from 'framer-motion'
import { chakra, shouldForwardProp } from '@chakra-ui/react'

// Fades and slides each section up as it scrolls into view.
const MotionBox = chakra(motion.div, {
  shouldForwardProp: prop => shouldForwardProp(prop) || ['initial', 'whileInView', 'viewport', 'transition'].includes(prop)
})

const Section = ({ children, delay = 0, ...props }) => (
  <MotionBox
    initial={{ y: 16, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    mt={9}
    {...props}
  >
    {children}
  </MotionBox>
)

export default Section
