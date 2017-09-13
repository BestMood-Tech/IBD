export class Total {
  public name: string;
  public icon: string;
  public value: number;

  constructor(dataSource: any) {
    for (const key in dataSource) {
      this[key] = dataSource[key];
    }
  }
}
