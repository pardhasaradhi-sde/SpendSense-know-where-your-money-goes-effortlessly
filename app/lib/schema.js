import { z } from "zod";

export const accountSchema = z.object({
    name: z.string().min(1, "name is required"),
    type: z.enum(["current", "savings"]), // Fix: enum values should be in an array
    balance: z.string().min(1, "initial balance is required"),
    isDefault: z.boolean().default(false),
});