import { IApi } from "../api/api";

export abstract class Generator<TCreateBody, TCreatedObject> {
  private _createdObjects: TCreatedObject[] = [];
  protected _api: IApi<TCreateBody, TCreatedObject>;

  constructor(api: IApi<TCreateBody, TCreatedObject>) {
    this._api = api;
  }

  abstract generate(): Promise<TCreateBody>;

  async generateAndPost(): Promise<TCreatedObject> {
    const body = await this.generate();
    const createdObject = await this._api.post(body);
    this._createdObjects.push(createdObject);
    return createdObject;
  }

  async cleanup(): Promise<void> {
    // Clean up in reverse order (last created, first deleted)
    for (const obj of this._createdObjects.reverse()) {
      await this._api.delete((obj as any).id);
    }
    this._createdObjects = [];
  }

  protected getCreatedObjects(): TCreatedObject[] {
    return [...this._createdObjects];
  }
}
