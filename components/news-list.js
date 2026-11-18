import { Badge, Box, Grid, List, ListItem, Text } from '@chakra-ui/react'

const TAG_COLORS = {
  journal: { bg: 'rgba(11, 90, 168, 0.12)', color: '#0b5aa8', dark: '#8ab4f8' },
  conference: { bg: 'rgba(0, 128, 128, 0.13)', color: '#11787a', dark: '#6fd6d8' },
  poster: { bg: 'rgba(128, 90, 213, 0.14)', color: '#6b46c1', dark: '#b794f4' },
  grant: { bg: 'rgba(47, 133, 90, 0.14)', color: '#2f855a', dark: '#68d391' },
  award: { bg: 'rgba(214, 158, 46, 0.18)', color: '#a86c00', dark: '#f6c34a' },
  career: { bg: 'rgba(113, 128, 150, 0.16)', color: '#4a5568', dark: '#cbd5e0' }
}

export const Pill = ({ children }) => (
  <Badge
    bg="accentSoft"
    color="accent"
    borderRadius="full"
    px={2}
    fontSize="0.72rem"
    textTransform="none"
    fontWeight={700}
    verticalAlign="2px"
    ml={1}
  >
    {children}
  </Badge>
)

const Tag = ({ tag }) => {
  const c = TAG_COLORS[tag] || TAG_COLORS.career
  return (
    <Box
      as="span"
      display="inline-block"
      w="72px"
      textAlign="center"
      fontSize="0.7rem"
      fontWeight={700}
      letterSpacing="0.04em"
      textTransform="uppercase"
      px="7px"
      py="1px"
      mr="6px"
      borderRadius="5px"
      verticalAlign="1px"
      bg={c.bg}
      color={c.color}
      _dark={{ color: c.dark }}
    >
      {tag}
    </Box>
  )
}

const NewsList = ({ items }) => (
  <List spacing={0}>
    {items.map((n, i) => (
      <ListItem key={i} borderTopWidth={i === 0 ? 0 : '1px'} borderColor="line" pt={i === 0 ? 1 : 3} pb={3}>
        <Grid templateColumns={['1fr', '76px 1fr']} gap={[0.5, 4]}>
          <Text as="time" fontFamily="mono" fontSize="0.85rem" color="muted" pt={[0, '3px']} sx={{ fontVariantNumeric: 'tabular-nums' }}>
            {n.date}
          </Text>
          <Box lineHeight={1.6}>
            <Tag tag={n.tag} />
            {n.text}
            {n.badge && <Pill>{n.badge}</Pill>}
          </Box>
        </Grid>
      </ListItem>
    ))}
  </List>
)

export default NewsList
