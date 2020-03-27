import { pipe, prop, __ } from 'ramda';

import palette from '@/assets/palette.json';

export const pickFromPalette = pipe(
  prop('color') as (arg: {
    color: string;
  }) => 'white' | 'black' | 'red' | 'blue' | 'green' | 'yellow',
  prop(__, palette),
);
