//Id: "Identificador no OpenLibrary", 
//Name: "Nome do livro", 
//Read: "true or false", 
//Link: "Link para o openlibrary", 
//DateRead: "Data da leitura do livro"

export class IBook {
  Id?: number;
  IdBook: string;
  Name: string;
  Read: boolean;
  Link: string;
  DateRead: Date;
  Author: string;
  Image: string;
}



export class Book implements IBook {
  Id = 0;
  IdBook = "";
  Name = "";
  Read = false;
  Link = "";
  DateRead = new Date();
  Author = "";
  Image = "";
}