import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Type__3 {
    id: bigint;
    title: string;
    description: string;
    author: string;
    pdfUrl: string;
}
export interface Type__1 {
    id: bigint;
    title: string;
    duration: bigint;
    instructor: string;
    description: string;
    price: bigint;
}
export interface Type {
    id: bigint;
    title: string;
    scheduledDate: Time;
    description: string;
    zoomLink: string;
}
export type Time = bigint;
export interface Type__2 {
    id: bigint;
    title: string;
    content: string;
    date: Time;
    dayNumber: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createEbook(title: string, description: string, author: string, pdfUrl: string): Promise<bigint>;
    createGeopoliticsLesson(title: string, content: string, date: Time, dayNumber: bigint): Promise<bigint>;
    createMasterclass(title: string, description: string, instructor: string, duration: bigint): Promise<bigint>;
    createZoomMeeting(title: string, description: string, zoomLink: string, scheduledDate: Time): Promise<bigint>;
    deleteEbook(id: bigint): Promise<void>;
    deleteGeopoliticsLesson(id: bigint): Promise<void>;
    deleteMasterclass(id: bigint): Promise<void>;
    deleteZoomMeeting(id: bigint): Promise<void>;
    enrollInMasterclass(masterclassId: bigint): Promise<void>;
    getAllEbooks(): Promise<Array<Type__3>>;
    getAllGeopoliticsLessons(): Promise<Array<Type__2>>;
    getAllMasterclasses(): Promise<Array<Type__1>>;
    getAllZoomMeetings(): Promise<Array<Type>>;
    getCallerUserRole(): Promise<UserRole>;
    getEbook(id: bigint): Promise<Type__3>;
    getGeopoliticsLesson(id: bigint): Promise<Type__2>;
    getMasterclass(id: bigint): Promise<Type__1>;
    getUserEnrollments(user: Principal): Promise<Array<bigint>>;
    getZoomMeeting(id: bigint): Promise<Type>;
    isCallerAdmin(): Promise<boolean>;
    updateEbook(id: bigint, title: string, description: string, author: string, pdfUrl: string): Promise<void>;
    updateGeopoliticsLesson(id: bigint, title: string, content: string, date: Time, dayNumber: bigint): Promise<void>;
    updateMasterclass(id: bigint, title: string, description: string, instructor: string, duration: bigint): Promise<void>;
    updateZoomMeeting(id: bigint, title: string, description: string, zoomLink: string, scheduledDate: Time): Promise<void>;
}
