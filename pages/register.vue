<template>
  <div class="flex flex-col xl:flex-row xl:h-screen w-screen">
    <div class="bg-indigo-50 flex flex-1 items-center justify-center px-8">
      <div class="my-10 xl:my-0">
        <h2 class="text-4xl font-bold text-center">Create your account</h2>
        <p class="text-gray-700 text-xl font-light">Unlock all features!</p>
        <form class="mt-5" @submit.prevent="() => refresh()" novalidate>
          <div
            class="bg-indigo-100 border-indigo-200 border-2 rounded-md flex px-2 py-3 cursor-text"
            @click="(e) => (e.target as HTMLElement)?.querySelector('input')?.focus()"
          >
            <img src="assets/img/person.svg" class="ml-1" />
            <input
              type="text"
              placeholder="Username"
              class="bg-indigo-100 placeholder:/50 ml-2 outline-none w-full border-none"
              name="username"
              v-model="register.username"
            />
          </div>
          <div
            class="bg-indigo-100 border-indigo-200 border-2 rounded-md flex px-2 py-3 cursor-text mt-2"
            @click="(e) => (e.target as HTMLElement)?.querySelector('input')?.focus()"
          >
            <img src="assets/img/letter.svg" />
            <input
              type="email"
              placeholder="Email"
              class="bg-indigo-100 placeholder:/50 ml-2 outline-none w-full border-none"
              name="email"
              v-model="register.email"
            />
          </div>
          <div
            class="bg-indigo-100 border-indigo-200 border-2 rounded-md flex px-2 py-2 pr-4 cursor-text mt-2"
            @click="(e) => (e.target as HTMLElement)?.querySelector('input')?.focus()"
          >
            <img src="assets/img/shield-slash.svg" />
            <input
              :type="passwordFieldType"
              placeholder="Password"
              class="bg-indigo-100 placeholder:/50 ml-2 outline-none w-full border-none"
              name="password"
              v-model="register.password"
            />
            <img
              src="assets/img/eye-slash.svg"
              class="cursor-pointer"
              @click="
                passwordFieldType == 'password'
                  ? (passwordFieldType = 'text')
                  : (passwordFieldType = 'password')
              "
            />
          </div>
          <div
            class="bg-indigo-100 border-indigo-200 border-2 rounded-md flex px-2 py-2 pr-4 cursor-text mt-2"
            :class="{
              'border-red-600':
                register.confirmPassword &&
                register.password !== register.confirmPassword,
            }"
            @click="(e) => (e.target as HTMLElement)?.querySelector('input')?.focus()"
          >
            <img src="assets/img/shield-slash.svg" />
            <input
              :type="passwordFieldType"
              placeholder="Password"
              class="bg-indigo-100 placeholder:/50 ml-2 outline-none w-full border-none"
              name="confirm_password"
              v-model="register.confirmPassword"
            />
            <img
              src="assets/img/eye-slash.svg"
              class="cursor-pointer"
              @click="
                passwordFieldType == 'password'
                  ? (passwordFieldType = 'text')
                  : (passwordFieldType = 'password')
              "
            />
          </div>
          <p
            class="text-sm text-red-600 mt-1"
            v-show="
              register.confirmPassword &&
              register.password !== register.confirmPassword
            "
          >
            Пароли не совпадают
          </p>
          <div class="mt-3 flex items-center">
            <input
              type="checkbox"
              id="accept_conditions"
              class="appearance-none accent-indigo-400 border-indigo-400 rounded mr-2 bg-transparent"
              v-model="register.accept"
            /><label for="accept_conditions"
              >Accept
              <a href="#" class="text-indigo-400"
                >terms and conditions</a
              ></label
            >
          </div>
          <button
            class="big-button"
            :disabled="!registerFilled || status == 'pending'"
          >
            {{ status == "pending" ? "Pending…" : "Sign up" }}
          </button>
        </form>
        <p class="mt-5 text-center">
          You have account?
          <NuxtLink to="/login" class="font-bold text-indigo-400"
            >Login now</NuxtLink
          >
        </p>
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
      <div class="absolute block mx-10">
        <img
          src="/assets/img/undraw_two_factor_authentication_namy.svg"
          class="select-none"
        />
      </div>
      <div class="xl:absolute bottom-24 text-center mt-5">
        <p class="text-indigo-100 font-bold text-xl">Join us!</p>
        <p class="text-indigo-100">
          Just go through the boring process of creating an account.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { register, registerFilled } = storeToRefs(useMyFormsStore());
const passwordFieldType = useState("passwordFieldType", () => "password");

const router = useRouter();

const { status, error, refresh } = await useAsyncData(
  "users",
  () =>
    $fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: register.value.username,
        email: register.value.email,
        password: register.value.password,
      }),
    }),
  {
    immediate: false,
  }
);

watch(status, (newStatus) => {
  if (newStatus == "success" || newStatus == "error") {
    router.push("/sms-code");
  }
});
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

input:focus {
  box-shadow: 0 0 #0000 !important;
}
</style>
