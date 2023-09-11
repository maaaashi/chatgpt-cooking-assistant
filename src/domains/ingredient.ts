import { v4 as uuidV4 } from 'uuid'

export class Ingredient {
  private _id: string

  constructor(private _name: string, private _use: boolean) {
    this._id = uuidV4()
  }

  get id() {
    return this._id
  }

  get name() {
    return this._name
  }

  get use() {
    return this._use
  }
}
