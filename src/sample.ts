import { GameConfiguration } from '../spec/models/GameConfiguration';
import { Player } from '../spec/models/Player';
import { JsonManager } from './index';

export class Sample {

  run(): void {
    const jm = new JsonManager();

    const p1 = new Player('Player 1');
    const p2 = new Player('Player 2');

    const playerList = [p1, p2];
    const toJson = jm.SerializeReplaced(playerList);
    const playerListFromJson = jm.Parse(toJson);

    console.log(playerListFromJson);

    const gameConfig = new GameConfiguration();
    gameConfig.NumberOfPlayer = 3;
    gameConfig.Player = playerList;
    const jsonGameConfig = jm.SerializeReplaced(gameConfig);
    const gameConfigFromJson = jm.Parse(jsonGameConfig);

    console.log(gameConfigFromJson);

  }
}

const sample = new Sample();
sample.run();
