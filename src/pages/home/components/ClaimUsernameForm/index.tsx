import { z } from 'zod'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { ArrowRight } from 'phosphor-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Text, TextInput } from '@ignite-ui/react'

import { Form, FormAnnotation } from './styles'

const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Usuário precisa ter 3 letras ou mais.' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'Usuário pode ter apenas letras e hifens.',
    })
    .transform((username) => username.toLocaleLowerCase()),
})

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  })

  const router = useRouter()

  async function handleClaimUsername(formData: ClaimUsernameFormData) {
    const { username } = formData

    await router.push(`/register?username=${username}`)
  }

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
        <TextInput
          size="sm"
          prefix="easycall.com/"
          placeholder="Seu usuário"
          {...register('username')}
        />
        <Button size="sm" type="submit" disabled={isSubmitting}>
          Reservar
          <ArrowRight />
        </Button>
      </Form>

      <FormAnnotation style={errors.username ? 'errored' : 'default'}>
        <Text size="sm">
          {errors.username
            ? errors.username.message
            : 'Digite o nome de usuário'}
        </Text>
      </FormAnnotation>
    </>
  )
}
