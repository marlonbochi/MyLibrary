//Id: "Identificador no OpenLibrary", 
//Name: "Nome do livro", 
//Read: "true or false", 
//Link: "Link para o openlibrary", 
//DateRead: "Data da leitura do livro"
export class Book {
    Id: number;
    Name: string;
    Read: boolean = false;
    Link: string;
    DateRead: Date = new Date();
    Author: string;
    Image: string;
  }