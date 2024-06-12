import { Vaccination } from "./vaccination.model";

export interface Cat {
    name: string;
    age: number;
    breed: string;
    vaccinations: Vaccination[];
    photo: string; // URL or base64 string
}
