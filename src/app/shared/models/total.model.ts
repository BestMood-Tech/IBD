export class Total {
  public contacts: number;
  public responses: number;
  public accepts: number;
  public declines: number;

  constructor(dataStore: any) {
    for (const key in dataStore) {
      this[key] = dataStore[key];
    }
  }
}
