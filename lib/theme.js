import { extendTheme } from '@chakra-ui/react'

const config = {
  initialColorMode: 'system',
  useSystemColorMode: false
}

// colours that change with the colour mode
const semanticTokens = {
  colors: {
    text: { default: '#202023', _dark: 'whiteAlpha.900' },
    muted: { default: '#5c5c66', _dark: 'whiteAlpha.600' },
    accent: { default: '#0b5aa8', _dark: '#8ab4f8' },
    accentSoft: { default: 'rgba(11, 90, 168, 0.1)', _dark: 'rgba(138, 180, 248, 0.12)' },
    line: { default: 'rgba(32, 32, 35, 0.14)', _dark: 'rgba(255, 255, 255, 0.14)' },
    surface: { default: '#f4f5f7', _dark: 'rgba(255, 255, 255, 0.06)' },
    navBg: { default: 'rgba(255, 255, 255, 0.8)', _dark: 'rgba(32, 32, 35, 0.72)' },
    underline: { default: '#525252', _dark: '#a0a0a8' }
  }
}

const styles = {
  global: props => ({
    body: {
      bg: props.colorMode === 'dark' ? '#202023' : '#ffffff',
      color: 'text',
      lineHeight: 1.7
    },
    a: { color: 'accent' },
    p: { textWrap: 'pretty' }, // avoid a single word alone on the last line
    '.nowrap': { whiteSpace: 'nowrap' },
    '@media (prefers-reduced-motion: reduce)': {
      '*': { transition: 'none !important', animation: 'none !important' }
    }
  })
}

const fonts = {
  heading: "'M PLUS Rounded 1c', system-ui, -apple-system, 'Segoe UI', sans-serif",
  body: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  mono: "ui-monospace, 'SF Mono', 'JetBrains Mono', Menlo, Consolas, monospace"
}

const components = {
  Link: {
    baseStyle: { color: 'accent', textUnderlineOffset: '3px' }
  }
}

const theme = extendTheme({ config, semanticTokens, styles, fonts, components })
export default theme
