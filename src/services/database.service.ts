import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  type FirestoreDataConverter,
  type QueryDocumentSnapshot,
  type SnapshotOptions,
} from 'firebase/firestore'
import { firebaseDb } from './firebase'

type EntityData = object

const createConverter = <TEntity extends EntityData>(): FirestoreDataConverter<TEntity> => ({
  toFirestore: (value: TEntity) => value,
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ) => snapshot.data(options) as TEntity,
})

export const databaseService = {
  async getById<TEntity extends EntityData>(
    collectionName: string,
    id: string,
  ): Promise<TEntity | null> {
    const documentRef = doc(firebaseDb, collectionName, id).withConverter(
      createConverter<TEntity>(),
    )
    const snapshot = await getDoc(documentRef)

    return snapshot.exists() ? snapshot.data() : null
  },

  async list<TEntity extends EntityData>(collectionName: string): Promise<TEntity[]> {
    const collectionRef = collection(firebaseDb, collectionName).withConverter(
      createConverter<TEntity>(),
    )
    const snapshot = await getDocs(collectionRef)

    return snapshot.docs.map((item) => item.data())
  },

  async save<TEntity extends EntityData>(
    collectionName: string,
    id: string,
    data: TEntity,
  ): Promise<void> {
    const documentRef = doc(firebaseDb, collectionName, id).withConverter(
      createConverter<TEntity>(),
    )

    await setDoc(documentRef, data, { merge: true })
  },
}
