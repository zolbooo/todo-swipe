import { useState, useEffect } from 'react';
import { AppState } from 'react-native';

export function useAppState() {
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    AppState.addEventListener('change', setAppState);
    return () => AppState.removeEventListener('change', setAppState);
  }, []);

  return appState;
}
