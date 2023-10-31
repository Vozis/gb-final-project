// import { useState } from 'react';
// import { useAuth } from '@project/shared/hooks';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
//
// export const useRating = () => {
//   const [isSended, setIsSended] = useState(false);
//   const { user } = useAuth();
//   const queryClient = useQueryClient();
//   const { mutateAsync } = useMutation(
//     ['set-rating-movie'],
//     ({ value }: { value: number }) => RatingService.setRating(movieId, value),
//     {
//       onError: error => {
//         // toastError(error, 'Update user');
//       },
//       onSuccess: () => {
//         queryClient.invalidateQueries(['popular-movies-sidebar']);
//         // toast.success('You have successfully updated your rating');
//
//         setIsSended(true);
//         // refetch();
//
//         setTimeout(() => {
//           setIsSended(false);
//         }, 2400);
//       },
//     },
//
//   const handleClick = async (nextValue: number) => {
//     await mutateAsync({ value: nextValue });
//   };
//
//   return { isSended, rating, handleClick };
//   );
// }
