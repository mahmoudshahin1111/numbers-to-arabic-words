export type Config = {
  delimiter?: string;
  strict?: boolean;
  numberSectionsDelimiter?:string;
  tensPrefix?:string;
};

export type ProcessResult = {
  base: string;
  delimiter: string;
  reminder: string;
};
