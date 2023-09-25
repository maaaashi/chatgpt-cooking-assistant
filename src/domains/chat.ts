export class Chat {
  constructor(
    private _type: 'AI' | 'User',
    private _text: string,
    private _date?: Date
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
}
