// components/Icon.tsx
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = {
  name: string;
  size?: number;
  color?: string;
  onPress?: () => void;
};

const AppIcon: React.FC<Props> = ({ name, size = 24, color = '#000', onPress }) => {
  return <Icon name={name} size={size} color={color} onPress={onPress} />;
};

export default AppIcon;
