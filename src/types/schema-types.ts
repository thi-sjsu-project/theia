import { type tags } from 'typia';

/* messages ***************************************************************************************/

export type SimToCmMessage = {
  message?: Message;
  stressLevel?: Range<0, 1>;
};

export type Message =
  | ThreatDetected
  | RequestApprovalToAttack
  | AcaFuelLow
  | MissileToOwnshipDetected
  | AcaDefect
  | AcaHeadingToBase;

export type BaseMessage<TKind extends string, TData extends object> = {
  id: Uuid;
  conversationId: Uuid;
  priority: Priority;
  tags: Array<string>;
  kind: TKind;
  data: TData;
  fulfilled?: boolean;
  read?: boolean;
};

export type ThreatDetected = BaseMessage<
  'ThreatDetected',
  {
    target: Target;
    detectedByAca?: Id;
  }
>;

export type RequestApprovalToAttack = BaseMessage<
  'RequestApprovalToAttack',
  {
    target: Target;
    detectedByAca?: Id;
    collateralDamage: 'none' | 'simple' | 'complex';
    attackWeapon: Weapon;
    choiceWeight: Range<-1, 1>; // specifies which choice option to prefer, -1: deny, 1: approve
  }
>;

export type MissileToOwnshipDetected = BaseMessage<
  'MissileToOwnshipDetected',
  {
    missileLocation: Point;
    survivability: Range<0, 1>;
    detectedByAca?: Id;
    acaAttackWeapon?: Weapon;
    choiceWeight: Range<-1, 1>; // specifies which choice option to prefer, -1: avoid, 1: intervene
  }
>;

export type AcaFuelLow = BaseMessage<
  'AcaFuelLow',
  {
    acaId: Id;
    fuelLevel: Range<0, 1>;
  }
>;

export type AcaDefect = BaseMessage<
  'AcaDefect',
  {
    acaId: Id;
    message: string;
  }
>;

export type AcaHeadingToBase = BaseMessage<
  'AcaHeadingToBase',
  {
    acaId: Id;
    reason?: 'fuelLow' | 'weaponsLow';
  }
>;

/* utility types **********************************************************************************/

export type Id = number & tags.Type<'uint64'>;
export type Uuid = string & tags.Format<'uuid'>;
export type Priority = DiscreteRange<0, 10>;
export type Range<From extends number, To extends number> = number &
  tags.Type<'float'> &
  tags.Minimum<From> &
  tags.Maximum<To>;
export type DiscreteRange<From extends number, To extends number> = number &
  tags.Type<'int64'> &
  tags.Minimum<From> &
  tags.Maximum<To>;

export type Target = {
  location: Point;
  threatLevel: Range<0, 1>;
  type: 'airDefense' | 'artillery' | 'radar';
};

export type Point = {
  x: DiscreteRange<0, 1920>;
  y: DiscreteRange<0, 1080>;
};

export type Weapon = {
  type: string;
  load: Range<0, 1>;
};
