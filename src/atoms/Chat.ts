import { Chat } from '@/domains/chat'
import { atom } from 'recoil'
const initialChat = [
  new Chat(
    'AI',
    `こんにちは！  
使いたい食材や、使いたくない食材、こんな料理が作りたい！という希望があればご入力ください！`,
    new Date()
  ),
]

export const ChatAtom = atom<Chat[]>({
  key: 'ChatState',
  default: initialChat,
})
