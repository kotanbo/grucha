import { GetterTree } from 'vuex';
import { PostsState, RootState } from '~/store/types';

const getters: GetterTree<PostsState, RootState> = {
  size: (state: PostsState) => {
    return state.posts.length;
  },
}

export default getters
