<script setup>
import SignUpForm from '@/components/SignInForm.vue'
import LinkButton from '@/components/buttons/LinkButton.vue'
import { ROUTES } from '@/constants/routes.js'
</script>

<template>
  <div class="sign-in-wrapper">
    <h1>Sign Up</h1>
    <SignUpForm /><span>Have an account?</span>
    <LinkButton :to="ROUTES.LOGIN" title="Sign in" />
  </div>
</template>

<style scoped></style>
