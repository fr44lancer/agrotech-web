// theme.ts
const theme = {
  colors: {
    primary: '#355C8C',
    secondary: '#56B7B2',
    accessibility: '#BD13B8',
    searchBox: '#000000CC',
    overlay: '#1A1A1A66',
    overlayDark: '#000000BF',

    blue100: '#F0F4F9',
    blue200: '#DDE5EE',
    blue300: '#CBD6E3',
    blue400: '#B8C6D8',
    blue500: '#A5B7CD',
    blue600: '#8099B8',
    blue700: '#5A7AA2',
    blue800: '#355C8C',
    blue900: '#2A4A70',
    blue1000: '#203754',
    blue1100: '#152538',
    blue1200: '#0B121C',

    green100: '#F6FFFF',
    green200: '#EEF8F7',
    green300: '#DDF1F0',
    green400: '#CCE9E8',
    green500: '#BBE2E0',
    green600: '#9AD4D1',
    green700: '#78C5C1',
    green800: '#56B7B2',
    green900: '#45928E',
    green1000: '#346E6B',
    green1100: '#224947',
    green1200: '#112524',

    gray100: '#C1C0C0',
    gray200: '#B2B1B1',
    gray300: '#A3A2A2',
    gray400: '#959494',
    gray500: '#868585',
    gray600: '#686767',
    gray700: '#4B4A4A',
    gray800: '#2D2C2C',
    gray900: '#242323',
    gray1000: '#1B1A1A',
    gray1100: '#121212',
    gray1200: '#0E0D0D',

    text100: '#FFFFFF',
    text200: '#F5F5F5',
    text300: '#DCDCDC',
    text400: '#BFBFBF',
    text500: '#999999',
    text600: '#747474',
    text700: '#454545',
    text800: '#1A1A1A',

    linkMain: '#004D99',
    linkActive: '#000040',
    linkVisited: '#800080',

    systemSuccess: '#358000',
    systemSuccessLight: '#EEFFE2',
    systemInfo: '#1B86C3',
    systemInfoLight: '#E2F2FB',
    systemError: '#CC0000',
    systemErrorLight: '#FFE0E0',
    systemWarning: '#FEBB30',
    systemWarningLight: '#FFEECC',

    buttonDefault: '#167F16',
    buttonHover: '#1B691B',
    buttonActive: '#155115',
    buttonStroke: '#0F420F',

    turquoiseMain: '#56D4D6',
    turquoiseHigh: '#9AE5E6',
    turquoiseMedium: '#CCF2F3',
    turquoiseLow: '#EEFAFA',

    tealMain: '#15B094',
    tealHigh: '#73D0BF',
    tealMedium: '#B9E7DF',
    tealLow: '#E7F7F4',

    magentaMain: '#D81884',
    magentaHigh: '#E874B5',
    magentaMedium: '#F3BADA',
    magentaLow: '#FBE7F2',

    purpleMain: '#8F2B8F',
    purpleHigh: '#BC80BC',
    purpleMedium: '#DDBFDD',
    purpleLow: '#F3E9F3',

    orangeMain: '#FF6A38',
    orangeHigh: '#FFA688',
    orangeMedium: '#FFD2C3',
    orangeLow: '#FFF0EB',

    violetMain: '#474E95',
    violetHigh: '#9195BF',
    violetMedium: '#C8CADF',
    violetLow: '#ECEDF4',

    yesemPrimary: '#004FA3',
    yesemBlue600: '#2677CE',

    backgroundWhite: '#FFFFFF',
    backgroundAlternative: '#F5F5F580'
  },

  mediaSizes: {
    xs: '320px',
    sm: '640px', // Tailwind default
    md: '768px', // Tailwind default
    lg: '1024px', // Tailwind default
    xl: '1280px', // Tailwind default
    '2xl': '1536px', // Tailwind default
    viewportStandard: '80%',
    viewportNarrow: '767px',
    viewportMobile: '100%'
  },

  fontFamily: {
    sans: '"Noto Sans", "Noto Sans Armenian", Arial',
    custom: '"Noto Sans", "Noto Sans Armenian"'
  },

  boxShadows: {
    cards: '0 2px 4px 0 #0000000D',
    cardsHover: '0 2px 8px 0 #00000026',
    accessibilityOutline: '0 0 0 3px #BD13B8',
    modalWindow: '0 8px 16px 0 #0000004D',
    overflowMenu: '0px 4px 8px 0px #0000004D'
  },

  keyframes: {
    accessibilityOutlinePulse: {
      '0%, 100%': { boxShadow: '0 0 0 3px #BD13B8' },
      '50%': { boxShadow: '0 0 0 6px #BD13B8' }
    }
  },

  animations: {
    accessibilityOutlinePulse: 'accessibility-outline-pulse 300ms ease-in-out'
  },

  transitionProperties: {
    maxHeight: 'max-height'
  }
} as const

// Exporting type based on colors
export type IColorItem = keyof typeof theme.colors

export default theme
