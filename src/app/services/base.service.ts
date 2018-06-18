import { IdbService } from './idb.service';
import { IDataBase, DATA_TYPE, ITable } from 'jsstore';

export class BaseService {
  dbname = 'MyLibrary_dev';
  constructor() {
      // turn on jsstore log status - help you to debug
      // turn off it in production or when you dont need
      this.connection.setLogStatus(true);
      this.initJsStore();
  }

  get connection() {
      return IdbService.idbCon;
  }

  initJsStore() {
      this.connection.isDbExist(this.dbname).then(isExist => {
          if (isExist) {
              this.connection.openDb(this.dbname);
          } else {
              const dataBase = this.getDatabase();
              this.connection.createDb(dataBase);
          }
      }).catch(err => {
          // this will be fired when indexedDB is not supported.
          alert(err.message);
      });
  }

  //Id?: number;
  // IdBook: string;
  // Name: string;
  // Read: boolean = false;
  // Link: string;
  // DateRead: Date = new Date();
  // Author: string;
  // Image: string;
  private getDatabase() {
      const tblBook: ITable = {
          name: 'Books',
          columns: [{
                  name: 'Id',
                  primaryKey: true,
                  autoIncrement: true
              },
              {
                  name: 'IdBook',
                  notNull: true,
                  dataType: DATA_TYPE.String
              },
              {
                  name: 'Name',
                  notNull: true,
                  dataType: DATA_TYPE.String
              },
              {
                  name: 'Read',
                  dataType: DATA_TYPE.Boolean,
                  default: false
              },
              {
                  name: 'Link',
                  notNull: true,
                  dataType: DATA_TYPE.String
              },
              {
                  name: 'DateRead',
                  dataType: DATA_TYPE.DateTime,
                  notNull: true,
                  default: new Date()
              },
              {
                  name: 'Author',
                  notNull: true,
                  dataType: DATA_TYPE.String
              },
              {
                  name: 'Image',
                  notNull: true,
                  dataType: DATA_TYPE.String
              }
          ]
      };
      const dataBase: IDataBase = {
          name: this.dbname,
          tables: [tblBook]
      };
      return dataBase;
  }
}