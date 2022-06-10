let theme = {
  // Color Variables
  red: '#ED1D25',
  pink: '#FA3F70',
  calmPink: '#FF8E8E',
  softPink: '#FED3E0',
  black: '#090809',
  white: '#FFFFFF',
  grey: '#ccc',
  darkGrey: '	#A9A9A9',
  whiteGrey: '#f9f8fd',
  activityIndicatorColor: '#FA3F70',
  // fontSizes
  fontSizeXS: 10,
  fontSizeSmall: 12,
  fontSizeNormal: 14,
  fontSizeMedium: 16,
  fontSizeLarge: 18,
  fontSize20: 20,
  fontSize22: 22,
  fontSizeXL: 24,
  fontSize26: 26,
  fontSizeExtraXL: 28,
  fontSize30: 30,
  fontSizeXXL: 60,
  fontWeightLight: '300',
  fontWeightRegular: '400',
  fontWeightMedium: '500',
  fontWeightBold: '700',
  fontWeightSuperBold: '900',
  padding: 20,
  marginContainer: 24,
  marginHalfContainer: 12
}

const container = {
  padding: {
    padding: theme.padding
  },
  margin: {
    margin: theme.marginContainer
  },
  centerFlex: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
};

export {
  theme,
  container
};
