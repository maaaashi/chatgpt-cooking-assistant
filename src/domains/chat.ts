export class Chat {
  constructor(
    private _type: 'AI' | 'User' | 'Image',
    private _text: string,
    private _date?: Date,
    private _src?: string
  ) {}

  get type() {
    return this._type
  }

  get text() {
    return this._text
  }

  get date() {
    return this._date
  }

  get src() {
    return this._src
  }
}
