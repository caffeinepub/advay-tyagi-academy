import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface MasterclassType {
    id: bigint;
    title: string;
    description: string;
    instructor: string;
    duration: bigint;
    price: bigint;
}
export interface GeopoliticsLessonType {
    id: bigint;
    title: string;
    content: string;
    date: bigint;
    dayNumber: bigint;
}
export interface EbookType {
    id: bigint;
    title: string;
    description: string;
    author: string;
    pdfUrl: string;
}
export interface ZoomMeetingType {
    id: bigint;
    title: string;
    description: string;
    zoomLink: string;
    scheduledDate: bigint;
}
export type Time = bigint;
export interface backendInterface {
    isCallerAdmin(): Promise<boolean>;
    isCallerPremium(): Promise<boolean>;
    grantPremium(user: Principal): Promise<void>;
    revokePremium(user: Principal): Promise<void>;
    getAllPremiumUsers(): Promise<Array<Principal>>;
    createMasterclass(title: string, description: string, instructor: string, duration: bigint): Promise<bigint>;
    getMasterclass(id: bigint): Promise<MasterclassType>;
    getAllMasterclasses(): Promise<Array<MasterclassType>>;
    updateMasterclass(id: bigint, title: string, description: string, instructor: string, duration: bigint): Promise<void>;
    deleteMasterclass(id: bigint): Promise<void>;
    createGeopoliticsLesson(title: string, content: string, date: Time, dayNumber: bigint): Promise<bigint>;
    getGeopoliticsLesson(id: bigint): Promise<GeopoliticsLessonType>;
    getAllGeopoliticsLessons(): Promise<Array<GeopoliticsLessonType>>;
    updateGeopoliticsLesson(id: bigint, title: string, content: string, date: Time, dayNumber: bigint): Promise<void>;
    deleteGeopoliticsLesson(id: bigint): Promise<void>;
    createEbook(title: string, description: string, author: string, pdfUrl: string): Promise<bigint>;
    getEbook(id: bigint): Promise<EbookType>;
    getAllEbooks(): Promise<Array<EbookType>>;
    updateEbook(id: bigint, title: string, description: string, author: string, pdfUrl: string): Promise<void>;
    deleteEbook(id: bigint): Promise<void>;
    createZoomMeeting(title: string, description: string, zoomLink: string, scheduledDate: Time): Promise<bigint>;
    getZoomMeeting(id: bigint): Promise<ZoomMeetingType>;
    getAllZoomMeetings(): Promise<Array<ZoomMeetingType>>;
    updateZoomMeeting(id: bigint, title: string, description: string, zoomLink: string, scheduledDate: Time): Promise<void>;
    deleteZoomMeeting(id: bigint): Promise<void>;
    enrollInMasterclass(masterclassId: bigint): Promise<void>;
    getUserEnrollments(user: Principal): Promise<Array<bigint>>;
}
