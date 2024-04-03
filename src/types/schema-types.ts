import type { tags } from 'typia';

/* messages ***************************************************************************************/

export type Message =
  | RequestApprovalToAttack
  | AcaFuelLow
  | MissileToOwnshipDetected
  | AcaDefect
  | AcaHeadingToBase;

export type BaseMessage<TKind extends string, TData extends object> = {
  id: Id;
  priority: Priority;
  kind: TKind;
  data: TData;
};

export type RequestApprovalToAttack = BaseMessage<
  'RequestApprovalToAttack',
  {
    target: Target;
    collateralDamage: 'none' | 'simple' | 'complex';
    detectedByAca?: Id;
    attackWeapon: Weapon;
    choiceWeight: Range<-1, 1>; // specifies which choice option to prefer, -1: deny, 1: approve
  }
>;

export type MissileToOwnshipDetected = BaseMessage<
  'MissileToOwnshipDetected',
  {
    missileLocation: GeoPoint;
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
export type Priority = number & tags.Type<'uint32'> & tags.Maximum<10>;
export type Range<From extends number, To extends number> = number &
  tags.Type<'float'> &
  tags.Minimum<From> &
  tags.Maximum<To>;

export type Target = {
  location: GeoPoint;
  threatLevel: Range<0, 1>;
  type: string;
};

export type GeoPoint = {
  lat: Range<-90, 90>;
  lng: Range<-180, 180>;
};

export type Weapon = {
  type: string;
  load: Range<0, 1>;
};
