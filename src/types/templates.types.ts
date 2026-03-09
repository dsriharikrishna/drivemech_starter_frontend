export interface Template {
  id: string;
  name: string;
  description?: string;
  content?: string;
}

export interface TemplateCategory {
  id: string;
  title: string;
  templates: Template[];
}

export type TemplateCategoryId =
  | "invoice-notes"
  | "job-card-notes"
  | "documents"
  | "emails"
  | "unit-for-sale"
  | "sms"
  | "customer-source"
  | "payment-methods"
  | "product-categories"
  | "product-groups";
