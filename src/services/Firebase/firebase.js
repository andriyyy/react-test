import app from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

class Firebase {
  constructor() {
    /* Helper */

    this.serverValue = app.database.ServerValue;
    this.emailAuthProvider = app.auth.EmailAuthProvider;

    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  // *** User API ***
  user = uid => this.db.ref(`users/${uid}`);
  users = () => this.db.ref("users");

  // *** Events API ***

  item = uid => this.db.ref(`items/${uid}`);
  items = () => this.db.ref("items");

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once("value")
          .then(snapshot => {
            const dbUser = snapshot.val();
            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser
            };
            next(authUser);
          });
      } else {
        fallback();
      }
    });

  onSaveItems = (picture, saveItem, updateState) => {
    app
      .storage()
      .ref()
      .child(`/pictures/${new Date().getTime()}`)
      .put(picture)
      .then(snapshot => {
        snapshot.ref.getDownloadURL().then(function(downloadURL) {
          saveItem(downloadURL);
          updateState();
        });
      });
  };

  onRemoveItems = (uid, updateState) => {
    this.item(uid)
      .remove()
      .then(() => {
        updateState();
      });
  };

  doSignOut = () => this.auth.signOut();
}

export default Firebase;
