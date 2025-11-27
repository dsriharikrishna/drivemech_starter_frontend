export type PaymentMethod =
  | "saved"
  | "upi"
  | "card"
  | "online"
  | "workshop";

export interface SavedCard {
  id: string;
  bankName: string;
  masked: string;
  expiry: string;
}

export interface BankOption {
  name: string;
  logo: string;
}
