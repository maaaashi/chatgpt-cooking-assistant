export class Ingredient {
  constructor(private _name: string, private _use: boolean) {}

  get name() {
    return this._name
  }

  get use() {
    return this._use
  }
}
