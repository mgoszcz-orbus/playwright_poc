import { Api } from "../api/api";

export abstract class Generator<TBody, TResponse> {
  protected createdItems: TResponse[] = [];

  constructor(protected apis: Record<string, Api<TBody, TResponse>>) {}

  abstract generate(item?: Partial<TBody>): Promise<Partial<TBody>>;

  protected abstract extractId(item: TResponse): string;

  async generateAndPost(item?: Partial<TBody>): Promise<Partial<TBody>> {
    const objectToCreate = await this.generate(item);
    const createdItem = await this.apis.main.create(objectToCreate);
    this.createdItems.push(createdItem);
    return { id: this.extractId(createdItem), ...objectToCreate };
  }

  async cleanup() {
    for (const item of this.createdItems) {
      await this.apis.main.delete(this.extractId(item));
    }
    this.createdItems = [];
  }
}
