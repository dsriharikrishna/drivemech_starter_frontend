'use client';

import { FormProvider, useForm } from 'react-hook-form';
import WorkShopLayout from './WorkShopLayout';

const page = () => {
      const methods = useForm({
        defaultValues: {
        
        }
      });
  return (
    <FormProvider {...methods}>
        <WorkShopLayout />
    </FormProvider>
  )
}

export default page