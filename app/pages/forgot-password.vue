//https://github.com/NuxSaaS/NuxSaaS/blob/main/app/pages/forgot-password/index.vue

<script setup lang="ts">
import { z } from 'zod'

definePageMeta({
  auth: {
    only: 'guest',
  },
})

useHead({
  title: 'Forgot Password',
})

const auth = useAuth()
const toast = useToast()

const schema = z.object({
  email: z.email('Invalid email'),
})

type Schema = z.infer<typeof schema>

const state = reactive<Partial<Schema>>({
  email: undefined,
})

const loading = ref(false)

async function onSubmit(event: any) {
  if (loading.value)
    return

  loading.value = true
  const { error } = await auth.client.forgetPassword({
    email: event.data.email,
    redirectTo: '/reset-password',
  })

  if (error) {
    toast.add({
      title: error.message || error.statusText,
      color: 'error',
    })
  }
  else {
    toast.add({
      title: 'Password reset email sent',
      color: 'success',
    })
  }
  loading.value = false
}
</script>

<template>
  <UContainer class="flex items-center justify-center sm:p-4 sm:min-w-160">
    <UCard class="w-full max-w-md">
      <template #header>
        <div class="text-center p-4">
          <h1 class="text-xl font-semibold">
            {{ 'Forgot Password' }}
          </h1>
          <p class="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
            {{ 'Enter your email to reset your password' }}
          </p>
        </div>
      </template>

      <div class="space-y-4">
        <UForm
          :schema="schema"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <UFormField
            label="Email"
            name="email"
            required
          >
            <UInput
              v-model="state.email"
              type="email"
              class="w-full"
              placeholder="Email"
            />
          </UFormField>

          <UButton
            type="submit"
            color="primary"
            block
            :loading="loading"
          >
            {{ 'Reset Password' }}
          </UButton>
        </UForm>

        <div class="text-center text-sm">
          <UButton
            variant="link"
            color="primary"
            href="/signin"
          >
            {{ 'Back to Sign In' }}
          </UButton>
        </div>
      </div>
    </UCard>
  </UContainer>
</template>
