import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { FirebaseApp } from './firebase.config';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';

// firebase database method
class DatabaseMethod extends FirebaseApp {
  constructor() {
    super();
  }

  addModelByID(model, docId, data) {
    return setDoc(doc(this.database, model, docId), data);
  }

  // add doc and ID auto generate
  addModel(model, data) {
    return addDoc(collection(this.database, model), {
      ...data,
      timestamp: serverTimestamp(),
    });
  }

  /**
   * @param {*} model
   * @param {*} docId
   * @returns  singleProduct
   */
  getDocById(model, docId) {
    return getDoc(doc(this.database, model, docId));
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
}

export const dbMethod = new DatabaseMethod();
