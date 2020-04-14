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
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
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
  doSignInWithEmailAndPassword = (email, password, next) =>
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        // merge auth and db user
        authUser = {
          uid: authUser.user.uid,
          email: authUser.user.email,
          emailVerified: authUser.user.emailVerified,
          providerData: authUser.user.providerData,
        };
        return authUser;
      })
      .then((authUser) => {
        next(authUser);
      });

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  // *** User API ***
  user = (uid) => this.db.ref(`users/${uid}`);
  users = () => this.db.ref("users");

  // *** Events API ***

  item = (uid) => this.db.ref(`items/${uid}`);
  items = () => this.db.ref("items");

  update = (updates) => this.db.ref().update(updates);
  items_enrolments = (iid) => this.db.ref(`items_enrolments/${iid}`);
  items_enrolments_all = () => this.db.ref(`items_enrolments`);
  users_enrolments = (uid, iid) =>
    this.db.ref(`users_enrolments/${uid}/${iid}`);
  users_enrolments_list = (uid) => this.db.ref(`users_enrolments/${uid}`);
  items_enrolments_item = (uid, iid) =>
    this.db.ref(`items_enrolments/${iid}/${uid}`);

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged((authUser) => {
      console.log("authUser", authUser);
      if (authUser) {
        this.user(authUser.uid)
          .once("value")
          .then((snapshot) => {
            const dbUser = snapshot.val();
            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };
            return authUser;
          })
          .then((authUser) => {
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
      .then((snapshot) => {
        snapshot.ref.getDownloadURL().then(function (downloadURL) {
          saveItem(downloadURL);
          updateState();
        });
      });
  };

  onRemoveItems = (iid, updateState) => {
    console.log("iid_delete", iid);
    this.item(iid)
      .remove()
      .then(() => {
        this.items_enrolments(iid)
          .once("value")
          .then((snapshot) => {
            return snapshot.val();
          })
          .then((usersId) => {
            console.log("usersId_delete", usersId);
            this.items_enrolments(iid).remove();
            if (usersId) {
              Object.keys(usersId).map((userId) => {
                return this.users_enrolments(userId, iid).remove();
              });
            } else {
              return true;
            }
          });
      });
    updateState();
  };

  onRejected = (uid, iid, updateState) => {
    this.users_enrolments(uid, iid)
      .remove()
      .then(() => {
        this.items_enrolments_item(uid, iid).remove();
      })
      .then(() => {
        updateState();
      });
  };

  onNotRejected = (uid, iid, updateState) => {
    let updates = {
      [`items_enrolments/${iid}/${uid}`]: true,
      [`users_enrolments/${uid}/${iid}`]: true,
    };
    this.update(updates).then(() => {
      updateState();
    });
  };
  doSignOut = () => this.auth.signOut();
}

export default Firebase;
