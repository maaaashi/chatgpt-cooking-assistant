import { Chat } from '@/domains/chat'
import { atom } from 'recoil'
const initialChat = [
  new Chat(
    'AI',
    `こんにちは！  
現在環境の移行を行なっており、しばらくの間、AIの機能が停止しております。  
また、これまで作成されたものは[こちら](/list)で確認できます。`,
    new Date()
  ),
  //   new Chat(
  //     'AI',
  //     `こんにちは！
  // 使いたい食材や、使いたくない食材、こんな料理が作りたい！という希望があればご入力ください！
  // また、これまで作成されたものは[こちら](/list)で確認できます。`,
  //     new Date()
  //   ),
]

export const ChatAtom = atom<Chat[]>({
  key: 'ChatState',
  default: initialChat,
})
