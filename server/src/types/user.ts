import z from "zod";
import type { User } from "../generated/prisma/client";

export const registerUserSchema = z.object({
  email: z.email("digite um email válido"),
  name: z.string().min(1, "Digite um nome válido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export type RegisterUserInput = z.infer<typeof registerUserSchema>;

export type RegisterUser = Omit<User, "password">;
