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

  update = updates => this.db.ref().update(updates);
  items_enrolments = iid => this.db.ref(`items_enrolments/${iid}`);
  users_enrolments = (uid, iid) => this.db.ref(`users_enrolments/${uid}/${iid}`);

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

  onRemoveItems = (iid, updateState) => {

    this.item(iid).remove().then(()=>{
      this.items_enrolments(iid).once("value")
      .then(snapshot => {
        return snapshot.val();
      }).then( usersId => {
        this.items_enrolments(iid).remove();
        Object.keys(usersId).map(userId => {
          this.users_enrolments(userId, iid).remove();
        })
      }
      );
    });

    updateState();
  };

  doSignOut = () => this.auth.signOut();
}

export default Firebase;
