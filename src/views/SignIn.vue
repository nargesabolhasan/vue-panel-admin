<script setup>
import SignUpForm from '@/components/SignInForm.vue'
import LinkButton from '@/components/buttons/LinkButton.vue'
import { ROUTES } from '@/constants/routes.js'
</script>

<template>
  <div class="sign-in-wrapper flex flex-col">
    <h2 class="p-4 border-b">Sign Up</h2>
    <span class="text-center">
      <SignUpForm /><span>Have an account?</span> <LinkButton :to="ROUTES.LOGIN" title="Sign in"
    /></span>
  </div>
</template>

<style scoped></style>
