import { Button, Textarea, TextInput } from '@mantine/core'
import { FC, useState } from 'react'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { IconCheck, IconX } from '@tabler/icons'

type Form = {
  name: string
  email: string
  message: string
}

export const ContactPage: FC = () => {
  const [success, setSuccess] = useState(false)

  const form = useForm<Form>({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },

    validate: {
      name: (value) => (value ? null : 'Please enter your name'),
      email: (value) =>
        /^\S+@\S+$/.test(value)
          ? null
          : 'Please enter your correct email address',
      message: (value) => (value ? null : 'Please enter your message'),
    },
  })

  const handleSubmit = async (values: Form) => {
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          message: values.message,
        }),
      }).then((res) => {
        if (res.ok) {
          setSuccess(true)
          showNotification({
            title: 'Success!',
            message: 'Message to the dark side of the moon',
            color: 'grape.7',
            icon: <IconCheck />,
            classNames: {
              root: 'before:',
            },
          })
        } else {
          throw new Error('エラーが発生しました')
        }
      })
    } catch (err) {
      console.log(err)
      showNotification({
        title: 'Error...',
        message: 'Failed to contact',
        color: 'red',
        icon: <IconX />,
      })
    }
  }

  return (
    <div className="mx-auto mt-10 w-full max-w-3xl px-4">
      <h1 className="text-2xl font-semibold">Contact Form</h1>
      {!success ? (
        <form
          className="mt-6 grid gap-4"
          onSubmit={form.onSubmit(handleSubmit)}
        >
          <TextInput
            label="Name"
            placeholder="Your Name"
            withAsterisk
            color="grape"
            classNames={{
              root: 'max-w-[300px]',
              input: 'focus:border-[#BE4BDB]',
            }}
            {...form.getInputProps('name')}
          />
          <TextInput
            label="Email"
            placeholder="Your Email"
            withAsterisk
            classNames={{
              root: 'max-w-[300px]',
              input: 'focus:border-[#BE4BDB]',
            }}
            {...form.getInputProps('email')}
          />
          <Textarea
            label="Message"
            placeholder="Your Message"
            withAsterisk
            classNames={{
              input: 'focus:border-[#BE4BDB]',
            }}
            {...form.getInputProps('message')}
          />

          <Button
            type="submit"
            className="w-[200px]"
            color="grape.7"
            disabled={
              form.values.name === '' ||
              form.values.email === '' ||
              form.values.message === ''
            }
          >
            Send
          </Button>
        </form>
      ) : (
        <h2 className="mt-6">
          Your message has been sent successfully. Thanks!
        </h2>
      )}
    </div>
  )
}
