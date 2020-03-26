import { pipe, prop } from 'ramda';
import { useEffect, useState } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

type DimensionsChangeEvent = { window: ScaledSize; screen: ScaledSize };
type DimensionsChangeEventHandler = (event: DimensionsChangeEvent) => void;

export function useDimensions() {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const handleChange: DimensionsChangeEventHandler = pipe(
      prop('window'),
      setDimensions,
    );
    Dimensions.addEventListener('change', handleChange);
    return Dimensions.removeEventListener('change', handleChange);
  }, []);

  return dimensions;
}
