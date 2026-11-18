import { Heading } from '@chakra-ui/react'

const SectionTitle = ({ children }) => (
  <Heading
    as="h2"
    fontSize="1.3rem"
    fontWeight={700}
    mb={3}
    display="inline-block"
    textDecoration="underline"
    sx={{ textDecorationColor: 'var(--chakra-colors-underline)', textDecorationThickness: '4px', textUnderlineOffset: '6px' }}
  >
    {children}
  </Heading>
)

export default SectionTitle
