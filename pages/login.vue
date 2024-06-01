<template>
  <div class="flex flex-col xl:flex-row xl:h-screen w-screen">
    <div class="bg-indigo-50 flex flex-1 items-center justify-center px-8">
      <div class="my-10 xl:my-0">
        <h2 class="text-4xl font-bold text-center">Login to your Account</h2>
        <div class="flex sm:gap-14 gap-8 items-center justify-center mt-6">
          <div class="w-16 sm:w-[7.5rem] bg-gray-700 h-px"></div>
          <span class="text-gray-700">with email</span>
          <div class="w-16 sm:w-[7.5rem] bg-gray-700 h-px"></div>
        </div>
        <div class="bg-red-200 border-red-500 p-5 border-2 mt-3" v-show="error">
          Произошла ошибка получения данных
        </div>
        <form class="mt-5" @submit.prevent="() => refresh()" novalidate>
          <div
            class="bg-indigo-100 border-indigo-200 border-2 rounded-md flex px-2 py-3 cursor-text"
            @click="(e) => (e.target as HTMLElement)?.querySelector('input')?.focus()"
          >
            <img src="assets/img/letter.svg" />
            <input
              type="email"
              placeholder="Email"
              class="bg-indigo-100 text-gray-600 placeholder:text-indigo-300/50 ml-2 border-none w-full autofill:bg-indigo-100"
              name="email"
              v-model="login.email"
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
              class="bg-indigo-100 text-gray-600 placeholder:text-indigo-300/50 ml-2 border-none w-full autofill:bg-indigo-100"
              name="password"
              v-model="login.password"
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
          <button
            class="big-button"
            :disabled="!loginFilled || status == 'pending'"
          >
            {{ status == "pending" ? "Pending…" : "Log in" }}
          </button>
        </form>
        <p class="mt-5 text-center">
          Don't have account?
          <NuxtLink to="/register" class="font-bold text-indigo-400"
            >Create an account</NuxtLink
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
        <p class="text-indigo-100 font-bold text-xl">
          Connect with any device.
        </p>
        <p class="text-indigo-100">
          Everything you need is an internet connection.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const store = useMyFormsStore();
const { login, loginFilled } = storeToRefs(store);
const { clearForm } = store;
const passwordFieldType = useState("passwordFieldType", () => "password");
let isSubmit = false;

onBeforeRouteLeave((to, from) => {
  if (
    to.path != "/login" &&
    (login.value.email.length || login.value.password.length) &&
    !isSubmit
  ) {
    let isClose = confirm("Данные могут быть потеряны. Закрыть страницу?");
    if (isClose) {
      clearForm("login");
      return;
    }
    return abortNavigation();
  }
  return;
});

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
        email: login.value.email,
        password: login.value.password,
      }),
    }),
  {
    immediate: false,
  }
);

watch(status, (newStatus) => {
  if (newStatus == "success" || newStatus == "error") {
    isSubmit = true;
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
