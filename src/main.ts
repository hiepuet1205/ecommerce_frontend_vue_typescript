import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from "@fortawesome/free-solid-svg-icons";
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import axios from 'axios'
import Cookies from 'js-cookie';
import { useAuthStore } from './store/auth'
import { useRouter } from 'vue-router'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

library.add(fas)

axios.defaults.baseURL = import.meta.env.VITE_API_URL_BACKEND;
axios.defaults.withCredentials = true;

const getRefreshToken = () => {
  return Cookies.get('refresh_token')
}

axios.interceptors.response.use(async (response) => {
  const code = response.status;
  if (code === 200 && response.data.name === 'TokenExpiredError') {
    const authStore = useAuthStore();
    const router = useRouter();
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      authStore.logoutHandle();
      router.push({ name: 'LoginPage' })
    }

    await axios.post('auth/refresh-token', null, {
      headers: {
        'Authorization': `Bearer ${refreshToken}`
      }
    })
      .then((response) => {
        const newToken = response.data.access_token;
        authStore.setToken(newToken)
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        return axios(response.config);
      })
      .catch((error) => {
        console.error('Lỗi khi lấy token mới', error);
        return Promise.reject(error);
      });
  }
  return response;
}, error => {
  console.warn('Error status', error.response.status);
  return Promise.reject(error);
});

createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon).use(pinia).mount('#app')
