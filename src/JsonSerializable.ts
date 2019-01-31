// tslint:disable:no-invalid-this
// tslint:disable:no-any
import { JsonSerializerVariables } from './JsonSerializerVariables';

export enum SerializationMode {
  IncludeAll,
  IngonreAll
}
export function JsonSerializable<T>(mode: SerializationMode = SerializationMode.IncludeAll, registerType: boolean = true) {
  // tslint:disable-next-line:no-function-expression
  return function (target: T) {
    const t = <any>target;

    if (registerType) {
      SetManagerFactory(t);
    }

    t.prototype.toJSON = function () {
      const serializeAll = mode === SerializationMode.IncludeAll;
      const mapSource = serializeAll ? JsonSerializerVariables.ignored : JsonSerializerVariables.included;
      const weakMap = mapSource.get(t.prototype);
      const propSource = serializeAll ? this : weakMap;

      if (!propSource) {
        return undefined;
      }
      const properties = Object.keys(propSource);

      const result1 = properties.reduce((previous: any, key: any) => {
        const keyMap = weakMap ? weakMap[key] : undefined;
        if (!keyMap && serializeAll || keyMap && !serializeAll) {
          previous[key] = this[key];
        }

        return previous;
        // tslint:disable-next-line:align
      }, {});

      result1['__type__'] = t.prototype.constructor.name;

      return result1;
    };

  };
}

function SetFactory(target: any) {
  const f1 = JsonSerializerVariables.factories;

  let map = f1.get(target);
  const name = target.prototype.constructor.name;
  if (!map) {
    map = {};
    f1.set(target, map);
  }

  map[name] = target.prototype.constructor;
}

function SetManagerFactory(target: any) {
  const f1 = JsonSerializerVariables.factories;
  const name = target.prototype.constructor.name;
  f1.set(name, target.prototype.constructor);
}
