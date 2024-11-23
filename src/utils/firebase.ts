
import { appState } from '../store/index';
import  {firebaseConfig} from '../firebaseConfig'
import { doc, deleteDoc } from 'firebase/firestore';
let db: any;
let auth: any;
let storage: any;
 
export const getFirebaseInstance = async () =>  {
   if (!db) {
       const  {getFirestore} = await import('firebase/firestore')
       const  {initializeApp} = await import('firebase/app');
       const  {getAuth } = await import('firebase/auth');
	   const { getStorage } = await import('firebase/storage');

       const app = initializeApp(firebaseConfig);
       db = getFirestore(app);
       auth = getAuth(app);
	   storage = getStorage();
   }
   return  {db, auth, storage};
};

export const addEvent= async (event: any) =>  {
  try {
      const { db } = await getFirebaseInstance();
      const { collection, addDoc } = await import('firebase/firestore');

      const where = collection(db, 'events');
      const registerPost =  {
        title: event.title,
        date: new Date().toISOString(),
        location: event.location,
        image: event.image,
        attendees : event.attendees,
    };

      // Añadir el post y obtener la referencia del documento creado
      const docRef = await addDoc(where, registerPost);

      console.log('Se añadió con éxito el post con ID:', docRef.id);
      
      // Retorna el ID del documento creado
      return docRef.id;
   
    
      
  } catch (error) {
      console.error('Error al añadir el documento:', error);		
      throw error; // Lanzar el error para manejarlo en la llamada
  }
};

export const getEvents = async () => {
  try {
      const { db } = await getFirebaseInstance();
      const { collection, getDocs, query, orderBy } = await import('firebase/firestore');

      const postsCollection = collection(db, 'events');

      // Ordena los documentos por 'dateadded' en orden descendente
      const postsQuery = query(postsCollection, orderBy('dateadded', 'desc'));
      const querySnapshot = await getDocs(postsQuery);

      const data: any[] = [];
      querySnapshot.forEach((doc) => {
          const postData = doc.data();
          postData.id = doc.id;
          
          data.push(postData);
      });

      return data;
  } catch (error) {
      console.error('Error obteniendo los documentos:', error);
      return [];
  }
};

export const deleteEvent = async (id: string) => {
    try {
      const { db } = await getFirebaseInstance();
      const { doc, deleteDoc } = await import('firebase/firestore');
  
      // Crear referencia al documento específico
      const docRef = doc(db, 'events', id);
  
      // Eliminar el documento
      await deleteDoc(docRef);
  
      console.log(`El producto con ID ${id} ha sido eliminado correctamente.`);
    } catch (error) {
      console.error('Error al eliminar el producto de Firebase:', error);
      throw error; // Relanzar el error para manejarlo en otros niveles
    }
  };