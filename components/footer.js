import { Box, Link } from '@chakra-ui/react'

const Footer = () => (
  <Box textAlign="center" color="muted" fontSize="0.82rem" pt={7} pb={9}>
    &copy; {new Date().getFullYear()} Jae Young Jang. Design inspired by{' '}
    <Link href="https://www.craftz.dog/" isExternal>
      Takuya Matsuyama&apos;s website
    </Link>
    .
  </Box>
)

export default Footer
