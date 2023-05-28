export type Appointment = {
    _id: string;
    doctor: {
        _id: string;
        name: string;
    },
    patient: {
        _id: string;
        name: string;
    },
    description: string;
    date: string;
    status: "pending" | "accepted" | "declined";
}