// tslint:disable:no-function-expression
// tslint:disable:no-invalid-this
// tslint:disable:no-unnecessary-local-variable
// tslint:disable:no-unnecessary-field-initialization
// tslint:disable:no-any
import { JsonSerializerVariables } from './JsonSerializerVariables';

export function JsonInclude() {
  return function (target: any, propertyKey: string) {
    let map = JsonSerializerVariables.included.get(target);
    if (!map) {
      map = {};
      JsonSerializerVariables.included.set(target, map);
    }

    map[propertyKey] = propertyKey;
  };
}
