export type CustomsDeclarationRow = {
  expedition_no: string;
  serial_no: string;
  declaration_date: string | null;
  order_no: string | null;
  sequence_no: string | null;
  direction: "I" | "E" | null;
  org_no: string | null;
  pin_hash: string;
  blob_pathname: string;
  blob_url: string | null;
  source_path: string | null;
};

export type CustomsSyncItem = {
  expeditionNo: string;
  serialNo: string;
  declarationDate: string | null;
  orderNo: string | null;
  sequenceNo: string | null;
  direction: "I" | "E" | null;
  orgNo: string | null;
  pinHash: string;
  blobPathname: string;
  blobUrl?: string | null;
  sourcePath?: string | null;
};
