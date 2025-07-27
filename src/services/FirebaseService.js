import {
	collection,
	doc,
	getDoc,
	getDocs,
	addDoc,
	updateDoc,
	deleteDoc,
} from 'firebase/firestore';
import { db } from '../config/firebase';

export class FirebaseService {
	constructor(collectionName) {
		this.collectionName = collectionName;
	}

	async getAll() {
		try {
			const collectionRef = collection(db, this.collectionName);
			const snapshot = await getDocs(collectionRef);
			const data = snapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id, // Esto agrega el ID del documento de Firestore
			}));
			return data;
		} catch (error) {
			console.error(`Error getting all ${this.collectionName}:`, error);
			throw new Error(`Failed to fetch ${this.collectionName}`);
		}
	}

	async getById(id) {
		try {
			const docRef = doc(db, this.collectionName, id);

			const docSnap = await getDoc(docRef);

			if (!docSnap.exists()) {
				throw new Error(`${this.collectionName} not found`);
			}

			const data = {
				...docSnap.data(),
				id: docSnap.id,
			};
			return data;
		} catch (error) {
			console.error(`Error getting ${this.collectionName} by ID:`, error);
			throw error;
		}
	}

	async create(data) {
		try {
			const collectionRef = collection(db, this.collectionName);
			const docRef = await addDoc(collectionRef, data);
			return {
				id: docRef.id,
				...data,
			};
		} catch (error) {
			console.error(`Error creating ${this.collectionName}:`, error);
			throw new Error(`Failed to create ${this.collectionName}`);
		}
	}

	async update(id, data) {
		try {
			const docRef = doc(db, this.collectionName, id);
			await updateDoc(docRef, data);
			return {
				id,
				...data,
			};
		} catch (error) {
			console.error(`Error updating ${this.collectionName}:`, error);
			throw new Error(`Failed to update ${this.collectionName}`);
		}
	}

	async delete(id) {
		try {
			const docRef = doc(db, this.collectionName, id);
			await deleteDoc(docRef);
			return id;
		} catch (error) {
			console.error(`Error deleting ${this.collectionName}:`, error);
			throw new Error(`Failed to delete ${this.collectionName}`);
		}
	}
}

export const productsService = new FirebaseService('productos');
export const usersService = new FirebaseService('usuarios');
