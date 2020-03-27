import React from 'react';
import styled from 'styled-components/native';
import { prop } from 'ramda';

import palette from '@/assets/palette.json';

const ColorSelectorContainer = styled.View`
  width: 100%;
  height: 100px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
`;
const ColorItem = styled.TouchableOpacity<{ color: string }>`
  width: 30px;
  margin: 10px;
  height: 30px;
  border-width: 1px;
  border-color: grey;
  border-radius: 15px;
  background-color: ${prop('color')};
`;

function ColorSelector({
  color,
  setColor,
}: {
  color: string;
  setColor: (color: string) => void;
}) {
  return (
    <ColorSelectorContainer>
      {Object.values(palette)
        .filter((paletteColor: string) => paletteColor !== color)
        .map((paletteColor: string) => (
          <ColorItem
            onPress={() => setColor(paletteColor)}
            key={paletteColor}
            color={paletteColor}
          />
        ))}
    </ColorSelectorContainer>
  );
}

export default ColorSelector;
