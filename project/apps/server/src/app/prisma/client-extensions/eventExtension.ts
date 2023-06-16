// import { PrismaModule, PrismaService } from 'nestjs-prisma';
// const useFactory = (prisma: PrismaService) => {
//   console.log('Extension client called ');
//
//   /* @ts-ignore */
//   return prisma.$extends({
//     name: 'isParticipate',
//     model: {
//       event: {
//         isParticipate: {
//           needs: { users: true, id: true },
//           compute(event) {
//             return event.users.some(user => user.id === 1);
//           },
//         },
//       },
//     },
//   });
// };
//
// export type ExtendedClient = ReturnType<typeof useFactory>;
//
// export const USER_EXTENSION_TOKEN = 'token';
//
// export const PrismaExtensionClientProvider = {
//   provide: USER_EXTENSION_TOKEN,
//   imports: [PrismaModule],
//   inject: [PrismaService],
//   useFactory,
// };
