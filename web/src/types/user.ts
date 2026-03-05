export type UserRequestRegister = {
	email: string;
	name: string;
	password: string;
};

export type UserResponseRegister = {
	id: number;
    email: string;
    name: string;
    role: "ADMIN" | "USER";
    createdAt: Date;
    updatedAt: Date;
};
