import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Box, Container } from '@chakra-ui/react'
import Navbar from '../navbar'
import Footer from '../footer'
import VoxelLoader from '../voxel-loader'

// The 3D scene lives in the layout, so it stays in place when moving between pages.
const VoxelHome = dynamic(() => import('../voxel-home'), { ssr: false, loading: () => <VoxelLoader /> })

const DESCRIPTION = 'Jae Young Jang, Ph.D. student at KAIST Future Space Lab, building context-aware smart home agents.'
const FAVICON =
  "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏠</text></svg>"

const Main = ({ children, router }) => (
  <Box as="main" pb={2}>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={DESCRIPTION} />
      <meta name="author" content="Jae Young Jang" />
      <meta property="og:description" content={DESCRIPTION} />
      <meta property="og:type" content="website" />
      <link rel="icon" href={FAVICON} />
      <title>Jae Young Jang</title>
    </Head>

    <Navbar path={router.asPath} />

    <Container maxW="960px" px={5} pt={[12, 14]}>
      <VoxelHome />
      {children}
      <Footer />
    </Container>
  </Box>
)

export default Main
