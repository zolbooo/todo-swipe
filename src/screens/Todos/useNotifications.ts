import { useEffect, useRef, useCallback } from 'react';
import { useAppState } from '@react-native-community/hooks';
import PushNotification from 'react-native-push-notification';
import { ifElse, equals, always } from 'ramda';

import { TodoItem } from '@/hooks/useTodoItems';

const notificationDelay = 5 * 60 * 1000;

const formatNotificationMessage = ifElse(
  equals(1),
  always('You have only one task left!'),
  (count: number) => `You have ${count} tasks to do!`,
);

export function useNotifications(todos: TodoItem[]) {
  const appState = useAppState();

  const pendingNotificationRef = useRef(false);
  const cancelNotification = useCallback(() => {
    PushNotification.cancelAllLocalNotifications();
    pendingNotificationRef.current = false;
  }, []);

  useEffect(() => {
    if (appState === 'active') {
      cancelNotification();
      return;
    }
    if (todos.length === 0 || pendingNotificationRef.current) {
      return;
    }

    pendingNotificationRef.current = true;
    PushNotification.localNotificationSchedule({
      date: new Date(Date.now() + notificationDelay),
      message: formatNotificationMessage(todos.length),
      id: '1',
      userInfo: { id: '1' },
    });

    const timeout = setTimeout(cancelNotification, notificationDelay);
    return () => clearTimeout(timeout);
  }, [todos.length, appState]);
}
