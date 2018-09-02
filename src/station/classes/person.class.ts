import { Util } from "../../ts/util/util.class";
import { femaleFirstNames, lastNames, maleFirstNames } from "./names";

export enum Gender { 
    male = "male",
    female = "female"
}
// export enum Skill { "Java", "Javascript", "Hunting", "Cooking", "Communications", "Engineering", 
//     "Data Analysis", "Aviation", "Critical Thinging", "Internal Medicine", "Surgery", "Firearms" }

export interface Contact {
    [key: string]: any
}

export interface Device {
    _id: string;
    asset: string; // physical name/description of the Asset
    assetType: string;
    cost: string; // financial value of Asset
    assetPrivs: Privilege[];
}

export interface Key {
    description: string;
    privateKey: string;
    publicKey: string;
    certs: string[];
}

export interface PersonRef { // this interface shall prevent circular references
    _id: string; // corresponds to a Person with the same id
    refersTo?: Person | Person[]; // individual to refer to
}

export interface Privilege {
    expires: Date;
    priv: string;
}

export interface Skill {
    name: string;
    level: number;
    title?: string;
    enables?: Skill[]; // some skills may be prerequisites for others
}

export class Person {

    public static ISSUED_IDENTIFIERS: string[]; // array of used UUIDs; prevent a UUID from being issued twice
    public static MAX_LIFE = 100;

    /** Async Constructor */
    public static async make(): Promise<Person> {
        const p = new Person();
        return Promise.resolve(p);
    }

    public _id: string;
    public age: number;
    public contacts: Contact[];
    public friends: PersonRef[];
    public gender: Gender;
    public issued: Device[]; // gov-issued Assets
    public keys: Key[];
    public life: number;
    public name: string;
    public occupation: string;
    public privileges: Privilege[];
    public skills: Skill[];

    public constructor() {
        const id: string = Util.createUuid(16);
        if (Person.ISSUED_IDENTIFIERS.indexOf(id) > -1) {
            // case: id has already been issued
            return new Person();
        } else {
            this._id = id;
            Person.ISSUED_IDENTIFIERS.push(id);
            // when we generate a person, age should be > 20 and < 65
            let age: number = 0;
            while (age < 20 || age > 65) {
                if (age < 20) { age += Math.floor(Math.random() * 65); }
                if (age > 65) { age -= Math.floor(Math.random() * 33); }
            }
            this.age = age;
            this.contacts = [];
            this.friends = [];
            (Math.floor(Math.random() * 99) < 50)
                ? this.gender = Gender.male
                : this.gender = Gender.female;
            this.issued = [];
            this.keys = [];
            this.life = Person.MAX_LIFE;
            (this.gender === Gender.female)
                ? this.name = femaleFirstNames[Math.floor(Math.random() * (femaleFirstNames.length - 1))]
                    + lastNames[Math.floor(Math.random() * (lastNames.length - 1))]
                : this.name = maleFirstNames[Math.floor(Math.random() * (maleFirstNames.length - 1))]
                    + lastNames[Math.floor(Math.random() * (lastNames.length - 1))];
            this.occupation = null; // none for now
            this.privileges = [];
            this.skills = [];

            // @debug
            console.log("Created person: { name: \"" + this.name + "\", age: " +
                this.age + ", gender: \"" + this.gender + "\" }");
        }
    }

}
