import { Field } from '@base-ui/react/field';
import { Form as FormPrimitive } from '@base-ui/react/form';

import { cn } from '~/lib/cn';

export const Form = ({ className, ...props }: React.ComponentProps<typeof FormPrimitive>) => (
  <FormPrimitive {...props} className={cn('flex flex-col gap-4', className as string)} />
);

export const FormField = ({ className, ...props }: React.ComponentProps<typeof Field.Root>) => (
  <Field.Root {...props} className={cn('flex flex-col gap-1.5', className as string)} />
);

export const FormLabel = ({ className, ...props }: React.ComponentProps<typeof Field.Label>) => (
  <Field.Label {...props} className={cn('text-sm font-medium text-text', className as string)} />
);

export const FormControl = Field.Control;

export const FormDescription = ({
  className,
  ...props
}: React.ComponentProps<typeof Field.Description>) => (
  <Field.Description {...props} className={cn('text-xs text-text-tertiary', className as string)} />
);

export const FormError = ({ className, ...props }: React.ComponentProps<typeof Field.Error>) => (
  <Field.Error {...props} className={cn('text-xs text-red', className as string)} />
);

export const FieldPrimitive = Field;
