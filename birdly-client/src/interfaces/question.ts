export interface AbstractQuestion<TContent> {
  title: string
  type: 'select' | 'write' | 'order' | 'match'
  content: TContent
}

export interface SelectQuestion
  extends AbstractQuestion<{
    answers: string[]
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
    pairs: [string, string][]
  }> {
  type: 'match'
}

export type Question =
  | SelectQuestion
  | WriteQuestion
  | OrderQuestion
  | MatchQuestion
