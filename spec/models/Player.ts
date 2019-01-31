import { JsonInclude, JsonSerializable, SerializationMode } from '../../src/index';

@JsonSerializable(SerializationMode.IngonreAll)
export class Player {
  constructor(name?: string) {
    if (name) {
      this.name = name;
    }
  }
  @JsonInclude()
  name: string;
  age: number;
}
