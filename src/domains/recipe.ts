export class Recipe {
  constructor(
    private _id: number,
    private _title: string,
    private _recipe: string,
    private _imageUrl: string,
    private _prompt: string
  ) {}

  get imageUrl() {
    return this._imageUrl
  }

  get title() {
    return this._title
  }

  get recipe() {
    return this._recipe
  }

  get prompt() {
    return this._prompt
  }
}
