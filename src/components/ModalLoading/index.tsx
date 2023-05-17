
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, Modal, TouchableOpacity, View } from 'react-native';
import Animated, { interpolate, runOnJS, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import styles from './styles';
import { Colors, TypoGrayphy } from '@/assets/styles';
import { logoWhite } from '@/assets/icons';
import Text from '../Text';
interface Props {
  type?: string,
  closeOnTouchOutside?: boolean,
}
const ModalLoadingIndicator = ({ type = 'ThreeBounce', closeOnTouchOutside = true }: Props) => {
  const anim = useSharedValue(0);
  const animHide = useSharedValue(1);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    return () => {
      onHide && onHide();
    };
  }, []);

  const logoStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(anim.value, [0, 1], [1, 0.5])
        },
        {
          rotateZ: `${anim.value * 360}deg`
        }
      ]
    };
  });
  const modalContainerStyles = useAnimatedStyle(() => {
    return {
      opacity: animHide.value
    };
  });
  const onStartAnimation = React.useCallback(() => {
    anim.value = withRepeat(withTiming(1, { duration: 1000 }), -1, true);
  }, [anim]);

  const onHide = React.useCallback(() => {
    anim.value = withTiming(0);
    animHide.value = withTiming(0, {}, isFinished => isFinished && runOnJS(setHide)(true));
  }, [anim, animHide]);

  return (
    <Modal visible>
      <Animated.View style={[styles.modalContainer, modalContainerStyles]}>
        <View style={styles.container}>
          <Animated.View style={styles.overlay}>
            <TouchableOpacity disabled={!closeOnTouchOutside} onPress={onHide} style={styles.backdrop} />
          </Animated.View>
          <Animated.View onLayout={onStartAnimation} style={logoStyles}>
            <Image style={styles.logo} source={logoWhite} />
          </Animated.View>
          <View style={styles.tipContainer}>
            <View style={{ height: 5 }} />
            <Text style={{ color: Colors.backgroudWhite, ...TypoGrayphy.bodyMediumTextBold }} >
              Loading...
            </Text>
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
};

export default ModalLoadingIndicator;
