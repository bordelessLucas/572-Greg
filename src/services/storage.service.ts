import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
  type UploadMetadata,
  type UploadResult,
} from 'firebase/storage'
import { firebaseStorage } from './firebase'

export const storageService = {
  upload(path: string, file: Blob, metadata?: UploadMetadata): Promise<UploadResult> {
    return uploadBytes(ref(firebaseStorage, path), file, metadata)
  },

  getUrl(path: string): Promise<string> {
    return getDownloadURL(ref(firebaseStorage, path))
  },

  remove(path: string): Promise<void> {
    return deleteObject(ref(firebaseStorage, path))
  },
}
