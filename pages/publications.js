import { Box, Heading } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import PubCard from '../components/pub-card'
import data from '../lib/data/publications.json'

// entries with a status (e.g. "Under review") first, then by year, newest first
function groupPublications(pubs) {
  const groups = new Map()
  pubs.forEach(p => {
    const key = p.status || String(p.year)
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key).push(p)
  })
  return [...groups.entries()].sort(([a], [b]) => {
    const na = Number(a)
    const nb = Number(b)
    if (isNaN(na) && !isNaN(nb)) return -1
    if (!isNaN(na) && isNaN(nb)) return 1
    return nb - na
  })
}

const Publications = () => (
  <Layout title="Publications">
    <Section delay={0.1} mt={3}>
      <Heading as="h1" fontSize="1.8rem" fontWeight={800} mb={1}>
        Publications
      </Heading>
    </Section>
    {groupPublications(data.publications).map(([group, pubs], i) => (
      <Section key={group} delay={0.1 + i * 0.05} mt={7}>
        <Heading as="h2" fontSize="1.1rem" fontWeight={700} color="muted" mb={2} pb={1} borderBottomWidth="1px" borderColor="line">
          {group}
        </Heading>
        <Box>
          {pubs.map(p => (
            <PubCard key={p.id} pub={p} me={data.me} />
          ))}
        </Box>
      </Section>
    ))}
  </Layout>
)

export default Publications
