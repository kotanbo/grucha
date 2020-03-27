import * as Vuex from 'vuex'

declare module 'vue/types/vue' {
  interface Vue {
    $exStore: Vuex.ExStore
  }
}
declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $exStore: Vuex.ExStore
  }
}
declare module 'vuex/types/index' {
  interface Store<S> {
    $exStore: Vuex.ExStore
  }
}

export default (context: any, inject: any) => {
  inject('exStore', context.store)
}
