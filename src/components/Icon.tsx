import React from 'react';
import {AntDesign, type AntDesignIconName} from '@react-native-vector-icons/ant-design/static';
import {Feather, type FeatherIconName} from '@react-native-vector-icons/feather/static';
import {FontAwesome, type FontAwesomeIconName} from '@react-native-vector-icons/fontawesome/static';
import {Ionicons, type IoniconsIconName} from '@react-native-vector-icons/ionicons/static';
import {Lucide, type LucideIconName} from '@react-native-vector-icons/lucide/static';
import {
  MaterialIcons,
  type MaterialIconsIconName,
} from '@react-native-vector-icons/material-icons/static';

import {colors} from '../theme';

type CommonProps = {color?: string; size?: number};
type Props =
  | ({family?: 'lucide'; name: LucideIconName} & CommonProps)
  | ({family: 'ant-design'; name: AntDesignIconName} & CommonProps)
  | ({family: 'feather'; name: FeatherIconName} & CommonProps)
  | ({family: 'fontawesome'; name: FontAwesomeIconName} & CommonProps)
  | ({family: 'ionicons'; name: IoniconsIconName} & CommonProps)
  | ({family: 'material-icons'; name: MaterialIconsIconName} & CommonProps);

export function Icon({color = colors.text.primary, family = 'lucide', name, size = 20}: Props) {
  switch (family) {
    case 'ant-design':
      return <AntDesign color={color} name={name as AntDesignIconName} size={size} />;
    case 'feather':
      return <Feather color={color} name={name as FeatherIconName} size={size} />;
    case 'fontawesome':
      return <FontAwesome color={color} name={name as FontAwesomeIconName} size={size} />;
    case 'ionicons':
      return <Ionicons color={color} name={name as IoniconsIconName} size={size} />;
    case 'material-icons':
      return <MaterialIcons color={color} name={name as MaterialIconsIconName} size={size} />;
    default:
      return <Lucide color={color} name={name as LucideIconName} size={size} />;
  }
}

export type {Props as IconProps};
