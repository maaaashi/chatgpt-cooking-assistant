export class Recipe {
  constructor(
    private _id: number,
    private _imageUrl: string,
    private _title: string,
    private _prompt: string
  ) {}

  get imageUrl() {
    return this._imageUrl
  }

  get title() {
    return this._title
  }
}
