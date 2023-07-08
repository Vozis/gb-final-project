import styles from './user-rating.module.scss';
import { Rating, RatingProps } from 'react-simple-star-rating';
import { CSSProperties, useState } from 'react';

/* eslint-disable-next-line */
export interface UserRatingProps extends RatingProps {}

export function UserRating({
  initialValue,
  size,
  showTooltip,
  SVGstyle,
  fillIcon,
  iconsCount = 5,
  readonly = false,
  tooltipStyle,
  ...otherProps
}: UserRatingProps) {
  const [rating, setRating] = useState(initialValue);

  return (
    <Rating
      initialValue={initialValue}
      size={size}
      showTooltip={showTooltip}
      SVGstyle={SVGstyle}
      tooltipStyle={tooltipStyle}
      iconsCount={iconsCount}
      readonly={readonly}
      {...otherProps}
    />
  );
}

export default UserRating;
