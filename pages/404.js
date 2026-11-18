import NextLink from 'next/link'
import { Box, Heading, Link, Text } from '@chakra-ui/react'
import Layout from '../components/layouts/article'

const NotFound = () => (
  <Layout title="Not found">
    <Box textAlign="center" py={10}>
      <Heading as="h1" fontSize="1.8rem" mb={2}>
        Not found
      </Heading>
      <Text color="muted">The page you&apos;re looking for doesn&apos;t exist.</Text>
      <Link as={NextLink} href="/" display="inline-block" mt={4}>
        ← Back to home
      </Link>
    </Box>
  </Layout>
)

export default NotFound
