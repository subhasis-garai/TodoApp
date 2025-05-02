import React from 'react';
import { StatusBar, View, Platform, StyleSheet } from 'react-native';
import { Props } from '../types/StatusBarType';

const CustomStatusBar: React.FC<Props> = ({
  backgroundColor,
  barStyle = 'light-content',
}) => {
  return (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <StatusBar
        translucent
        backgroundColor={backgroundColor}
        barStyle={barStyle}
      />
    </View>
  );
};

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 24;

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});

export default CustomStatusBar;
