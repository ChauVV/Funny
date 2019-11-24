import { observable, action } from 'mobx'
// import AsyncStore from 'react-native-simple-store'
// import JWT from 'react-native-pure-jwt'
// import HomeStore from 'mobxStore/HomeStore'

// const pvk = 'GQDstcKsx1KHjPOuXOYg5MbeJ1XT0uFiwDVvVBrk'

class Post {
  @observable selectedPost = null
  @observable posts = [
    {
      id: 0,
      name: 'Patricia Franecki',
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/johnsmithagency/128.jpg',
      descriptions: 'Hey !!!Why didn’t you come to training?????????',
      image: null,
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
    }
  ]

  @action addPost = () => {

  }
}
const PostStore = new Post()
export default PostStore
