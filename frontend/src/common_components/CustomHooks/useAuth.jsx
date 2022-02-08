import { useEffect, useState } from "react";
import { auth, db } from "../../service/firebase";
import { en } from "../../utils/language";

const useAuth = () => {
  const [authInfo, setAuthInfo] = useState({
    isAuth: false,
    username: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unlisten = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // set username and isAuth
        const uid = user.uid;
        const usernameField = await db.collection(en.USERNAMES).doc(uid).get();
        if (usernameField.exists) {
          const username = usernameField.data().username;
          setAuthInfo({
            isAuth: true,
            username,
          });
        }
      } else {
        // not authenticated
        setAuthInfo({
          isAuth: false,
          username: null,
        });
      }
      setIsLoading(false);
    });

    return () => unlisten();
  }, []);

  const { isAuth, username } = authInfo;
  return { isAuth, username, isLoading };
};

export default useAuth;
