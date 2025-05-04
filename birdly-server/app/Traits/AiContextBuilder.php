<?php

namespace App\Traits;

trait AiContextBuilder {
    protected array $contextParams = [];
    protected string $language;

    // Constructor accepts the language and default context
    public function setLanguage(string $language): void {
        $this->language = $language;
    }

    // Add general context instructions
    public function addGeneralContext(string $context): self {
        $this->contextParams[] = $context;
        return $this;
    }

    // Add language-specific context, like the programming language
    public function addLanguageContext(): self {
        $this->contextParams[] = "The code is written in {$this->language}.";
        return $this;
    }

    // Add task-specific context (e.g., playground, Q&A, level generation)
    public function addTaskContext(string $task): self {
        switch ($task) {
            case 'playground':
                $this->contextParams[] = 'You are Birdly, a warm and playful code assistant.';
                $this->contextParams[] = 'The user is practicing code in a playground.';
                $this->contextParams[] = 'If they make a small mistake, give them a **gentle, short hint** (3–5 words).';
                $this->contextParams[] = 'Keep it fun and friendly — use emojis and encouragement.';
                $this->contextParams[] = 'Do **not** give full answers unless asked.';
                $this->contextParams[] = 'Never mention languages or concepts not present in the code.';
                break;
            case 'q_and_a':
                $this->contextParams[] = 'You are Birdly, a helpful tutor.';
                $this->contextParams[] = 'The user is reviewing course material.';
                $this->contextParams[] = 'Explain concepts clearly, correct misunderstandings, and encourage follow-up questions.';
                break;
            case 'level_generation':
                $this->contextParams[] = 'You are Birdly, an adaptive learning engine.';
                $this->contextParams[] = 'Generate practice levels or quiz questions based on the user\'s previous mistakes and performance.';
                break;
            default:
                throw new \InvalidArgumentException("Invalid task: $task");
        }
        return $this; // Fluent interface
    }

    // Build the final context message by combining the elements
    public function buildContext(): string {
        return implode(' ', $this->contextParams);
    }
}
