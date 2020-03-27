import React from 'react';
import styled from 'styled-components/native';
import { prop } from 'ramda';
import { Animated } from 'react-native';

export type Food = { id: string; uri: any };

const FoodContainer = styled(Animated.View)`
  width: ${prop('width')}px;
  height: ${prop('height')}px;
  padding: 10px;
  position: absolute;
`;
const FoodPicture = styled.Image`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 20px;
`;

const FoodItem = ({
  food,
  width,
  height,
  style,
  ...props
}: {
  food: Food;
  width: number;
  height: number;
  style?: any;
}) => {
  return (
    <FoodContainer
      key={food.id}
      width={width}
      height={height}
      style={style}
      {...props}
    >
      <FoodPicture source={food.uri} />
    </FoodContainer>
  );
};

export default FoodItem;
