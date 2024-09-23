export class FetchError extends Error {
  readonly documentation_url: string;
  readonly status: number;

  constructor(message: string, documentation_url: string, status: number) {
    super(message);
    this.documentation_url = documentation_url;
    this.status = status;
  }
}
