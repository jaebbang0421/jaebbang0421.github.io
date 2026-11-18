import { useState } from 'react'
import { Box, Image } from '@chakra-ui/react'

// Shows /assets/img/profile.jpg when it exists, otherwise the initials.
const Avatar = () => {
  const [failed, setFailed] = useState(false)
  return (
    <Box
      flex="none"
      w="108px"
      h="108px"
      borderRadius="full"
      borderWidth="2px"
      borderColor="text"
      overflow="hidden"
      position="relative"
      display="grid"
      placeItems="center"
      bg="surface"
      fontFamily="heading"
      fontWeight={800}
      fontSize="1.8rem"
      color="muted"
    >
      JY
      {!failed && (
        <Image
          src="/assets/img/profile.jpg"
          alt="Jae Young Jang"
          position="absolute"
          inset={0}
          w="100%"
          h="100%"
          objectFit="cover"
          onError={() => setFailed(true)}
        />
      )}
    </Box>
  )
}

export default Avatar
