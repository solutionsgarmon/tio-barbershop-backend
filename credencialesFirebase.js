
const firebaseConfig = {
  apiKey: "AIzaSyCvgB5HqI1DFy2CeGNy3i4p2z2nM0tg7Zk",
  authDomain: "storage-eltio-barbershop.firebaseapp.com",
  projectId: "storage-eltio-barbershop",
  storageBucket: "storage-eltio-barbershop.appspot.com",
  messagingSenderId: "358256203753",
  appId: "1:358256203753:web:14dd2824551a0446881d78"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export const auth = getAuth(appFirebase) 

export default appFirebase; // Exporta las instancias de Firebase