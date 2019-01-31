// tslint:disable:no-any
import { JsonSerializerVariables } from './JsonSerializerVariables';

const getCircularReplacer = () => {
  const seen = new WeakSet();

  return (key: any, value: any) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }

    return value;
  };
};

enum JsonDeserializerMode {
  PropertyAssignment,
  ObjectDeserializer,
  ArrayDeserializer
}

export class JsonManager {
  // static deserializer: Deserializer<any>[] = [];

  Serialize(item: any, space?: number): string {
    return JSON.stringify(item, undefined, space);
  }

  SerializeReplaced(item: any, space?: number): string {
    return JSON.stringify(item, getCircularReplacer(), space);
  }

  Parse<T>(source: string): T {
    const src = JSON.parse(source);

    return this.Deserialize(src);
  }

  Deserialize<T>(source: any): T {
    return this.deserializeItem(source);
  }

  private deserializeItem(source: any): any {
    let createdItem: any;
    const mode = this.GetDeserializerMode(source);
    const typeName = source['__type__'];

    switch (mode) {

      case JsonDeserializerMode.ArrayDeserializer:

        // Arrays
        const newArray: any = [];
        source.forEach((arrayElement: any) => {
          const r1 = this.Deserialize(arrayElement);
          newArray.push(r1);
        });
        createdItem = newArray;

        break;

      case JsonDeserializerMode.ObjectDeserializer:

        // Objects
        const deserializer = JsonSerializerVariables.factories.get(typeName);

        if (deserializer) {
          const cc2 = new deserializer();
          createdItem = cc2;
        } else {
          // No serializer found
          createdItem = {};
        }

        // go and get all properties from current object
        Object.keys(source)
          .forEach((k: any) => {

            if (k !== '__type__') {
              const r1 = this.Deserialize(source[k]);
              createdItem[k] = r1;
            }

          });

        break;

      case JsonDeserializerMode.PropertyAssignment:

        // Properties
        createdItem = source;

        break;

      default:

    }

    return createdItem;
  }

  // Register<T>(factory: new () => T, typeName?: string): void {
  //   const name = typeName ? typeName : factory.prototype.constructor.name;
  //   DeserializerManager.deserializer.push(new Deserializer(typeName, factory));
  // }

  GetDeserializerMode(source: any, key?: string): JsonDeserializerMode {
    const item = key ? source[key] : source;

    if (item.constructor === Object) {
      return JsonDeserializerMode.ObjectDeserializer;
    } else if (Array.isArray(item)) {
      return JsonDeserializerMode.ArrayDeserializer;
    } else {
      return JsonDeserializerMode.PropertyAssignment;
    }
  }

}
