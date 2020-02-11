import { Location } from './location';

export class Camera {
    cameraID: number;
    cameraName: string;
    isActive: boolean;
    macAddress: string;
    ipAddress: string;
    model: string;
    location: Location;
}