import { z } from 'zod'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarBlank, Clock } from 'phosphor-react'
import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'

import { api } from '@lib/axios'

import { ConfirmForm, FormActions, FormError, FormHeader } from './styles'

const confirmFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome precisa ter no mínimo 3 carateres' }),
  email: z.string().email({ message: 'Digite um e-mail válido' }),
  observations: z.string().nullable(),
})

type confirmFormData = z.infer<typeof confirmFormSchema>

interface ConfirmStepProps {
  schedulingDate: Date
  onCleanSelectedDateTime: () => void
}

export function ConfirmStep({
  schedulingDate,
  onCleanSelectedDateTime,
}: ConfirmStepProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<confirmFormData>({
    resolver: zodResolver(confirmFormSchema),
  })

  const router = useRouter()
  const username = String(router.query.username)

  const describedDate = dayjs(schedulingDate).format('DD[ de ]MMMM[ de ]YYYY')
  const describedTime = dayjs(schedulingDate).format('HH:mm[h]')

  async function handleConfirmSchedulling(data: confirmFormData) {
    const { email, name, observations } = data

    await api.post(`/users/${username}/schedule`, {
      name,
      email,
      observations,
      date: schedulingDate,
    })

    onCleanSelectedDateTime()
  }

  return (
    <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmSchedulling)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          {describedDate}
        </Text>
        <Text>
          <Clock />
          {describedTime}
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
        <Button
          type="button"
          variant="tertiary"
          onClick={onCleanSelectedDateTime}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Confirmar
        </Button>
      </FormActions>
    </ConfirmForm>
  )
}
