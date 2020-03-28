import React from 'react';
import styled from 'styled-components/native';
import { prop } from 'ramda';
import { useDimensions } from '@react-native-community/hooks';

import Image from 'react-native-scalable-image';

const Container = styled.View`
  width: 100%;
  height: ${prop('height')}px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;
const Text = styled.Text`
  color: #2dbe5a;
  font-size: 18px;
  margin-top: 10px;
  text-align: center;
  font-weight: 600;
`;

function AllDone() {
  const { screen } = useDimensions();

  return (
    <Container height={screen.height - 120}>
      <Image
        width={screen.width - 80}
        height={screen.height - 160}
        source={require('@/assets/icons/alldone.png')}
      />
      <Text>
        All tasks are done! You can add new ones by pressing button below.
      </Text>
    </Container>
  );
}

export default AllDone;
