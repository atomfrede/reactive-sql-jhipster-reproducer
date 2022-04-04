export interface IExample {
  id?: number;
  name?: string | null;
}

export class Example implements IExample {
  constructor(public id?: number, public name?: string | null) {}
}

export function getExampleIdentifier(example: IExample): number | undefined {
  return example.id;
}
