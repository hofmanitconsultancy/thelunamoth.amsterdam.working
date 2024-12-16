import { useState, useCallback } from 'react';

interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
}

interface UseFormOptions<T> {
  initialValues: T;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
  onSubmit: (values: T) => Promise<void>;
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  validate,
  onSubmit
}: UseFormOptions<T>) {
  const [state, setState] = useState<FormState<T>>({
    values: initialValues,
    errors: {},
    touched: {}
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((
    name: keyof T,
    value: T[keyof T]
  ) => {
    setState(prev => ({
      ...prev,
      values: { ...prev.values, [name]: value }
    }));
  }, []);

  const setFieldTouched = useCallback((
    name: keyof T,
    touched: boolean = true
  ) => {
    setState(prev => ({
      ...prev,
      touched: { ...prev.touched, [name]: touched }
    }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched on submit
    const allTouched = Object.keys(state.values).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {}
    );
    
    setState(prev => ({
      ...prev,
      touched: allTouched
    }));

    if (validate) {
      const errors = validate(state.values);
      if (Object.keys(errors).length > 0) {
        setState(prev => ({ ...prev, errors }));
        return;
      }
    }

    setIsSubmitting(true);
    try {
      await onSubmit(state.values);
    } finally {
      setIsSubmitting(false);
    }
  }, [state.values, validate, onSubmit]);

  return {
    values: state.values,
    errors: state.errors,
    touched: state.touched,
    isSubmitting,
    handleChange,
    setFieldTouched,
    handleSubmit
  };
}