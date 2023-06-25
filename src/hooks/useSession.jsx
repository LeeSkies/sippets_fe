import { useContext, useEffect } from 'react';
import { UserContext } from '../context/userContext';

export const useSession = async (cb) => {
  const { refresh } = useContext(UserContext);

  useEffect(() => {
    // Notification.requestPermission();
    refresh(cb);
  }, []);

}
