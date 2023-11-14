// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
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
import {
  getFirestore,
  getDoc,
  setDoc,
  doc,
  addDoc,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  onSnapshot,
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
const firebaseConfig = {
  apiKey: 'AIzaSyATVqyjX-6l2l7CS3hlYikEE_97ZUQrRh4',
  authDomain: 'e-commerce-2ffe8.firebaseapp.com',
  projectId: 'e-commerce-2ffe8',
  storageBucket: 'e-commerce-2ffe8.appspot.com',
  messagingSenderId: '639609035969',
  appId: '1:639609035969:web:c9b630affeb07ce9140840',
  measurementId: 'G-YQENDHMBS7',
};

// firebase service
class Firebase {
  constructor(config) {
    this.app = initializeApp(config);
    this.auth = getAuth(this.app);
    this.database = getFirestore(this.app);
    this.storage = getStorage(this.app);
  }
  // createUser email/password
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
    // download url
    const photoURL = await this.imageUpload(avater, pathName);

    // profile update
    await updateProfile(this.auth.currentUser, {
      displayName,
      photoURL,
      phoneNumber,
    });
    //   user profile create
    await this.addModelByID('Users', user.uid, {
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
      imgUrl = await this.imageUpload(avater, storeRef);
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
    await this.addModelByID('users', user.uid, {
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

  // addDoc and set ID manually
  addModelByID(model, docId, data) {
    return setDoc(doc(this.database, model, docId), data);
  }

  // add doc and ID auto generate
  addModel(model, data) {
    return addDoc(collection(this.database, model), data);
  }

  // getData by id
  async getDocById(model, docId) {
    const user = await getDoc(doc(this.database, model, docId));
    // if(!user.exists) return console.log()
    return user.data();
  }

  // get all products
  async getProducts(model, query) {
    const q = query(collection(this.database, model), limit(2));
    let productList = [];
    const unsubscribe = onSnapshot(q, (query) => {
      query.forEach((product) => {
        productList.push({ ...product.data(), product_id: product.id });
      });
    });

    // let productList = [];
    // const products = await getDocs(q);
    // products.forEach((item) => {
    //   const product = item.data();
    //   productList.push({ ...product, id: item.id });
    // });
    return { productList, unsubscribe };
  }

  // upload single image
  async imageUpload(file, pathName) {
    if (!file) {
      return;
    }
    const storageRef = ref(this.storage, pathName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    await new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        () => {},
        (error) => {
          reject(error);
        },
        () => {
          resolve();
        }
      );
    });
    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    return downloadURL;
  }

  async ProductUpload(product) {
    delete product.type;
    delete product.value;
    let url = [];
    if (product.images) {
      const items = Array.from(product.images);
      url = await Promise.all(
        items.map(
          async (file) => await this.imageUpload(file, `Images/${file.name}`)
        )
      );
    }

    // upload product
    await this.addModel('Products', { ...product, images: url });
  }
}

export default new Firebase(firebaseConfig);
