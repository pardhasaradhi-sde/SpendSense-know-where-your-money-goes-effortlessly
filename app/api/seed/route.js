import { seedTransactions } from "@/actions/seed";
import { publicAj } from "@/lib/arcjet";

export async function GET(req) {
  // Arcjet protection
  const decision = await publicAj.protect(req);
  if (decision.isDenied()) {
    return Response.json(
      { error: "Too many requests or suspicious activity" },
      { status: decision.reason === "RATE_LIMIT" ? 429 : 403 }
    );
  }

  const res = await seedTransactions();
  return Response.json(res);
}