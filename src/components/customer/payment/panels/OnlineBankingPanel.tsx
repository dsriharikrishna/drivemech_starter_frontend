import { BankOption } from "@/types/payment";
import Image from "next/image";

interface Props {
  banks: BankOption[];
  selected: string;
  setSelected: (name: string) => void;
}

export default function OnlineBankingPanel({ banks, selected, setSelected }: Props) {
  return (
    <div className="border rounded-xl p-4 flex flex-col gap-4">

      {banks.map((bank) => (
        <button
          key={bank.name}
          onClick={() => setSelected(bank.name)}
          className="flex items-center gap-3 border rounded-lg p-3 text-left"
        >
          <input type="radio" checked={selected === bank.name} readOnly />

          <span className="flex-1">{bank.name}</span>

          <Image src={bank.logo} alt={bank.name} width={25} height={25} />
        </button>
      ))}

      <button className="bg-orange-500 text-white px-6 py-2 rounded-lg">
        Proceed to Pay $579
      </button>
    </div>
  );
}
