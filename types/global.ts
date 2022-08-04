export { };

declare global {
    interface Jobs {
        key: number;
        name?: string;
        tags?: "Urgent" | "Regular" | "Trivial";
    }

    enum Tags {
        Urgent = "Urgent",
        Regular = "Regular",
        Trivial = "Trivial"
    }
}