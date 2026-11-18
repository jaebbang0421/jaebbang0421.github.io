import { forwardRef } from 'react'
import { Box, Spinner } from '@chakra-ui/react'

// Square box that holds the 3D canvas; it shrinks toward the content below while scrolling.
export const VoxelContainer = forwardRef(({ children }, ref) => (
  <Box
    ref={ref}
    className="voxel"
    position="relative"
    mx="auto"
    mt={['-10px', '-10px']}
    mb={['-4px', '-16px']}
    w="100%"
    maxW="600px"
    maxH="600px"
    sx={{ aspectRatio: '1 / 1', transformOrigin: '50% 100%', willChange: 'transform' }}
  >
    {children}
  </Box>
))
VoxelContainer.displayName = 'VoxelContainer'

export const VoxelSpinner = () => (
  <Spinner size="lg" color="accent" thickness="3px" position="absolute" left="50%" top="50%" ml="-16px" mt="-16px" />
)

const VoxelLoader = () => (
  <VoxelContainer>
    <VoxelSpinner />
  </VoxelContainer>
)

export default VoxelLoader
