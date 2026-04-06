import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

// eslint-disable-next-line react-refresh/only-export-components
export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full font-bold transition-all disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-on-primary shadow-lg hover:bg-primary-hover hover:scale-105',
        cta: 'bg-cta text-on-cta shadow-lg hover:scale-105',
        secondary:
          'border-2 border-border text-heading hover:border-border-hover hover:bg-surface-hover',
      },
      size: {
        default: 'px-8 py-3 text-lg',
      },
    },
    defaultVariants: { variant: 'primary', size: 'default' },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={`${buttonVariants({ variant, size })} ${className ?? ''}`}
      {...props}
    />
  ),
);

Button.displayName = 'Button';
export default Button;
