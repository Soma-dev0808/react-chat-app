import { db, auth } from "../../../service/firebase";
import {
  convertFBApiResponse,
  retrieveFBErrorMessage,
} from "../../../utils/utilities";
import { routePath } from "../../../router/router";
import { en } from "../../../utils/language";

// call sign up or sign in function with user input
export async function handleSubmit(
  userInput,
  startOrEndCallApi,
  setAPIError,
  history,
  isSignUp = true
) {
  // show loading indicator
  startOrEndCallApi();

  const submit = isSignUp ? signUp : signIn;

  const res = await submit(userInput);

  if (res?.isSuccess) {
    // hide loading indicator and go to create chat page
    startOrEndCallApi(false);
    history.push(routePath.createRoom);
  } else {
    setAPIError(res.errorMessage);
  }
}

// sign up
export async function signUp({ username, email, password }) {
  const hasduplicate = await checkUsernameDuplication(username);
  if (!hasduplicate) {
    return convertFBApiResponse(false, en.USERNAME_EXISTS_ERROR);
  }
  return auth
    .createUserWithEmailAndPassword(email, password)
    .then(async (res) => {
      const uid = res.user.uid;

      // set username
      await db.collection(en.USERNAMES).doc(uid).set({
        username,
      });

      return convertFBApiResponse();
    })
    .catch((err) => convertFBApiResponse(false, retrieveFBErrorMessage(err)));
}

// sign in
export async function signIn({ email, password }) {
  return await auth
    .signInWithEmailAndPassword(email, password)
    .then(() => convertFBApiResponse())
    .catch((err) => convertFBApiResponse(false, retrieveFBErrorMessage(err)));
}

export async function signOut() {
  return auth
    .signOut()
    .catch((err) => convertFBApiResponse(false, retrieveFBErrorMessage(err)));
}

// check username is already taken. If not, return true
async function checkUsernameDuplication(username) {
  const usernames = await db.collection(en.USERNAMES).get();

  const res = await usernames.query.where("username", "==", username).get();

  return res.size === 0;
}
