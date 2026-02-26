import { ThemeConfig } from 'antd'
import theme from '../styles/theme'

const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: theme.colors.primary,

    colorSuccess: theme.colors.systemSuccess,
    colorSuccessBg: theme.colors.systemSuccessLight,
    colorSuccessBorder: theme.colors.systemSuccess,

    colorError: theme.colors.systemError,
    colorErrorBg: theme.colors.systemErrorLight,
    colorErrorBorder: theme.colors.systemError,

    colorInfo: theme.colors.systemInfo,
    colorInfoBg: theme.colors.systemInfoLight,
    colorInfoBorder: theme.colors.systemInfo,

    colorWarning: theme.colors.systemWarning,
    colorWarningBg: theme.colors.systemWarningLight,
    colorWarningBorder: theme.colors.systemWarning,

    colorTextBase: theme.colors.text800,
    colorTextSecondary: theme.colors.text700,
    colorTextDisabled: theme.colors.text500,
    colorLink: theme.colors.linkMain,
    colorLinkActive: theme.colors.linkActive,
    colorLinkHover: theme.colors.linkMain,

    colorBgBase: theme.colors.backgroundWhite,
    colorBgContainer: theme.colors.backgroundAlternative,

    colorBorder: theme.colors.blue400,
    colorBorderSecondary: theme.colors.blue300,
    borderRadius: 4,

    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',

    controlHeightSM: 32,
    controlHeight: 40,
    controlHeightLG: 48,

    blue1: theme.colors.blue100,
    blue2: theme.colors.blue200,
    blue3: theme.colors.blue300,
    blue4: theme.colors.blue400,
    blue5: theme.colors.blue500,
    blue6: theme.colors.primary,
    blue7: theme.colors.blue700,
    blue8: theme.colors.blue800,
    blue9: theme.colors.blue900,
    blue10: theme.colors.blue1000,

    green1: theme.colors.green100,
    green2: theme.colors.green200,
    green3: theme.colors.green300,
    green4: theme.colors.green400,
    green5: theme.colors.green500,
    green6: theme.colors.systemSuccess,
    green7: theme.colors.green700,
    green8: theme.colors.green800,
    green9: theme.colors.green900,
    green10: theme.colors.green1000,

    motionEaseOut: 'cubic-bezier(0.215, 0.61, 0.355, 1)',

    colorFillAlter: theme.colors.blue100
  },

  components: {
    DatePicker: {
      colorPrimary: theme.colors.orangeMain,
      cellHoverBg: theme.colors.gray300,
      cellActiveWithRangeBg: theme.colors.orangeMain,
      cellHoverWithRangeBg: theme.colors.orangeMain,
      fontSize: 16,
      lineHeight: 1.5,
      borderRadius: 4,
      controlHeight: 52,
      hoverBorderColor: theme.colors.orangeMain,
      activeBorderColor: theme.colors.orangeMain,
      activeShadow: 'none',
      colorTextPlaceholder: theme.colors.gray800,
      colorTextHeading: theme.colors.gray1200,
      colorText: theme.colors.gray1200,
      fontWeightStrong: 400,
      fontFamily: theme.fontFamily.sans,
      colorIcon: theme.colors.orangeMain,
      colorIconHover: theme.colors.orangeMain,
      colorError: theme.colors.systemError,
      colorErrorBorder: theme.colors.systemError,
      colorErrorBorderHover: theme.colors.systemError,
      colorErrorOutline: theme.colors.systemError,
      errorActiveShadow: 'none'
    },

    Segmented: {
      controlHeight: 42,
      paddingContentHorizontal: 16,
      trackBg: theme.colors.blue300,
      fontSize: 14,
      fontFamily: theme.fontFamily.sans,
      itemColor: theme.colors.gray800,
      itemSelectedColor: theme.colors.backgroundWhite,
      borderRadius: 4,
      itemSelectedBg: theme.colors.primary,
      itemHoverBg: theme.colors.blue300,
      itemActiveBg: theme.colors.blue300,
      itemHoverColor: theme.colors.gray800
    },

    Pagination: {
      colorBgTextActive: theme.colors.backgroundWhite,
      colorBgTextHover: theme.colors.primary,
      colorBorder: theme.colors.primary,
      colorPrimaryBorder: theme.colors.primary,
      colorBorderSecondary: theme.colors.primary,
      borderRadius: 4,
      itemSize: 40,
      fontSize: 18,
      fontWeightStrong: 400,
      colorBgBase: theme.colors.primary,
      itemBg: theme.colors.blue400,
      itemActiveBg: theme.colors.primary,
      controlItemBgHover: theme.colors.blue300,
      colorPrimary: theme.colors.backgroundWhite,
      colorPrimaryHover: theme.colors.backgroundWhite,
      colorText: theme.colors.gray800
    },

    Select: {
      controlHeight: 52,
      borderRadius: 4,
      colorBorder: theme.colors.gray300,
      hoverBorderColor: theme.colors.gray800,
      fontSize: 16,
      lineHeight: 1.5,
      optionSelectedFontWeight: 400,
      activeBorderColor: theme.colors.gray800,
      controlOutlineWidth: 0,
      optionSelectedBg: '#272A3D0D',
      optionSelectedColor: theme.colors.gray1200,
      optionActiveBg: '#272A3D0D',
      colorText: theme.colors.gray1200,
      colorTextDescription: theme.colors.gray1200,
      colorTextPlaceholder: theme.colors.gray800,
      optionFontSize: 16,
      optionHeight: 40,
      optionPadding: '8px 8px',
      colorTextQuaternary: theme.colors.gray800,
      colorIcon: theme.colors.gray800,
      colorIconHover: theme.colors.gray800
    },

    Checkbox: {
      colorPrimary: theme.colors.primary,
      colorPrimaryHover: theme.colors.primary,
      colorText: theme.colors.gray1200,
      fontSize: 16,
      lineHeight: 1.5,
      borderRadiusSM: 2,
      colorBorder: theme.colors.gray800
    },

    Input: {
      controlHeight: 52,
      borderRadius: 4,
      colorBorder: theme.colors.gray300,
      hoverBorderColor: theme.colors.gray800,
      fontSize: 16,
      lineHeight: 1.625,
      activeBorderColor: theme.colors.gray800,
      colorText: theme.colors.gray1200,
      colorTextDescription: theme.colors.gray1200,
      colorTextPlaceholder: theme.colors.gray800,
      colorTextQuaternary: theme.colors.gray800,
      paddingBlock: 12,
      paddingInline: 12,
      colorError: theme.colors.systemError,
      colorErrorBorder: theme.colors.systemError,
      colorErrorBorderHover: theme.colors.systemError,
      colorErrorOutline: theme.colors.systemError,
      activeShadow: 'none',
      errorActiveShadow: 'none'
    },

    InputNumber: {
      controlHeight: 52,
      borderRadius: 4,
      colorBorder: theme.colors.gray300,
      hoverBorderColor: theme.colors.gray800,
      fontSize: 16,
      lineHeight: 1.5,
      activeBorderColor: theme.colors.gray800,
      colorText: theme.colors.gray1200,
      colorTextDescription: theme.colors.gray1200,
      colorTextPlaceholder: theme.colors.gray800,
      colorTextQuaternary: theme.colors.gray800,
      paddingBlock: 12,
      paddingInline: 12,
      colorError: theme.colors.systemError,
      colorErrorBorder: theme.colors.systemError,
      colorErrorBorderHover: theme.colors.systemError,
      colorErrorOutline: theme.colors.systemError,
      activeShadow: 'none',
      errorActiveShadow: 'none'
    },

    Radio: {
      buttonColor: theme.colors.gray1200,
      buttonSolidCheckedColor: theme.colors.primary,
      buttonSolidCheckedBg: theme.colors.secondary,
      buttonSolidCheckedHoverBg: theme.colors.secondary,
      buttonBg: theme.colors.blue600,
      colorBorder: theme.colors.blue600,
      colorPrimaryActive: theme.colors.secondary,
      colorPrimary: theme.colors.primary,
      fontSize: 16,
      lineHeight: 1.5,
      borderRadius: 4,
      controlHeight: 52,
      colorPrimaryHover: theme.colors.primary,
      motionDurationSlow: '0s',
      buttonCheckedBg: theme.colors.secondary
    },

    Form: {
      itemMarginBottom: 8,
      colorError: theme.colors.systemError,
      labelColor: theme.colors.gray1200,
      labelRequiredMarkColor: theme.colors.systemError,
      colorTextDescription: theme.colors.gray800,
      labelFontSize: 20
    },

    List: {
      colorText: theme.colors.gray1200,
      colorBorder: theme.colors.gray300,
      borderRadiusLG: 4,
      itemPadding: '16px 0',
      paddingLG: 12,
      fontSize: 16
    },

    Modal: {
      boxShadow: '0px -2px 8px 0px #272A3D0D',
      titleFontSize: 20,
      titleLineHeight: 1.5,
      titleColor: theme.colors.gray1200,
      colorIcon: theme.colors.gray800,
      colorIconHover: theme.colors.gray800,
      fontWeightStrong: 500
    },

    Dropdown: {
      boxShadowSecondary: '0px -2px 8px 0px #272A3D0D',
      borderRadiusLG: 8,
      paddingBlock: 8,
      controlPaddingHorizontal: 8,
      paddingXXS: 8,
      colorText: theme.colors.gray1200,
      controlItemBgHover: theme.colors.backgroundWhite,
      fontSize: 16,
      lineHeight: 1.5,
      colorPrimary: theme.colors.gray800
    },

    Avatar: {
      colorTextPlaceholder: theme.colors.backgroundWhite
    },

    Badge: {
      indicatorHeight: 20,
      indicatorHeightSM: 12,
      textFontSizeSM: 8,
      paddingXS: 4,
      lineWidth: 0,
      colorError: theme.colors.systemError,
      colorErrorHover: theme.colors.systemErrorLight
    },

    Collapse: {
      colorBorder: theme.colors.gray300,
      contentBg: 'transparent',
      headerBg: 'transparent',
      fontSize: 20,
      colorText: theme.colors.gray1200,
      colorTextHeading: theme.colors.gray1200,
      borderRadiusLG: 4
    },

    Progress: {
      colorSuccess: theme.colors.primary,
      colorError: theme.colors.systemError,
      circleTextColor: theme.colors.gray1200,
      circleTextFontSize: '14px',
      borderRadius: 2,
      borderRadiusLG: 2,
      borderRadiusSM: 2,
      lineBorderRadius: 4
    },

    Carousel: {
      colorBgContainer: theme.colors.primary,
      dotHeight: 12,
      dotActiveWidth: 12,
      dotWidth: 12,
      dotOffset: -40
    },
    Button: {
      colorPrimary: theme.colors.primary, // base primary blue
      colorPrimaryHover: theme.colors.blue900, // lighter hover (blue700)
      colorPrimaryActive: theme.colors.blue1000, // darker active (blue900)
      colorPrimaryBorder: theme.colors.primary, // primary border color
      colorTextLightSolid: theme.colors.text100, // text color on solid button (white)
      controlOutlineWidth: 2, // strong outline
      fontWeightStrong: 500,
      borderRadius: 4,
      controlHeight: 40,
      paddingContentHorizontal: 24, // big horizontal padding
      fontSize: 14,
      boxShadow: 'none',
      defaultShadow: '0 0 0 rgba(0,0,0,0.02)',
      primaryShadow: '0 0 0 rgba(0,0,0,0.02)'
    },
    Alert: {
      borderRadius: 0,
      borderRadiusLG: 0
    },
    Typography: {
      titleMarginTop: 0,
      titleMarginBottom: 16,

      fontSize: 16,

      fontSizeHeading1: 40,
      lineHeightHeading1: 1.6,
      fontSizeHeading2: 30,
      lineHeightHeading2: 1.6,
      fontSizeHeading3: 24,
      lineHeightHeading3: 1.6,
      fontSizeHeading4: 20,
      lineHeightHeading4: 1.6
    },
    Tag: {
      colorText: '#595959',
      colorTextLightSolid: '#fff',
      colorBgContainer: '#F5F5F5',
      fontSize: 30,
      fontWeightStrong: 500,
      lineHeight: 1.5,
      borderRadius: 0,
      borderRadiusLG: 0,
      borderRadiusSM: 0
    },
    Notification: {
      colorSuccessBg: '#f6ffed',
      colorSuccessBorder: '#b7eb8f',
      colorSuccess: '#389e0d',

      colorErrorBg: '#fff1f0',
      colorErrorBorder: '#ffa39e',
      colorError: '#cf1322',

      borderRadiusLG: 0,
      borderRadiusSM: 0,
      borderRadius: 0
    },
    Tooltip: {
      colorBgSpotlight: '#fff',
      colorText: theme.colors.text800,
      colorBorder: theme.colors.blue800,
      colorBorderBg: theme.colors.text800,
      colorTextLightSolid: theme.colors.text800,
      borderRadius: 4
    },
    Switch: {
      colorPrimary: '#2b5c8a', // main toggle "on" color
      colorPrimaryHover: '#1f3551',
      colorPrimaryBorder: '#cc00cc', // used for "chosen" outline (manually applied)
      handleSize: 30,
      trackHeight: 34,
      trackMinWidth: 66,
      borderRadius: 100,
      colorBgContainerDisabled: theme.colors.text500
    },
    Tabs: {
      colorPrimary: '#355C8C', // active indicator line
      colorBgContainer: '#ffffff',
      colorText: '#1A1A1A',
      colorTextHeading: '#1A1A1A',
      colorTextDisabled: '#999999',
      inkBarColor: '#355C8C',
      horizontalItemGutter: 24,
      horizontalMargin: '0 16px 0 0',
      fontSize: 16,
      fontWeightStrong: 600
    },
    Table: {
      colorBgContainer: theme.colors.backgroundWhite,
      colorBgElevated: theme.colors.backgroundWhite,
      colorBgLayout: theme.colors.backgroundAlternative,
      colorBorder: theme.colors.blue400,
      colorBorderSecondary: theme.colors.blue300,
      controlHeight: 42,
      controlHeightSM: 42,
      controlHeightLG: 42,
      borderRadius: 8,
      fontSize: 14,
      lineHeight: 1.5,
      padding: 16,
      paddingXS: 8,
      paddingSM: 12,
      paddingLG: 24,
      margin: 30,
      marginXS: 30,
      marginSM: 30,
      marginLG: 30,
      headerBg: theme.colors.backgroundWhite,
      headerColor: theme.colors.text800,
      headerSplitColor: theme.colors.blue400,
      rowHoverBg: theme.colors.blue100,
      rowSelectedBg: theme.colors.blue200,
      rowSelectedHoverBg: theme.colors.blue300,
      rowExpandedBg: theme.colors.backgroundWhite,
      cellPaddingBlock: 12,
      cellPaddingInline: 16,
      cellPaddingBlockMD: 8,
      cellPaddingInlineMD: 12,
      cellPaddingBlockSM: 4,
      cellPaddingInlineSM: 8,
      filterDropdownBg: theme.colors.backgroundWhite,
      filterDropdownMenuBg: theme.colors.backgroundWhite,
      expandIconBg: theme.colors.backgroundWhite,
      selectionColumnWidth: 32,
      stickyScrollBarBg: theme.colors.blue400,
      stickyScrollBarBorderRadius: 4,
      paddingContentVerticalLG: 54
    }
  }
}

export default antdTheme
