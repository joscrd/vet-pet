// Model to create a new pet in the database

export class Pet {
    constructor(
        public _id: String,
        public name: String,
        public age: String,
        public animal: String,
        public gender: String,
        public diagnostic: String,
        public prescription: String,
        public image: String,
        public date: Date
    ){}
}