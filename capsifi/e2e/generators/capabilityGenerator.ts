import { AuthenticationApi } from "../api/authenticationApi";
import { ItemApi } from "../api/itemApi";
import { ItemBody, ItemResponse } from "../types/item";
import { generateRandomName } from "../utils/random";
import { Generator } from "./generator";

export class CapabilityGenerator extends Generator<ItemBody, ItemResponse> {
  constructor() {
    super({
      main: new ItemApi(new AuthenticationApi()),
    });
  }

  async generate(item?: Partial<ItemBody>): Promise<Partial<ItemBody>> {
    const generatedItem = {
      value: {
        "http://www.w3.org/2000/01/rdf-schema#subClassOf": [
          {
            dataType: "http://capsi.com.au/core/CAPSICUM-SP#CAPABILITY",
            value: "http://capsi.com.au/core/DomainScaffold#Capability",
          },
        ],
        "http://www.w3.org/2000/01/rdf-schema#label": [
          {
            dataType: "http://www.w3.org/2000/01/rdf-schema#Literal",
            value: generateRandomName("e2e_test_capability"),
          },
        ],
        "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": [
          {
            dataType: "http://www.w3.org/2000/01/rdf-schema#Class",
            value: "http://capsi.com.au/core/CAPSICUM-SP#CAPABILITY",
          },
        ],
      },
    };
    if (
      item &&
      item.value?.["http://www.w3.org/2000/01/rdf-schema#subClassOf"]
    ) {
      generatedItem.value["http://www.w3.org/2000/01/rdf-schema#subClassOf"] =
        item.value["http://www.w3.org/2000/01/rdf-schema#subClassOf"];
    }
    if (item && item.value?.["http://www.w3.org/2000/01/rdf-schema#label"]) {
      generatedItem.value["http://www.w3.org/2000/01/rdf-schema#label"] =
        item.value["http://www.w3.org/2000/01/rdf-schema#label"];
    }
    return generatedItem;
  }

  extractId(item: ItemResponse): string {
    return item.response.Success[0];
  }
}
