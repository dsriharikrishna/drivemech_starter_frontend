'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import ServiceLayout from './ServiceLayout';

export default function ServicePage() {
  const methods = useForm({
    defaultValues: {
      selectedServices: [],
      searchQuery: ''
    }
  });

  return (
    <FormProvider {...methods}>
      <ServiceLayout />
    </FormProvider>
  );
}