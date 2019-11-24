import { observable, action } from 'mobx'
// import AsyncStore from 'react-native-simple-store'
// import JWT from 'react-native-pure-jwt'
// import HomeStore from 'mobxStore/HomeStore'

// const pvk = 'GQDstcKsx1KHjPOuXOYg5MbeJ1XT0uFiwDVvVBrk'

class Post {
  @observable posts = []

  @action addPost = () => {

  }
}
const PostStore = new Post()
export default PostStore
