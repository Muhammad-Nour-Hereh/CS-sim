export interface Question {
  title: string
  content: object
}

export interface SelectQuestion extends Question {
  content: {
    answers: string[]
    correctAnswer: string
  }
}

export interface WriteQuestion extends Question {
  content: {
    correctAnswer: string
  }
}

export interface OrderQuestion extends Question {
  content: {
    correctOrder: string[]
    pieces: string[]
  }
}

export interface MatchQuestion extends Question {
  content: {
    pairs: [string, string][]
  }
}
