type RdfProperty = {
  dataType: string;
  value: string;
};

// Typ dla value object
type RdfValue = {
  [propertyUri: string]: RdfProperty[];
};

export type ItemBody = {
  value: RdfValue;
};

export type ItemResponse = {
  response: { Success: [string] };
};
