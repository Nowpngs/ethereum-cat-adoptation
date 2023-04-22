export interface Cat {
  age: string;
  availableForAdoption: boolean;
  breed: string;
  description: string;
  id: number;
  name: string;
  owner: string;
}

export class CatPayload {
  name: string;
  age: number;
  breed: string;
  description: string;

  constructor(
    name: string = '',
    age: number = 0,
    breed: string = '',
    description: string = ''
  ) {
    this.name = name;
    this.age = age;
    this.breed = breed;
    this.description = description;
  }
}
