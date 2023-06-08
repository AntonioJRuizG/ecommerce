
import {initializeApp} from 'firebase/app';
import {getDownloadURL, getStorage, ref, uploadBytes} from 'firebase/storage';
import {firebaseConfig} from './firebase-config';

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export const uploadImageToFirebase = async (data, file) => {
	const randomSufix = Math.floor(Math.random() * 9999);
	const storageRef = ref(storage, `products/${data.title + '-' + randomSufix}`);
	await uploadBytes(storageRef, file);

	const imgUrl = await getDownloadURL(storageRef);
	data.images.push(imgUrl);
};
