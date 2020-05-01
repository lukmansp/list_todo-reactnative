import firebase from 'firebase';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAVf6cS5F5ACJgieP2tFe_YEB_vzKN5OQ8',
  authDomain: 'todo-app-a13d9.firebaseapp.com',
  databaseURL: 'https://todo-app-a13d9.firebaseio.com',
  projectId: 'todo-app-a13d9',
  storageBucket: 'todo-app-a13d9.appspot.com',
  messagingSenderId: '652299820932',
  appId: '1:652299820932:web:e0caa4eee26424f30f87d1',
};
class Fire {
  constructor(callback) {
    this.init(callback);
  }
  init(callback) {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        callback(null, user);
      } else {
        firebase
          .auth()
          .signInAnonymously()
          .catch((error) => {
            callback(error);
          });
      }
    });
  }
  getLists(callback) {
    let ref = this.ref.orderBy('name');
    this.unsubscribe = ref.onSnapshot((snapshot) => {
      lists = [];

      snapshot.forEach((doc) => {
        lists.push({id: doc.id, ...doc.data()});
      });
      callback(lists);
    });
  }
  addList(list) {
    let ref = this.ref;
    ref.add(list);
  }
  updateList(list) {
    let ref = this.ref;
    ref.doc(list.id).update(list);
  }
  get userId() {
    return firebase.auth().currentUser.uid;
  }
  get ref() {
    return firebase
      .firestore()
      .collection('users')
      .doc(this.userId)
      .collection('lists');
  }
  detach() {
    this.unsubscribe();
  }
}
export default Fire;
