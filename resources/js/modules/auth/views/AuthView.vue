<script setup lang="ts">
import { ref } from 'vue';
import authImage from '@/modules/auth/assets/auth.jpg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthStore } from '../store/authStore';

const isLogin = ref<boolean>(true);

const authStore = useAuthStore();

</script>

<template>
  <div class="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
    <div v-if="isLogin" class="flex items-center justify-center py-12">
      <div class="mx-auto grid w-[450px] gap-6">
        <div class="grid gap-2 text-center">
          <h1 class="text-3xl font-bold">Login</h1>
          <p class="text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <div class="grid gap-5">
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label for="password">Password</Label>
              <a
                href="/forgot-password"
                class="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </a>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" class="w-full"> Login </Button>
        </div>
        <div class="mt-4 text-center text-sm">
          Don't have an account?
          <a href="#" class="underline" @click="isLogin = false"> Sign up </a>
        </div>
      </div>
    </div>
    <div v-else class="flex items-center justify-center py-12">
      <div class="mx-auto grid w-[450px] gap-6">
        <div class="grid gap-5">
             <div class="grid gap-2 text-center">
          <h1 class="text-3xl font-bold">Register</h1>
          <p class="text-balance text-muted-foreground">
            Enter your information below to create a new account
          </p>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="grid gap-2">
            <Label for="first-name">First name</Label>
            <Input v-model="authStore.registerForm.first_name" id="first-name" required />
          </div>
          <div class="grid gap-2">
            <Label for="last-name">Last name</Label>
            <Input v-model="authStore.registerForm.last_name" id="last-name" required />
          </div>
        </div>
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input
            v-model="authStore.registerForm.email"
            id="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div class="grid gap-2">
          <Label for="phone">Phone</Label>
          <Input
            v-model="authStore.registerForm.phone"
            id="phone"
            type="number"
            required
          />
        </div>
         <div class="grid gap-2">
          <Label for="name">Name</Label>
          <Input
            v-model="authStore.registerForm.name"
            id="name"
            required
          />
        </div>
         <div class="grid gap-2">
          <Label for="address">Address</Label>
          <Input
            v-model="authStore.registerForm.address"
            id="address"
            required
          />
        </div>
        <div class="grid gap-2">
          <Label for="subdomain">SubDomain</Label>
          <Input
            v-model="authStore.registerForm.subdomain"
            id="subdomain"
            required
          />
        </div>
        <div class="grid gap-2">
          <Label for="password">Password</Label>
          <Input v-model="authStore.registerForm.password" id="password" type="password" />
        </div>

         <div class="grid gap-2">
          <Label for="confirm-password">Confirm Password</Label>
          <Input v-model="authStore.registerForm.password_confirmation" id="confirm-password" type="password" />
        </div>

        <Button @click="authStore.register" type="submit" class="w-full">
          Create an account
        </Button>

      </div>
      <div class="mt-4 text-center text-sm">
        Already have an account?
        <a href="#" class="underline" @click="isLogin = true">
          Sign in
        </a>
      </div>
      </div>
    </div>
    <div class="hidden bg-muted lg:block">
      <img
        :src="authImage"
        alt="Image"
        width="1920"
        height="1080"
        class="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
      />
    </div>
  </div>
</template>
