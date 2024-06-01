<template>
  <div class="flex flex-col xl:flex-row xl:h-screen w-screen">
    <div class="bg-indigo-50 flex flex-1 items-center justify-center px-8">
      <div class="my-10 xl:my-0">
        <h2 class="text-4xl font-bold">Enter OTP</h2>
        <p class="text-gray-700 text-xl font-light">
          Sent OTP on
          <span class="text-indigo-400 font-semibold">
            {{ login.email || "Error data" }}
          </span>
        </p>
        <NuxtLink
          to="/register"
          class="text-indigo-400 text-sm font-semibold"
          @click="clearForm('register')"
          >Change email</NuxtLink
        >
        <form class="mt-5">
          <input
            type="text"
            inputmode="decimal"
            placeholder="-"
            class="bg-indigo-100 placeholder:text-indigo-300/50 [&:not(:first-child)]:ml-3 outline-none border-indigo-200 border-2 rounded-md w-11 placeholder:text-center"
            :name="`code-${i}`"
            v-for="i in 6"
            :key="i"
            v-model="smsCode[i - 1]"
            @input="(e) => nextNumber(e, i == 1, i == 6)"
            @keyup.backspace="(e) => prevNumber(e, i == 1)"
            maxlength="1"
          />
          <button class="big-button" :disabled="code.length != 6">
            Submit
          </button>
        </form>
      </div>
    </div>
    <div
      class="bg-indigo-500 flex flex-1 items-center justify-center relative p-10 flex-col"
    >
      <div
        class="ellipse-1 xl:absolute rounded-full inset-y-1/6 w-5/6 aspect-square flex items-center justify-center"
      >
        <div class="ellipse-2 w-5/6 aspect-square rounded-full"></div>
      </div>
      <div class="xl:absolute block mx-10">
        <img
          src="/assets/img/undraw_two_factor_authentication_namy.svg"
          class="select-none"
        />
      </div>
      <div class="xl:absolute bottom-24 text-center mt-5">
        <p class="text-indigo-100 font-bold text-xl">
          It's just OTP verification
        </p>
        <p class="text-indigo-100">
          You are one step away from recovering your password.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const store = useMyFormsStore();

const { smsCode, code, login } = storeToRefs(store);
const { clearForm } = store;

function nextNumber(e: Event, firstField: boolean, lastField: boolean) {
  const target = e.target as HTMLInputElement;
  const inputType = (e as InputEvent).inputType;
  if (inputType == "insertText") {
    if (target.value.length) {
      target.value = target.value[target.value.length - 1];
    }
    const nextElement = target?.nextElementSibling as HTMLInputElement;
    if (!lastField) {
      nextElement?.focus();
    } else {
      target?.blur();
    }
  }
}

function prevNumber(e: Event, firstField: boolean) {
  const target = e.target as HTMLInputElement;
  const prevElement = target?.previousElementSibling as HTMLInputElement;
  if (!firstField) {
    prevElement?.focus();
  } else {
    target?.blur();
  }
}
</script>

<style>
.ellipse-1 {
  background: linear-gradient(
      162.74deg,
      rgba(68, 76, 231, 0.162) 6.85%,
      rgba(0, 0, 0, 0) 89.34%
    ),
    radial-gradient(
      50% 50% at 50% 50%,
      rgba(68, 76, 231, 0.162) 0%,
      rgba(68, 76, 231, 0.058) 100%
    );
}

.ellipse-2 {
  background: linear-gradient(
      173.9deg,
      rgba(164, 188, 253, 0.2) 4.83%,
      rgba(68, 76, 231, 0.162) 91.13%
    ),
    radial-gradient(
      50% 50% at 50% 50%,
      rgba(68, 76, 231, 0.162) 0%,
      rgba(68, 76, 231, 0.058) 100%
    );
}

input[type="number"] {
  -moz-appearance: textfield;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

input:focus {
  box-shadow: 0 0 #0000 !important;
}
</style>
