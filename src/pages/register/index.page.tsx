import { z } from 'zod'
import { useEffect } from 'react'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { ArrowRight } from 'phosphor-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'

import { api } from '@lib/axios'

import { Container, Form, FormError, Header } from './styles'

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Usuário precisa ter 3 letras ou mais.' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'Usuário pode ter apenas letras e hifens.',
    })
    .transform((username) => username.toLocaleLowerCase()),
  name: z.string().min(3, { message: 'Nome precisa ter 3 letras ou mais.' }),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export default function Register() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  const router = useRouter()

  async function handleRegister(data: RegisterFormData) {
    try {
      await api.post('/users', {
        name: data.name,
        username: data.username,
      })

      await router.push('/register/connect-calendar')
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data?.message) {
        alert(error.response.data.message)
        return
      }

      console.error(error)
    }
  }

  useEffect(() => {
    if (router.query.username) {
      setValue('username', String(router.query.username))
    }
  }, [router.query?.username, setValue])

  return (
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao Easy Call</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>

        <MultiStep size={4} currentStep={1} />
      </Header>

      <Form as="form" onSubmit={handleSubmit(handleRegister)}>
        <label>
          <Text size="sm">Nome de usuário</Text>
          <TextInput
            prefix="easycall.com/"
            placeholder="Seu usuário"
            {...register('username')}
          />

          {errors.username && (
            <FormError size="sm">{errors.username.message}</FormError>
          )}
        </label>

        <label>
          <Text size="sm">Nome completo</Text>
          <TextInput placeholder="Seu nome" {...register('name')} />

          {errors.name && (
            <FormError size="sm">{errors.name.message}</FormError>
          )}
        </label>

        <Button type="submit" disabled={isSubmitting}>
          Próximo passo
          <ArrowRight />
        </Button>
      </Form>
    </Container>
  )
}
