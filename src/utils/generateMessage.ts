// import { v4 as uuid } from 'uuid';
// import type {
//   Message,
//   BaseMessage,
//   Target,
//   GeoPoint,
//   Weapon,
// } from 'src/types/schema-types';

// const generateLocation = (): GeoPoint => {
//   return {
//     lat: Math.random() * 180 - 90,
//     lng: Math.random() * 360 - 180,
//   };
// };

// // generate and return a random target
// const generateTarget = (): Target => {
//   const types = ['aircraft', 'ship', 'submarine', 'vehicle', 'person'];

//   return {
//     location: generateLocation(),
//     threatLevel: Math.random(),
//     type: types[Math.floor(Math.random() * types.length)],
//   };
// };

// // generate and return a random weapon
// const generateWeapon = (): Weapon => {
//   const types = ['missile', 'bomb', 'torpedo', 'gun', 'laser'];
//   return {
//     type: types[Math.floor(Math.random() * types.length)],
//     load: Math.random(),
//   };
// };

// // generate a choice weight between -1 and 1
// const generateChoiceWeight = (): number => {
//   return Math.random() * 2 - 1;
// };

// // Generates and returns random message
// const generateMessage = (): Message => {
//   const messages = [
//     'RequestApprovalToAttack',
//     'AcaFuelLow',
//     'MissileToOwnshipDetected',
//     'AcaDefect',
//     'AcaHeadingToBase',
//   ];

//   const msgKind = messages[
//     Math.floor(Math.random() * messages.length)
//   ] as Message['kind'];

//   let message: BaseMessage<typeof msgKind, object> = {
//     id: uuid(),
//     priority: 0,
//     kind: msgKind,
//     data: {},
//   };

//   switch (msgKind) {
//     case 'RequestApprovalToAttack':
//       message = {
//         ...message,
//         priority: Math.floor(Math.random() * 4) + 5, // 5 to 8
//         data: {
//           target: generateTarget(),
//           collateralDamage: ['none', 'simple', 'complex'][
//             Math.floor(Math.random() * 3)
//           ],
//           attackWeapon: generateWeapon(),
//           choiceWeight: generateChoiceWeight(),
//         },
//       };
//       break;
//     case 'AcaFuelLow':
//       message = {
//         ...message,
//         priority: Math.floor(Math.random() * 5) + 1, // 1 to 5 (low priority)
//         data: {
//           acaId: uuid(),
//           fuelLevel: Math.random(),
//         },
//       };
//       break;
//     case 'MissileToOwnshipDetected':
//       message = {
//         ...message,
//         priority: [9, 10][Math.floor(Math.random() * 2)],
//         data: {
//           missileLocation: generateLocation(),
//           survivability: Math.random(),
//           acaAttackWeapon: generateWeapon(),
//           choiceWeight: generateChoiceWeight(),
//         },
//       };
//       break;
//     case 'AcaDefect':
//       message = {
//         ...message,
//         priority: Math.floor(Math.random() * 6) + 1, // 1 to 6
//         data: {
//           acaId: uuid(),
//           message: 'Aca defect message...',
//         },
//       };
//       break;
//     case 'AcaHeadingToBase':
//       message = {
//         ...message,
//         priority: Math.floor(Math.random() * 5) + 1, // 1 to 5
//         data: {
//           acaId: uuid(),
//           reason: ['fuelLow', 'weaponsLow'][Math.floor(Math.random() * 2)],
//         },
//       };
//       break;
//     default:
//       break;
//   }

//   return message as Message;
// };

// export default generateMessage;
