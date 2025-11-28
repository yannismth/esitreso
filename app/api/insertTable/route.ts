import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = createClient();
  const body = await req.json();

  const { error } = await (await supabase).from("transactions").insert([
    {
      date: body.date,
      montant: body.montant,
      libelle: body.libelle,
      categorie: body.categorie,
      type: body.type,
      note: body.note,
    },
  ]);

  console.log("Inserting transaction:", body);

  if (error) {
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 400 }
    );
  }

  return NextResponse.json({ status: "ok" });
}
