export class User {
  public firstName: string;
  public secondName: string;

  constructor(dataSource: any) {
    for (const key in dataSource) {
      this[key] = dataSource[key]
    }
  }
}
