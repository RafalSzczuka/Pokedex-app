import React, {useRef, useEffect} from 'react';
import {Animated} from 'react-native';

const AnimatedBar = ({value, index}) => {
  const width = useRef(new Animated.Value(0)).current;

  const animate = () => {
    Animated.timing(width, {
      toValue: value,
      delay: index * 195,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    animate();
    //eslint-disable-next-line
  }, [value]);

  const interpolatedValue = width.interpolate({
    inputRange: [0, 255],
    outputRange: [0, 170],
  });

  return <Animated.View style={[styles.bar, {width: interpolatedValue}]} />;
};

const styles = {
  bar: {
    backgroundColor: '#516AAC',
    height: 10,
    borderRadius: 6,
  },
};

export default AnimatedBar;
