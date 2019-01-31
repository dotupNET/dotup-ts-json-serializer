import { JsonIgnore, JsonSerializable } from '../../src/index';
import { Player } from '../models/Player';

@JsonSerializable()
export class GameConfiguration {
  Player: Player[];
  NumberOfPlayer: number;
  @JsonIgnore()
  Rounds: number;
}
