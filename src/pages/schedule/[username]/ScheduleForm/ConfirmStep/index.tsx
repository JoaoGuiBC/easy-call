import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { CalendarBlank, Clock } from 'phosphor-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'

import { ConfirmForm, FormActions, FormError, FormHeader } from './styles'

const confirmFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome precisa ter no mínimo 3 carateres' }),
  email: z.string().email({ message: 'Digite um e-mail válido' }),
  observations: z.string().nullable(),
})

type confirmFormData = z.infer<typeof confirmFormSchema>

export function ConfirmStep() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<confirmFormData>({
    resolver: zodResolver(confirmFormSchema),
  })

  function handleConfirmSchedulling(data: confirmFormData) {
    console.log(data)
  }

  return (
    <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmSchedulling)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          03/02/2023
        </Text>
        <Text>
          <Clock />
          20:00h
        </Text>
      </FormHeader>

      <label>
        <Text size="sm">Nome completo</Text>
        <TextInput placeholder="Seu nome" {...register('name')} />
        {errors.name && <FormError size="sm">{errors.name.message}</FormError>}
      </label>

      <label>
        <Text size="sm">Endereço de e-mail</Text>
        <TextInput
          type="email"
          placeholder="johndoe@example.com"
          {...register('email')}
        />
        {errors.email && (
          <FormError size="sm">{errors.email.message}</FormError>
        )}
      </label>

      <label>
        <Text size="sm">Observações</Text>
        <TextArea {...register('observations')} />
      </label>

      <FormActions>
        <Button type="button" variant="tertiary">
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Confirmar
        </Button>
      </FormActions>
    </ConfirmForm>
  )
}