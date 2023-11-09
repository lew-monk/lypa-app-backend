export class NotFound extends Error {
  public constructor(message: string) {
    super(message);
    this.name = "NotFound";
    this.message = message;
  }
}
