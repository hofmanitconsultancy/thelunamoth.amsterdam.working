import React from 'react';
import { Calendar, Clock, Send } from 'lucide-react';
import { useForm } from '../../hooks/shared/useForm';
import { FormField } from '../forms/FormField';
import { Button } from '../ui/Button';
import type { BookingFormData } from '../../types/booking';

interface BookingFormProps {
  serviceId: string;
  onSubmit: (data: BookingFormData) => Promise<void>;
}

export function BookingForm({ serviceId, onSubmit }: BookingFormProps) {
  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit
  } = useForm<BookingFormData>({
    initialValues: {
      serviceId,
      date: '',
      time: '',
      name: '',
      email: '',
      message: ''
    },
    validate: (values) => {
      const errors: Partial<Record<keyof BookingFormData, string>> = {};
      
      if (!values.date) errors.date = 'Please select a date';
      if (!values.time) errors.time = 'Please select a time';
      if (!values.name) errors.name = 'Please enter your name';
      if (!values.email) errors.email = 'Please enter your email';
      
      return errors;
    },
    onSubmit
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <FormField
          id="date"
          label="Preferred Date"
          type="date"
          value={values.date}
          onChange={(e) => handleChange('date', e.target.value)}
          error={errors.date}
          required
          min={new Date().toISOString().split('T')[0]}
          icon={Calendar}
        />

        <FormField
          id="time"
          label="Preferred Time"
          type="time"
          value={values.time}
          onChange={(e) => handleChange('time', e.target.value)}
          error={errors.time}
          required
          icon={Clock}
        />
      </div>

      <FormField
        id="name"
        label="Your Name"
        value={values.name}
        onChange={(e) => handleChange('name', e.target.value)}
        error={errors.name}
        required
        autoComplete="name"
      />

      <FormField
        id="email"
        label="Email Address"
        type="email"
        value={values.email}
        onChange={(e) => handleChange('email', e.target.value)}
        error={errors.email}
        required
        autoComplete="email"
      />

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-purple-200 mb-1">
          Additional Notes (Optional)
        </label>
        <textarea
          id="message"
          rows={4}
          value={values.message}
          onChange={(e) => handleChange('message', e.target.value)}
          className="w-full rounded-md bg-purple-800/50 border border-purple-600 text-white px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        />
      </div>

      <Button
        type="submit"
        isLoading={isSubmitting}
        className="w-full"
        icon={Send}
      >
        Book Consultation
      </Button>
    </form>
  );
}