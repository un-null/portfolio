import { Button, Textarea, TextInput } from '@mantine/core'
import { FC, useState } from 'react'
import { useForm } from '@mantine/form'

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
      name: (value) => (value ? null : '名前を入力して下さい'),
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : '正しいメールアドレスを入力して下さい',
      message: (value) => (value ? null : 'メッセージを入力して下さい'),
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
        if (res.status === 200) {
          setSuccess(true)
          console.log(res)
        } else {
          throw new Error('エラーが発生しました')
        }
      })
    } catch (err) {
      console.log(err)
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

          <Button type="submit" className="w-[250px]">
            Send
          </Button>
        </form>
      ) : (
        <h2>お問合せが完了しました</h2>
      )}
    </div>
  )
}
