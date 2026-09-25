-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.Cycles (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  ended_at timestamp with time zone,
  is_active boolean,
  chick_type text,
  number_of_chicks numeric,
  chick_price double precision,
  started_at timestamp with time zone,
  CONSTRAINT Cycles_pkey PRIMARY KEY (id)
);
CREATE TABLE public.Days (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  cycle_id bigint,
  day_number numeric,
  notes text,
  CONSTRAINT Days_pkey PRIMARY KEY (id),
  CONSTRAINT Days_cycle_id_fkey FOREIGN KEY (cycle_id) REFERENCES public.Cycles(id)
);
CREATE TABLE public.FollowUpData (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  parent_day_id bigint,
  weight_small real,
  weight_medium real,
  weight_large real,
  wight_random_sample real,
  CONSTRAINT FollowUpData_pkey PRIMARY KEY (id),
  CONSTRAINT FollowUpData_parent_day_id_fkey FOREIGN KEY (parent_day_id) REFERENCES public.Days(id)
);
CREATE TABLE public.MetaData (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  parent_day_id bigint,
  meta_name text,
  meta_value text,
  CONSTRAINT MetaData_pkey PRIMARY KEY (id),
  CONSTRAINT MetaData_parent_day_id_fkey FOREIGN KEY (parent_day_id) REFERENCES public.Days(id)
);
CREATE TABLE public.Events (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  parent_day_id bigint,
  temperature_inside real,
  performed_by bigint,
  deaths jsonb,
  death_reason bigint,
  CONSTRAINT Events_pkey PRIMARY KEY (id),
  CONSTRAINT Events_parent_day_id_fkey FOREIGN KEY (parent_day_id) REFERENCES public.Days(id),
  CONSTRAINT Events_death_reason_fkey FOREIGN KEY (death_reason) REFERENCES public.Diseases(id)
);
CREATE TABLE public.DailyExpenses (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  parent_event_id bigint,
  expense_item text,
  amount real,
  payment_type text,
  CONSTRAINT DailyExpenses_pkey PRIMARY KEY (id),
  CONSTRAINT DailyExpenses_parent_event_id_fkey FOREIGN KEY (parent_event_id) REFERENCES public.Events(id)
);
CREATE TABLE public.DrugWithdraw (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  parent_event_id bigint,
  drug_id bigint,
  packages_count numeric,
  consumed_capacity real,
  disease_id integer,
  CONSTRAINT DrugWithdraw_pkey PRIMARY KEY (id),
  CONSTRAINT DrugWithdraw_parent_event_id_fkey FOREIGN KEY (parent_event_id) REFERENCES public.Events(id),
  CONSTRAINT DrugWithdraw_drug_id_fkey FOREIGN KEY (drug_id) REFERENCES public.Medicine(id),
  CONSTRAINT DrugWithdraw_disease_id_fkey FOREIGN KEY (disease_id) REFERENCES public.Diseases(id)
);
CREATE TABLE public.FoodWithdraw (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  parent_event_id bigint,
  food_id bigint,
  sacks_consumed double precision,
  consumption_type text,
  CONSTRAINT FoodWithdraw_pkey PRIMARY KEY (id),
  CONSTRAINT FoodWithdraw_parent_event_id_fkey FOREIGN KEY (parent_event_id) REFERENCES public.Events(id),
  CONSTRAINT FoodWithdraw_food_id_fkey FOREIGN KEY (food_id) REFERENCES public.FeedShipments(id)
);
CREATE TABLE public.MedicineSuppliers (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  name text,
  phone_number jsonb,
  place text,
  payments_without_invoices jsonb,
  CONSTRAINT MedicineSuppliers_pkey PRIMARY KEY (id)
);
CREATE TABLE public.MedicineInvoices (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  supplier_id bigint,
  cycle_id bigint,
  total_price double precision,
  payments jsonb,
  disease_id bigint,
  CONSTRAINT MedicineInvoices_pkey PRIMARY KEY (id),
  CONSTRAINT MedicineInvoices_supplier_id_fkey FOREIGN KEY (supplier_id) REFERENCES public.MedicineSuppliers(id),
  CONSTRAINT MedicineInvoices_cycle_id_fkey FOREIGN KEY (cycle_id) REFERENCES public.Cycles(id),
  CONSTRAINT MedicineInvoices_disease_id_fkey FOREIGN KEY (disease_id) REFERENCES public.Diseases(id)
);
CREATE TABLE public.Medicine (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  invoice_id bigint,
  name text,
  units_count numeric,
  unit_capacity real,
  measurement_type text,
  unit_price real,
  CONSTRAINT Medicine_pkey PRIMARY KEY (id),
  CONSTRAINT Medicine_invoice_id_fkey FOREIGN KEY (invoice_id) REFERENCES public.MedicineInvoices(id)
);
CREATE TABLE public.FeedSuppliers (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  name text,
  phone_number jsonb,
  vehicle_types jsonb,
  place text,
  payments_without_invoices jsonb,
  CONSTRAINT FeedSuppliers_pkey PRIMARY KEY (id)
);
CREATE TABLE public.FeedShipments (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  supplier_id bigint,
  cycle_id bigint,
  feed_name text,
  sacks_count numeric,
  sack_weight real,
  sack_price real,
  payments jsonb,
  CONSTRAINT FeedShipments_pkey PRIMARY KEY (id),
  CONSTRAINT FeedShipments_supplier_id_fkey FOREIGN KEY (supplier_id) REFERENCES public.FeedSuppliers(id),
  CONSTRAINT FeedShipments_cycle_id_fkey FOREIGN KEY (cycle_id) REFERENCES public.Cycles(id)
);
CREATE TABLE public.Importers (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  name text,
  phone_number jsonb,
  vehicle_types jsonb,
  place text,
  CONSTRAINT Importers_pkey PRIMARY KEY (id)
);
CREATE TABLE public.FarmSales (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  cycle_id bigint,
  importer_id bigint,
  vehicle_type text,
  crates_count numeric,
  crate_capacity numeric,
  tare_weights jsonb,
  gross_weights jsonb,
  execution_price real,
  payments jsonb,
  CONSTRAINT FarmSales_pkey PRIMARY KEY (id),
  CONSTRAINT FarmSales_cycle_id_fkey FOREIGN KEY (cycle_id) REFERENCES public.Cycles(id),
  CONSTRAINT FarmSales_importer_id_fkey FOREIGN KEY (importer_id) REFERENCES public.Importers(id)
);
CREATE TABLE public.Diseases (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  name text,
  cuase text,
  doctors jsonb,
  resistance_culture_result jsonb,
  drug_of_choice1 bigint,
  drug_of_choice2 bigint,
  drug_of_choice3 bigint,
  CONSTRAINT Diseases_pkey PRIMARY KEY (id),
  CONSTRAINT Diseases_drug_of_choice1_fkey FOREIGN KEY (drug_of_choice1) REFERENCES public.Medicine(id),
  CONSTRAINT Diseases_drug_of_choice2_fkey FOREIGN KEY (drug_of_choice2) REFERENCES public.Medicine(id),
  CONSTRAINT Diseases_drug_of_choice3_fkey FOREIGN KEY (drug_of_choice3) REFERENCES public.Medicine(id)
);