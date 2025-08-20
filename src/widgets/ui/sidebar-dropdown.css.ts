import * as styles from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
export const dropdownIcon = recipe({
  base: {
    transform: 'rotate(0deg)',
    transition: 'transform 1s ease',
  },
  variants: {
    active: {
      false: {
        transform: 'rotate(0deg)',
      },
      true: {
        transform: 'rotate(90deg)',
      },
    },
  },
});
