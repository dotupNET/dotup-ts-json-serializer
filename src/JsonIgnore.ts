// tslint:disable:no-function-expression
// tslint:disable:no-any
import { JsonSerializerVariables } from './JsonSerializerVariables';

export function JsonIgnore(name?: string) {
  return function (target: any, propertyKey: string) {
    let map = JsonSerializerVariables.ignored.get(target);
    if (!map) {
      map = {};
      JsonSerializerVariables.ignored.set(target, map);
    }

    map[propertyKey] = name || propertyKey;
  };
}
