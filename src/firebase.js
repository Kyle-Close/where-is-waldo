import { initializeApp } from 'firebase/app';
import {
	getFirestore,
	collection,
	getDocs,
	doc,
	setDoc,
} from 'firebase/firestore/lite';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';

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

export async function getAllMaps() {
	const storage = getStorage();
	const listRef = ref(storage); // Reference to the root directory

	// Get list of all files
	const res = await listAll(listRef);

	// Array to store all the download URLs
	let urls = [];

	// Loop over each item
	for (let item of res.items) {
		// Get the download URL for each item and push it to the urls array
		let url = await getDownloadURL(item);
		urls.push(url);
	}

	return urls;
}

export async function getAllMapsData() {
	const db = getFirestore();
	const querySnapshot = await getDocs(collection(db, 'maps_test1'));
	const documents = querySnapshot.docs.map((doc) => doc.data());

	return documents;
}

export async function setFirebaseMapData(mapsData) {
	mapsData.forEach(async (map) => {
		await setDoc(doc(db, 'maps_test1', map.mapName), map);
	});
	console.log('Documents successfully written!');
}

export async function retrieveFoldersAndImages() {
	const storage = getStorage();
	const parentFolderRef = ref(storage, 'Header-Images');

	try {
		const folderRefs = await listAll(parentFolderRef);

		const folderArray = [];

		for (const folderRef of folderRefs.prefixes) {
			const folderName = folderRef.name.split('/').pop(); // Extract the last element of the array
			const images = await getImagesInFolder(folderRef);

			const folderObject = {
				folderName: folderName,
				images: images,
			};

			folderArray.push(folderObject);
		}

		console.log(folderArray);
		return folderArray;
	} catch (error) {
		console.log(error);
	}
}

async function getImagesInFolder(folderRef) {
	const items = await listAll(folderRef);

	const imagePromises = items.items.map(async (item) => {
		const url = await getDownloadURL(item);
		return url;
	});

	const images = await Promise.all(imagePromises);

	return images;
}
