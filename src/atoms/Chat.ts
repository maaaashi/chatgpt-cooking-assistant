import { Chat } from '@/domains/chat'
import { atom } from 'recoil'
const initialChat = [
  new Chat(
    'AI',
    `こんにちは！  
使いたい食材や、使いたくない食材、こんな料理が作りたい！という希望があればご入力ください！  
また、これまで作成されたものは[こちら](/list)で確認できます。

現在、画像生成が動かない状態となっております。
復旧まではレシピ生成の機能のみでご活用ください。`,
    new Date()
  ),
]

export const ChatAtom = atom<Chat[]>({
  key: 'ChatState',
  default: initialChat,
})
