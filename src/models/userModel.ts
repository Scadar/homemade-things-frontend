export interface IUser {
    id: number;
    createdAt: string;
    isActive: boolean;
    email: string;
    firstName?: string;
    lastName?: string;
    username: string;
    emailIsVerified: boolean;
    roles: string[];
}

export interface ILoginResponse {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiryDuration: number;
}

export enum Device {
    DEVICE_TYPE_ANDROID = "DEVICE_TYPE_ANDROID",

    DEVICE_TYPE_IOS = "DEVICE_TYPE_IOS",

    DEVICE_TYPE_DESKTOP = "DEVICE_TYPE_DESKTOP",

    DEVICE_TYPE_TABLET = "DEVICE_TYPE_TABLET"
}

export interface DeviceInfo {
    deviceId: string
    deviceType: Device
    notificationToken: string
}