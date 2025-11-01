import { CollectionReference, DocumentData, QueryDocumentSnapshot, UpdateData, WhereFilterOp } from "firebase-admin/firestore";
import firebase from "../configs";

export class FirestoreService<T extends DocumentData> {
   private collectionRef: CollectionReference<T>;
   private now = new Date().toISOString();

   constructor(collectionName: string) {
      this.collectionRef = firebase.db.collection(collectionName) as CollectionReference<T>;
   }

   // INSERT ONE
   async create(data: T, id?: string): Promise<T & { id: string }> {
      let docRef = id ? this.collectionRef.doc(id) : this.collectionRef.doc();

      const payload = {
         id: docRef.id,
         ...data,
         createdAt: this.now,
         updatedAt: this.now,
      };

      await docRef.set(payload);
      return payload as T & { id: string };
   }

   // INSERT MANY
   async insertMany(documents: T[]): Promise<(T & { id: string })[]> {
      const batch = firebase.db.batch();
      const results: (T & { id: string })[] = [];

      documents.forEach((docData) => {
         const docRef = this.collectionRef.doc();
         const payload = { ...docData, createdAt: this.now, updatedAt: this.now };
         batch.set(docRef, payload as T);
         results.push({ id: docRef.id, ...docData } as T & { id: string });
      });

      await batch.commit();
      return results;
   }

   // FIND ONE by ID
   async findOneById(id: string): Promise<(T & { id: string }) | null> {
      const doc = await this.collectionRef.doc(id).get();
      if (!doc.exists) return null;
      return { id: doc.id, ...doc.data() } as T & { id: string };
   }

   // FIND ONE by Field
   async findOne(filter: { field: keyof T; value: any }): Promise<(T & { id: string }) | null> {
      const snapshot = await this.collectionRef
         .where(filter.field as string, "==", filter.value)
         .limit(1)
         .get();

      if (snapshot.empty) return null;
      const doc = snapshot.docs[0];
      return { id: doc.id, ...doc.data() } as T & { id: string };
   }

   // FIND MANY
   async find(filters: Partial<Record<keyof T, any>> = {}, limit = 100, orderBy?: keyof T, orderDirection: "asc" | "desc" = "asc"): Promise<(T & { id: string })[]> {
      let query: FirebaseFirestore.Query<T> = this.collectionRef;

      Object.keys(filters).forEach((key) => {
         const value = filters[key as keyof T];
         if (value !== undefined && value !== null) {
            query = query.where(key as string, "==", value);
         }
      });

      if (orderBy) query = query.orderBy(orderBy as string, orderDirection);
      query = query.limit(limit);

      const snapshot = await query.get();
      return snapshot.docs.map((doc: QueryDocumentSnapshot<T>) => ({ id: doc.id, ...doc.data() } as T & { id: string }));
   }

   // UPDATE ONE
   async updateOne(id: string, data: Partial<T>): Promise<T & { id: string }> {
      const docRef = this.collectionRef.doc(id);
      const updateData = { ...data, updatedAt: this.now };
      await docRef.update(updateData as UpdateData<T>);
      const updatedDoc = await docRef.get();
      return { id: updatedDoc.id, ...updatedDoc.data() } as T & { id: string };
   }

   // UPDATE MANY
   async updateMany(updates: { id: string; data: UpdateData<T> }[]): Promise<(T & { id: string })[]> {
      const batch = firebase.db.batch();
      const results: (T & { id: string })[] = [];

      updates.forEach(({ id, data }) => {
         const docRef = this.collectionRef.doc(id);
         const updateData: UpdateData<T> = { ...data, updatedAt: this.now } as UpdateData<T>;
         batch.update(docRef, updateData);
         results.push({ id, ...data } as T & { id: string });
      });

      await batch.commit();
      return results;
   }

   // DELETE ONE
   async deleteOne(id: string): Promise<{ success: boolean; id: string }> {
      const docRef = this.collectionRef.doc(id);
      const doc = await docRef.get();
      if (!doc.exists) throw new Error("Document not found");

      await docRef.delete();
      return { success: true, id };
   }

   // DELETE MANY
   async deleteMany(ids: string[]): Promise<{ success: boolean; count: number }> {
      const batch = firebase.db.batch();

      ids.forEach((id) => {
         const docRef = this.collectionRef.doc(id);
         batch.delete(docRef);
      });

      await batch.commit();
      return { success: true, count: ids.length };
   }

   async query(conditions: { field: keyof T; operator: WhereFilterOp; value: any }[] = [], limit = 100, orderBy?: keyof T, orderDirection: "asc" | "desc" = "asc"): Promise<(T & { id: string })[]> {
      try {
         let query: FirebaseFirestore.Query<T> = this.collectionRef;

         conditions.forEach(({ field, operator, value }) => {
            query = query.where(field as string, operator, value);
         });

         if (orderBy) query = query.orderBy(orderBy as string, orderDirection);
         query = query.limit(limit);

         const snapshot = await query.get();
         return snapshot.docs.map((doc: QueryDocumentSnapshot<T>) => ({ id: doc.id, ...doc.data() } as T & { id: string }));
      } catch (error: any) {
         throw new Error(`Query operation failed: ${error.message}`);
      }
   }
}
