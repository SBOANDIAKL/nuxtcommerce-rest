<script setup lang="ts">
import { z } from 'zod'

definePageMeta({
  auth: {
    only: 'guest',
  },
})

useHead({
  title: 'Sign Up',
})

const auth = useAuth()
const toast = useToast()
const route = useRoute()

const redirectTo = computed(() => {
  const redirect = route.query.redirect as string
  return redirect || '/'
})

const schema = z.object({
  name: z.string().min(5, 'Name must be at least 5 characters'),
  email: z.email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

type Schema = z.infer<typeof schema>

const state = reactive<Partial<Schema>>({
  name: undefined,
  email: undefined,
  password: undefined,
  confirmPassword: undefined,
})

const loading = ref(false)
const loadingAction = ref('')

async function onSocialLogin(action: 'google' | 'github') {
  loading.value = true
  loadingAction.value = action
  auth.signIn.social({ provider: action, callbackURL: redirectTo.value })
}

async function onSubmit(event: any) {
  if (loading.value)
    return
  loading.value = true
  loadingAction.value = 'submit'
  const { error } = await auth.signUp.email({
    name: event.data.name,
    email: event.data.email,
    password: event.data.password,
  })
  if (error) {
    toast.add({
      title: error.message || error.statusText,
      color: 'error',
    })
  }
  else {
    toast.add({
      title: 'Sign up successful',
      color: 'success',
    })
    state.name = undefined
    state.email = undefined
    state.password = undefined
    state.confirmPassword = undefined
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
            Sign Up
          </h1>
        </div>
      </template>

      <div class="space-y-4">
        <UButton
          color="neutral"
          variant="outline"
          block
          icon="i-simple-icons-google"
          class="justify-center"
          :loading="loading && loadingAction === 'google'"
          :disabled="loading"
          @click="onSocialLogin('google')"
        >
          Google
        </UButton>

        <USeparator label="Or" />

        <UForm
          :schema="schema"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <UFormField
            label="Name"
            name="name"
            required
          >
            <UInput
              v-model="state.name"
              placeholder="Name"
              class="w-full"
            />
          </UFormField>

          <UFormField
            label="Email"
            name="email"
            autocomplete="email"
            required
          >
            <UInput
              v-model="state.email"
              type="email"
              placeholder="Email"
              class="w-full"
            />
          </UFormField>

          <UFormField
            label="Password"
            name="password"
            required
          >
            <UInput
              v-model="state.password"
              type="password"
              placeholder="Password"
              class="w-full"
            />
          </UFormField>

          <UFormField
            label="Confirm Password"
            name="confirmPassword"
            required
          >
            <UInput
              v-model="state.confirmPassword"
              type="password"
              placeholder="Confirm Password"
              class="w-full"
            />
          </UFormField>

          <UButton
            type="submit"
            color="primary"
            block
            :loading="loading && loadingAction === 'submit'"
            :disabled="loading"
          >
            Submit
          </UButton>
        </UForm>

        <div class="text-center text-sm">
          Have an account?
          <UButton
            variant="link"
            color="primary"
            :disabled="loading"
            to="/signin"
          >
            Sign In
          </UButton>
        </div>
      </div>
    </UCard>
  </UContainer>
</template>
