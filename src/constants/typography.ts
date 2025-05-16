import { StyleSheet } from 'react-native';
import colors from './colors';

const typography = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    fontFamily: 'Roboto-Bold', // Optional: Custom font
  },
  body: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  muted: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    fontFamily: 'Roboto-Medium', // Optional: Custom font
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textSecondary,
    fontFamily: 'Roboto-Regular',
  },
  caption: {
    fontSize: 12,
    color: colors.textSecondary,
    fontFamily: 'Roboto-Regular',
  },
});

export default typography;
