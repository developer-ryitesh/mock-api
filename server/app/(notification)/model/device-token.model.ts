import { Firestore } from "../../../libs/firebase";

interface IDeviceTokenModal {
   id?: string;
   userId: string;
   deviceToken: string;
}

const DeviceToken = new Firestore<IDeviceTokenModal>("deviceTokens");
export default DeviceToken;
export type { IDeviceTokenModal };
