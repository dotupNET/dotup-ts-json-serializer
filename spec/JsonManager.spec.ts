import { JsonInclude, JsonManager, JsonSerializable, SerializationMode } from '../src/index';
import { GameConfiguration } from './models/GameConfiguration';
import { Player } from './models/Player';

describe('JsonManager', () => {

  // beforeAll(_ => {
  // });

  it('should create an instance', () => {
    const value = new JsonManager();
    expect(value)
      .toBeTruthy();
  });

  it('should serialize array', () => {
    const jm = new JsonManager();

    const p1 = new Player('Player 1');
    p1.age = 10;

    const p2 = new Player('Player 2');
    p2.age = 2;

    const playerList: Player[] = [p1, p2];
    const toJson = jm.SerializeReplaced(playerList);
    const playerListFromJson = jm.Parse<Player[]>(toJson);

    expect(playerListFromJson.length === 2)
      .toBeTruthy();

    expect(playerListFromJson[0].name)
      .toBe('Player 1');

    expect(playerListFromJson[0].age)
      .toBeUndefined();

    expect(playerListFromJson[1].name)
      .toBe('Player 2');

    expect(playerListFromJson[1].age)
      .toBeUndefined();

  });

  it('should serialize Player', () => {
    const jm = new JsonManager();

    const p1 = new Player('Player 1');
    p1.age = 10;

    const toJson = jm.SerializeReplaced(p1);
    const p1FromJson = jm.Parse<Player>(toJson);

    expect(p1FromJson instanceof Player)
      .toBeTruthy();

    expect(p1FromJson.name)
      .toBe('Player 1');

    expect(p1FromJson.age)
      .toBeUndefined();

  });

  it('should serialize GameConfiguration', () => {
    const jm = new JsonManager();

    const p1 = new Player('Player 1');
    p1.age = 10;

    const p2 = new Player('Player 2');
    p2.age = 2;

    const playerList: Player[] = [p1, p2];

    const gameConfig = new GameConfiguration();
    gameConfig.NumberOfPlayer = 3;
    gameConfig.Player = playerList;
    gameConfig.Rounds = 42;

    const x = JSON.stringify(gameConfig);

    const toJson = jm.SerializeReplaced(gameConfig);
    const gameConfigFromJson = jm.Parse<GameConfiguration>(toJson);

    expect(gameConfigFromJson instanceof GameConfiguration)
      .toBeTruthy();

    expect(gameConfigFromJson.NumberOfPlayer)
      .toBe(3);

    // Tests @JsonIgnore
    expect(gameConfigFromJson.Rounds)
      .toBeUndefined();

    // Tests SerializationMode.IngonreAll
    expect(gameConfigFromJson.Player[0].age)
      .toBeUndefined();

    // Tests @JsonInclude
    expect(gameConfigFromJson.Player[1].name)
      .toBe('Player 2');

  });

});
