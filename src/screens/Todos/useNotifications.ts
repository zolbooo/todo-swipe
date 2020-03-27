import { useEffect, useRef, useCallback } from 'react';
import PushNotification from 'react-native-push-notification';

import { TodoItem } from '@/hooks/useTodoItems';
import { useAppState } from '@/hooks/useAppState';

const notificationDelay = 5 * 60 * 1000;

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
    if (todos.length === 0) return;
    if (pendingNotificationRef.current && appState === 'active') {
      cancelNotification();
      return;
    }
    if (pendingNotificationRef.current || appState === 'active') {
      return;
    }

    PushNotification.localNotificationSchedule({
      date: new Date(Date.now() + notificationDelay),
      message: `You have ${todos.length} tasks to do!`,
      id: '1',
      userInfo: { id: '1' },
    });
    pendingNotificationRef.current = true;

    const timeout = setTimeout(cancelNotification, notificationDelay);
    return () => clearTimeout(timeout);
  }, [todos.length, appState]);
}
