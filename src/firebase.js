import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const firebaseConfig = {
	apiKey: 'AIzaSyCSYqK8qdwv7WUn-StmNmOcXARVUQYI8Pc',
	authDomain: 'pixelpursuit-ea82e.firebaseapp.com',
	projectId: 'pixelpursuit-ea82e',
	storageBucket: 'pixelpursuit-ea82e.appspot.com',
	messagingSenderId: '134618637955',
	appId: '1:134618637955:web:befb157e5c1dc82b489db6',
	measurementId: 'G-VHJ9080BLP',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get a list of menu cards
export async function getMenuCards() {
	const cardsDataCollection = collection(db, 'Menu Select Cards Data');
	const cardsDataSnapshot = await getDocs(cardsDataCollection);
	const cardsDataList = cardsDataSnapshot.docs.map((doc) => doc.data());
	return cardsDataList;
}
