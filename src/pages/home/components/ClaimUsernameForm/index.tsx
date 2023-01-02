import { ArrowRight } from 'phosphor-react'
import { Button, TextInput } from '@ignite-ui/react'

import { Form } from './styles'

export function ClaimUsernameForm() {
  return (
    <Form as="form">
      <TextInput size="sm" prefix="easycall.com/" placeholder="Seu usuário" />
      <Button size="sm" type="submit">
        Reservar
        <ArrowRight />
      </Button>
    </Form>
  )
}
