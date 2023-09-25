import { Chat } from '@/domains/chat'
import { atom } from 'recoil'
const initialChat = [new Chat('AI', 'こんにちは！', new Date())]

export const ChatAtom = atom<Chat[]>({
  key: 'ChatState',
  default: initialChat,
})
