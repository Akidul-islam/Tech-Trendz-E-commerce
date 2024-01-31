import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { FirebaseApp } from './firebase.config';
import { dbMethod } from './common';

class Product extends FirebaseApp {
  constructor() {
    super();
  }
  //
  getProducts = (model, params) => {
    return new Promise((resolve, reject) => {
      let baseQuery = query(collection(this.database, model));
      // query item exits
      if (params) {
        params.forEach((q) => {
          baseQuery = query(baseQuery, where(q.key, q.operator, q.value));
        });
      }
      const unsubscribe = onSnapshot(
        baseQuery,
        (items) => {
          let productList = [];
          items.forEach((product) => {
            productList.push({ ...product.data(), product_id: product.id });
          });
          resolve(productList);
        },
        (error) => {
          reject(error);
        }
      );
      return unsubscribe;
    });
  };

  //product uplaod
  async ProductUpload(product) {
    delete product.type;
    delete product.value;
    let url = [];
    if (product.images) {
      const items = Array.from(product.images);
      url = await Promise.all(
        items.map(
          async (file) =>
            await dbMethod.imageUpload(file, `Images/${file.name}`)
        )
      );
    }
    // upload product
    await dbMethod.addModel('Products', { ...product, images: url });
  }

  async getProduct(model, id) {
    const product = await dbMethod.getDocById(model, id);
    return product.data();
  }
}

export const productSdk = new Product();
