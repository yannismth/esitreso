"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
export default function AddLine() {
  const [date, setDate] = useState("");
  const [montant, setMontant] = useState(0);
  const [libelle, setLibelle] = useState("");
  const [categorie, setCategorie] = useState("");
  const [type, setType] = useState("");
  const [note, setNote] = useState("");
  const handleSubmit = async () => {
    await fetch("api/insertTable", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date,
        montant,
        libelle,
        categorie,
        type,
        note,
      }),
    });
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="cursor-pointer">
            <Plus />
            Ajouter une transaction
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter une nouvelle ligne</DialogTitle>
            <DialogDescription>
              Ajoutez une nouvelle ligne dans le tableau de suivi de trésorerie
            </DialogDescription>
          </DialogHeader>
          <div className="w-full h-full">
            {/*Main*/}
            <div>
              <div className="flex gap-4 w-full">
                <div className="w-6/12">
                  <label htmlFor="date" className="font-semibold">
                    Date
                  </label>
                  <Input
                    type="date"
                    className="mt-2"
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div className="w-6/12">
                  <label htmlFor="amount" className="font-semibold">
                    Montant (€)
                  </label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    className="mt-2"
                    onChange={(e) => setMontant(Number(e.target.value))}
                  />
                </div>
              </div>
              <div className="mt-5">
                <label htmlFor="libelle" className="font-semibold">
                  Libellé
                </label>
                <Input
                  type="text"
                  className="mt-2"
                  placeholder="Description de la transaction..."
                  onChange={(e) => setLibelle(e.target.value)}
                />
              </div>
              <div className="w-full flex gap-4">
                <div className="mt-4 w-6/12">
                  <label htmlFor="categories" className="font-semibold">
                    Catégorie
                  </label>
                  <Select onValueChange={(value) => setCategorie(value)}>
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue placeholder="Select a categorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Catégorie</SelectLabel>
                        <SelectItem value="CB">CB</SelectItem>
                        <SelectItem value="VIR">VIR</SelectItem>
                        <SelectItem value="PREL">PREL</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-6/12 mt-4">
                  <label htmlFor="categories" className="font-semibold">
                    Type
                  </label>
                  <Select onValueChange={(value) => setType(value)}>
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue placeholder="Select a categorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Type</SelectLabel>
                        <SelectItem value="CB">Fixe</SelectItem>
                        <SelectItem value="VIR">Variable</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <label htmlFor="note" className="font-semibold ">
                Note (optionnelle)
              </label>
              <Input
                placeholder="Ajouter une note.."
                className="mt-2"
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
            {/*Main*/}
          </div>
          <DialogFooter className="mt-2">
            <Button variant={"outline"} className="cursor-pointer">
              Annuler
            </Button>
            <Button className="cursor-pointer" onClick={handleSubmit}>
              Ajouter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
