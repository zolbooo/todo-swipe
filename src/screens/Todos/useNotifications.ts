import { useEffect, useRef, useCallback } from 'react';
import PushNotification from 'react-native-push-notification';
import { ifElse, equals, always } from 'ramda';

import { TodoItem } from '@/hooks/useTodoItems';
import { useAppState } from '@/hooks/useAppState';

const notificationDelay = 5 * 60 * 1000;

const formatTaskCount = ifElse(
  equals(1),
  always('one task'),
  (count: number) => `${count} tasks`,
);

export function useNotifications(todos: TodoItem[]) {
  useEffect(() => {
    PushNotification.cancelAllLocalNotifications();
  }, []);

  const appState = useAppState();

  const pendingNotificationRef = useRef(false);
  const cancelNotification = useCallback(() => {
    PushNotification.cancelLocalNotifications({ id: 1 });
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

    PushNotification.localNotificationSchedule({
      date: new Date(Date.now() + notificationDelay),
      message: `You have ${formatTaskCount(todos.length)} tasks to do!`,
      id: '1',
      userInfo: { id: '1' },
    });
    pendingNotificationRef.current = true;

    const timeout = setTimeout(cancelNotification, notificationDelay);
    return () => clearTimeout(timeout);
  }, [todos.length, appState]);
}
