// tslint:disable:no-useless-files

// import { Factories } from './Factories';

// // tslint:disable:no-any
// export class Deserializer<T> {
//   typeName: string;
//   factory: (new () => T);

//   CreateObject(props: Partial<T>): T {
//     const result = new this.factory();
//     this.copyProperties(props, result);

//     return result;
//   }

//   constructor(typeName: string, factory: new () => T) {
//     this.typeName = typeName;
//     this.factory = factory;
//   }

//   copyProperties(source: any, target: any): void {
//     Object.keys(source)
//       .forEach(item => {
//         target[item] = source[item];
//       });

//     return target;
//   }

//   mergeProperties(source: any, target: any) {
//     // tslint:disable-next-line:no-for-in
//     Object
//       .keys(source)
//       .forEach(item => {
//         try {
//           if (source[item].constructor === Object) {
//             target[item] = this.mergeProperties(target[item], source[item]);
//           } else {
//             if (Array.isArray(source[item])) {
//               if (Array.isArray(target[item])) {
//                 target[item] = source[item].concat(target[item]);
//               } else {
//                 target[item] = source[item];
//               }
//             } else {
//               target[item] = source[item];
//             }
//           }
//         } catch (e) {
//           target[item] = source[item];
//         }

//       });

//     // for (var item in source) {
//     // }
//     return target;
//   }

// }
