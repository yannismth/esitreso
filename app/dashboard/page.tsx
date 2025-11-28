/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import AddLine from "@/components/addline";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";
type transactionData = {
  date: string;
  montant: number;
  libelle: string;
  categorie: string;
  type: string;
  note: string;
};
export default function Dashboard() {
  const [transaction, setTransaction] = useState<transactionData[]>([]);

  const fetchTable = async () => {
    const res = await fetch("/api/getTable");
    const data = await res.json();
    setTransaction(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchTable();
    };
    fetchData();
  }, [fetchTable]);
  return (
    <div className="w-full h-screen">
      <div className="w-full flex items-end justify-between p-6">
        <div>
          <h1 className="font-bold text-xl">Transactions</h1>
          <p className="text-muted-foreground text-sm">
            Vue d&apos;ensemble sur vos trésoreries
          </p>
        </div>
        <div className="flex gap-2">
          <AddLine />
          <Button variant={"outline"}>
            <Upload />
            Importer un relevé
          </Button>
        </div>
      </div>
      <div className="px-6">
        <Table className="w-full border rounded-lg overflow-hidden">
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Libellé</TableHead>
              <TableHead>Montant</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Note</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transaction.map((t, index) => (
              <TableRow key={index}>
                <TableCell>{t.date}</TableCell>
                <TableCell>{t.libelle}</TableCell>
                <TableCell>{t.montant.toFixed(2)} €</TableCell>
                <TableCell>{t.categorie}</TableCell>
                <TableCell>{t.type}</TableCell>
                <TableCell>{t.note}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
