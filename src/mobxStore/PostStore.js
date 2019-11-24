import { observable, action } from 'mobx'
// import AsyncStore from 'react-native-simple-store'
// import JWT from 'react-native-pure-jwt'
// import HomeStore from 'mobxStore/HomeStore'

// const pvk = 'GQDstcKsx1KHjPOuXOYg5MbeJ1XT0uFiwDVvVBrk'

const ALL_POST = [
  {
    id: 0,
    name: 'Patricia Franecki',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/johnsmithagency/128.jpg',
    descriptions: 'Hey !!!Why didn’t you come to training?????????',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6NPGtBMo8ymOD64ublHIzzvwhTovwDOzbTsLuVjhtl8zpBlCT&s',
    time: '2 days ago',
    like: 3045,
    comments: [
      {
        id: 'cm0',
        comment: 'which training?',
        userAvatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/kojourin/128.jpg',
        userName: 'Kelton Fritsch',
        time: '1 days ago',
        like: 302
      },
      {
        id: 'cm1',
        comment: 'how to become a great speaker…',
        userAvatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/swooshycueb/128.jpg',
        userName: 'anonymous',
        time: '13 hours ago',
        like: 543
      },
      {
        id: 'cm2',
        comment: 'not sure about the content',
        userAvatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/richwild/128.jpg',
        userName: 'anonymous',
        time: '12 hours ago',
        like: 212
      },
      {
        id: 'cm3',
        comment: 'you think it is interesting?lol',
        userAvatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/kojourin/128.jpg',
        userName: 'Kelton Fritsch',
        time: '11 hours ago',
        like: 1
      },
      {
        id: 'cm4',
        comment: 'Maybe, but not so relevant for me',
        userAvatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/mcflydesign/128.jpg',
        userName: 'Kylee Connelly',
        time: '9 hours ago',
        like: 32
      },
      {
        id: 'cm5',
        comment: 'Also after work??? 😫',
        userAvatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/okansurreel/128.jpg',
        userName: 'Kelsi Mraz',
        time: '8 hours ago',
        like: 602
      },
      {
        id: 'cm6',
        comment: 'It’s true, tired after a long day then',
        userAvatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/tanveerrao/128.jpg',
        userName: 'Mrs. Assunta Donnelly',
        time: '3 hours ago',
        like: 102
      }
    ]
  },
  {
    id: 2,
    name: 'anonymous',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/richwild/128.jpg',
    descriptions: 'What’s the price of hackathon?',
    image: 'https://s3.amazonaws.com/hackathonwatch/hackathon/uploads/hackathon/logo/525/normal_Logo-Hackathon-_1_.png',
    time: '3 days ago',
    like: 3045,
    comments: [
      {
        id: 'cm7',
        comment: 'What you mean?',
        userAvatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/okansurreel/128.jpg',
        userName: 'Kelton Fritsch',
        time: '3 days ago',
        like: 102
      },
      {
        id: 'cm8',
        comment: '30 mil',
        userAvatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/swooshycueb/128.jpg',
        userName: 'anonymous',
        time: '13 hours ago',
        like: 543
      },
      {
        id: 'cm9',
        comment: 'wow! I will got it.',
        userAvatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/okansurreel/128.jpg',
        userName: 'anonymous',
        time: '13 hours ago',
        like: 543
      }
    ]
  },
  {
    id: 3,
    name: 'Kelton Fritsch',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/okansurreel/128.jpg',
    descriptions: 'Year end party is coming? Who know what’s plan?',
    image: null,
    time: '4 days ago',
    like: 115,
    comments: [

    ]
  }
]
class Post {
  @observable selectedPost = null
  @observable posts = []

  @action getAllPost = () => {
    this.posts = ALL_POST
  }

  @action addPost = (post) => {
    this.posts.unshift(post)
  }

  @action addComment = (comment) => {
    if (this.selectedPost) {
      const posts = this.posts
      const post = this.selectedPost
      posts.map(p => {
        if (p.id === post.id) {
          post.comments.unshift(comment)
          p = post
        }
      })
      this.selectedPost = post
      this.posts = posts
    }
  }
}
const PostStore = new Post()
export default PostStore
