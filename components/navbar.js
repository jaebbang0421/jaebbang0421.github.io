import NextLink from 'next/link'
import { Box, Container, Flex, HStack, Link, Text } from '@chakra-ui/react'
import { IoLogoGithub } from 'react-icons/io5'
import ThemeToggleButton from './theme-toggle-button'

const REPO_URL = 'https://github.com/jaebbang0421/jaebbang0421.github.io'

const NavItem = ({ href, path, children, ...props }) => {
  const active = path === href || path === href.replace(/\/$/, '')
  return (
    <Link
      as={NextLink}
      href={href}
      px={2.5}
      py={1}
      borderRadius="8px"
      fontSize={['0.9rem', '0.95rem']}
      bg={active ? 'accent' : undefined}
      color={active ? 'white' : 'text'}
      _dark={{ color: active ? '#202023' : 'text' }}
      _hover={{ textDecoration: 'none', bg: active ? 'accent' : 'accentSoft' }}
      display="inline-flex"
      alignItems="center"
      gap={1.5}
      {...props}
    >
      {children}
    </Link>
  )
}

const Navbar = ({ path }) => (
  <Box
    as="nav"
    position="fixed"
    top={0}
    w="100%"
    zIndex={20}
    bg="navBg"
    css={{ backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}
  >
    <Container maxW="960px" px={[3.5, 5]} py={[2, 2.5]}>
      <Flex align="center" gap={[1, 4]}>
        <Link
          as={NextLink}
          href="/"
          color="text"
          fontFamily="heading"
          fontWeight={800}
          fontSize={['1rem', '1.15rem']}
          whiteSpace="nowrap"
          mr={[0.5, 2]}
          _hover={{ textDecoration: 'none' }}
          display="inline-flex"
          alignItems="center"
          gap={2}
          role="group"
        >
          <Text
            as="span"
            display={['none', 'inline-block']}
            transition="transform 0.3s ease"
            _groupHover={{ transform: 'rotate(20deg)' }}
          >
            🏠
          </Text>
          Jae Young Jang
        </Link>
        <HStack spacing={1} flex={1}>
          <NavItem href="/publications/" path={path}>
            Publications
          </NavItem>
          <Link
            href={REPO_URL}
            isExternal
            px={2.5}
            py={1}
            borderRadius="8px"
            color="text"
            fontSize={['0.9rem', '0.95rem']}
            display="inline-flex"
            alignItems="center"
            gap={1.5}
            _hover={{ textDecoration: 'none', bg: 'accentSoft' }}
          >
            <IoLogoGithub />
            Source
          </Link>
        </HStack>
        <ThemeToggleButton />
      </Flex>
    </Container>
  </Box>
)

export default Navbar
