export interface AbstractQuestion<TContent> {
  id: number
  title: string
  type: 'select' | 'write' | 'order' | 'match'
  content: TContent
}

export interface SelectQuestion
  extends AbstractQuestion<{
    options: string[]
    correctAnswer: string
  }> {
  type: 'select'
}

export interface WriteQuestion
  extends AbstractQuestion<{
    correctAnswer: string
  }> {
  type: 'write'
}

export interface OrderQuestion
  extends AbstractQuestion<{
    correctOrder: string[]
    pieces: string[]
  }> {
  type: 'order'
}

export interface MatchQuestion
  extends AbstractQuestion<{
    pairs: { left: string; right: string; selected: boolean }[]
  }> {
  type: 'match'
}

export type Question =
  | SelectQuestion
  | WriteQuestion
  | OrderQuestion
  | MatchQuestion
