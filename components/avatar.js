import { useEffect, useState } from 'react'
import { Box, Image } from '@chakra-ui/react'

const PHOTO = '/assets/img/profile.jpg'

// Shows the profile photo once it has loaded; until then (or if it is missing) the initials.
const Avatar = () => {
  const [hasPhoto, setHasPhoto] = useState(false)

  useEffect(() => {
    const img = new window.Image()
    img.onload = () => setHasPhoto(true)
    img.src = PHOTO
  }, [])

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
      {hasPhoto && (
        <Image src={PHOTO} alt="Jae Young Jang" position="absolute" inset={0} w="100%" h="100%" objectFit="cover" />
      )}
    </Box>
  )
}

export default Avatar
