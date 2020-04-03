import React from 'react';
import styled from 'styled-components/native';

const Button = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  margin-bottom: 60px;
`;
const AddIcon = styled.Image`
  width: 100%;
  height: 100%;
`;

function AddButton({ onPress }: { onPress: () => void }) {
  return (
    <Button
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
      }}
      onPress={onPress}
    >
      <AddIcon source={require('@/assets/icons/add.png')} />
    </Button>
  );
}

export default AddButton;
