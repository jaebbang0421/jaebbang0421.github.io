import { Box, Flex, Heading, Link, List, ListItem, Grid, Text, Wrap, WrapItem, Button } from '@chakra-ui/react'
import { IoDocumentText, IoLogoLinkedin, IoMail, IoSchool } from 'react-icons/io5'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import SectionTitle from '../components/section-title'
import Avatar from '../components/avatar'
import NewsList from '../components/news-list'
import news from '../lib/data/news'
import projects from '../lib/data/projects'

const LINKS = [
  { label: 'Email', href: 'mailto:jaebbang0421@kaist.ac.kr', icon: IoMail, title: 'jaebbang0421@kaist.ac.kr' },
  { label: 'CV', href: '/assets/pdf/cv.pdf', icon: IoDocumentText, external: true },
  { label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=l-0XqUwAAAAJ&hl=en', icon: IoSchool, external: true },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jae-young-jang-a65330266/', icon: IoLogoLinkedin, external: true }
]

const Paragraph = props => <Text mb={2.5} textAlign={['left', 'justify']} sx={{ hyphens: 'auto' }} {...props} />

const Home = () => (
  <Layout>
    <Section delay={0.1} mt={0}>
      <Flex direction={['column-reverse', 'row']} align="center" gap={6} textAlign={['center', 'left']}>
        <Box flex={1}>
          <Heading as="h1" fontSize={['1.9rem', '2.2rem']} fontWeight={800} lineHeight={1.2} letterSpacing="-0.02em">
            Jae Young Jang
          </Heading>
          <Text mt={1}>Ph.D. Student</Text>
          <Text color="muted" fontSize="0.95rem">
            Korea Advanced Institute of Science and Technology (KAIST)
          </Text>
        </Box>
        <Avatar />
      </Flex>
    </Section>

    <Section delay={0.2}>
      <SectionTitle>About me</SectionTitle>
      <Paragraph>
        I am a Ph.D. student in the{' '}
        <Link href="https://fsl.kaist.ac.kr/" isExternal>
          FSL
        </Link>{' '}
        (Future Space Lab) at KAIST, South Korea, advised by Prof. Seung Hyun Cha. I received my M.S. from the KAIST Graduate
        School of Metaverse and my B.S. in Computer Science and Engineering from Seoul National University of Science and
        Technology.
      </Paragraph>
      <Paragraph>
        My research focuses on <strong>context-aware smart home agents</strong>. I fuse multimodal sensor data from users and
        their environment to understand each user&apos;s context, and build <strong>LLM-based agents</strong> that use it to act{' '}
        <span className="nowrap">
          both <strong>reactively</strong> and <strong>proactively</strong>.
        </span>
      </Paragraph>
    </Section>

    <Section delay={0.1}>
      <SectionTitle>News</SectionTitle>
      <NewsList items={news} />
    </Section>

    <Section delay={0.1}>
      <SectionTitle>Info</SectionTitle>
      <Wrap spacing={2}>
        {LINKS.map(({ label, href, icon: Icon, title, external }) => (
          <WrapItem key={label}>
            <Button
              as="a"
              href={href}
              title={title}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              variant="ghost"
              color="accent"
              fontWeight={600}
              fontSize="0.95rem"
              leftIcon={<Icon size={18} />}
              _hover={{ bg: 'accentSoft' }}
            >
              {label}
            </Button>
          </WrapItem>
        ))}
      </Wrap>
    </Section>

    <Section delay={0.1}>
      <SectionTitle>Projects</SectionTitle>
      <List>
        {projects.map(p => (
          <ListItem key={p.title} py={1.5}>
            <Grid templateColumns={['1fr', '88px 1fr']} gap={[0, 3]}>
              <Text fontWeight={700} whiteSpace="nowrap" fontSize={['0.85rem', '1rem']} color={['muted', 'text']} sx={{ fontVariantNumeric: 'tabular-nums' }}>
                {p.years}
              </Text>
              <Box>
                {p.title}
                <Text color="muted" fontSize="0.92rem">
                  {p.role}
                </Text>
              </Box>
            </Grid>
          </ListItem>
        ))}
      </List>
    </Section>
  </Layout>
)

export default Home
