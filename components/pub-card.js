import { Box, Grid, Image, Link, Text, HStack } from '@chakra-ui/react'
import { Pill } from './news-list'

const LINK_LABELS = { paper: 'Paper', pdf: 'PDF', code: 'Code', project: 'Project', slides: 'Slides', poster: 'Poster', video: 'Video' }

const PubCard = ({ pub, me }) => {
  // journals show only their index badge (SCIE, KCI); posters show a plain "Poster" pill
  const typePill = /Journal$/.test(pub.type) ? null : /Poster$/.test(pub.type) ? 'Poster' : pub.type
  const pills = [typePill, pub.badge].filter(Boolean)
  const links = Object.entries(pub.links || {}).filter(([, url]) => url)

  return (
    <Grid
      id={pub.id}
      templateColumns={['1fr', '260px 1fr']}
      gap={[2.5, 4.5]}
      p={3.5}
      mx={-3.5}
      borderRadius="12px"
      transition="background 0.2s ease"
      _hover={{ bg: 'surface' }}
    >
      <Box
        display={pub.thumb ? 'grid' : ['none', 'grid']}
        placeItems="center"
        borderRadius="8px"
        overflow="hidden"
        borderWidth="1px"
        borderColor="line"
        bg={pub.thumb ? 'white' : 'surface'}
        sx={{ aspectRatio: '16 / 10' }}
      >
        {pub.thumb ? (
          <Image src={pub.thumb} alt="" loading="lazy" w="100%" h="100%" objectFit="contain" />
        ) : (
          <Text fontFamily="heading" fontWeight={800} fontSize="1.1rem" letterSpacing="0.04em" color="muted">
            {pub.abbr}
          </Text>
        )}
      </Box>
      <Box>
        <Text fontWeight={700} mb={1} lineHeight={1.45}>
          {pub.title}
        </Text>
        <Text fontSize="0.93rem">
          {pub.authors.map((a, i) => (
            <span key={a}>
              {i > 0 && ', '}
              {me.includes(a) ? (
                <Text as="span" fontWeight={700} textDecoration="underline" sx={{ textUnderlineOffset: '3px' }}>
                  {a}
                </Text>
              ) : (
                a
              )}
            </span>
          ))}
        </Text>
        <Text fontSize="0.93rem" color="muted" mt={0.5}>
          <Text as="span" fontStyle="italic">
            {pub.venue}
            {pub.year && !pub.status ? `, ${pub.year}` : ''}
          </Text>{' '}
          {pills.map(p => (
            <Pill key={p}>{p}</Pill>
          ))}
        </Text>
        {links.length > 0 && (
          <HStack spacing={1.5} mt={2} flexWrap="wrap">
            {links.map(([k, url]) => (
              <Link
                key={k}
                href={url}
                isExternal
                fontSize="0.8rem"
                fontWeight={600}
                px={2.5}
                py="2px"
                borderWidth="1px"
                borderColor="line"
                borderRadius="6px"
                color="text"
                _hover={{ borderColor: 'accent', color: 'accent', textDecoration: 'none' }}
              >
                {LINK_LABELS[k] || k}
              </Link>
            ))}
          </HStack>
        )}
      </Box>
    </Grid>
  )
}

export default PubCard
