import { FirebaseApp } from './firebase.config';
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  updateProfile,
  setPersistence,
  browserSessionPersistence,
  updateEmail,
  updatePassword,
} from 'firebase/auth';
// database built-in method from firebase provied
import { dbMethod } from './common';

class AuthSdk extends FirebaseApp {
  constructor() {
    super();
  }
  async register({
    email,
    password,
    displayName,
    avater,
    phoneNumber,
    pathName,
  }) {
    // user create
    const { user } = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    /**  download url
     * @param avater
     * @param pathName is unique
     */
    const photoURL = await dbMethod.imageUpload(avater, pathName);

    // profile update
    await updateProfile(this.auth.currentUser, {
      displayName,
      photoURL,
      phoneNumber,
    });
    //   user profile create
    await dbMethod.addModelByID('Users', user.uid, {
      userId: user.uid,
      name: user.displayName || displayName,
      email: user.email,
      phoneNumber: user.phoneNumber || phoneNumber,
      verified: user.emailVerified,
      roles: 'customer',
      photoURL: user.photoURL || photoURL,
      create_at: Date.now(),
    });
    await this.emailVerification(user);
    return user;
  }

  // login
  async login(email, password) {
    // await setPersistence(this.auth, browserSessionPersistence);
    const { user } = await signInWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    await setPersistence(this.auth, browserSessionPersistence);

    return user;
  }

  // upload image firebase fire store and download img URL

  //user Profile update
  async userUpdateProfile({
    avater,
    displayName,
    phoneNumber,
    email,
    password,
  }) {
    const user = this.auth.currentUser;
    if (!user) return console.log('user does not exits');

    if (email) {
      const emailUp = await updateEmail(user, email);
      console.log('email update', emailUp);
    }
    if (password) {
      const update = await updatePassword(user, password);
      console.log('password', update);
    }
    let imgUrl = '';
    if (avater) {
      const storeRef = `Users/${avater}`;
      imgUrl = await dbMethod.imageUpload(avater, storeRef);
    }
    await updateProfile(user, {
      photoURL: imgUrl || user.photoURL,
      displayName: displayName || user.displayName,
      phoneNumber: phoneNumber || user.phoneNumber,
    });
  }

  // google login
  async googleLogin() {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(this.auth, provider);
    await dbMethod.addModelByID('users', user.uid, {
      userId: user.uid,
      name: user.displayName,
      email: user.email,
      verified: user.emailVerified,
      image_url: user.photoURL,
    });
    await this.emailVerification(user);
    return user;
  }

  // recapcha
  onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container',
        {
          size: 'normal',
          callback: () => {
            this.onSignup();
          },
        },
        this.auth
      );
    }
  }

  // phone SMS LOGIN
  async signInWithPhone(number) {
    this.onCaptchVerify();
    const appVerifier = window.recaptchaVerifier;
    return signInWithPhoneNumber(this.auth, number, appVerifier)
      .then((result) => {
        window.result = result;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async otpGet(code) {
    const { user } = await window.result.confirm(code);
    return user;
  }

  passwordReset() {}
  passwordRecovery() {}

  // email verified
  emailVerification(user) {
    return sendEmailVerification(user);
  }

  // creadiential
  async logOut() {
    await signOut(this.auth);
    await setPersistence(this.auth, browserSessionPersistence);
  }
}

export const authSdk = new AuthSdk();
