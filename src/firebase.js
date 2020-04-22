import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};
// Initialize Firebase

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.db = app.firestore();
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  async register(name, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.auth.currentUser.updateProfile({
      displayName: name,
    });
  }

  addQuote(quote) {
    if (!this.auth.currentUser) {
      return alert("Not authorized");
    }

    return this.db.doc(`quotes/${this.auth.currentUser.uid}`).set({
      quote,
    });
  }

  isInitialized() {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged(resolve);
    });
  }
  getCurrentUser() {
    return this.auth.currentUser;
  }
  async getQuote() {
    if (!this.getCurrentUser()) {
      return null;
    }
    const quote = await this.db
      .collection("users")
      .doc(this.auth.currentUser.uid)
      .get();
    return quote.get("quote");
  }

  getDisplayName() {
    if (this.getCurrentUser()) {
      return this.auth.currentUser.displayName;
    }

    return null;
  }

  signOut() {
    if (!this.getCurrentUser()) {
      return null;
    }

    return this.auth.signOut();
  }
}

export default new Firebase();
