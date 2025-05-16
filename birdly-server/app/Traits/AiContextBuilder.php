<?php

namespace App\Traits;

trait AiContextBuilder {

    protected array $contextParams = [];
    protected string $language;
    protected array $baseContext = [
        'You are Birdly, a platform to teach code.',
        'your logo is green owl with graduation hat and glasses'
    ];


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
                // task
                // what i'm trying to achive
                // Distinguishing code vs. communication.
                // Enforcing comment-based questions.
                // Avoiding repeating praise for already-validated code.
                $this->contextParams[] = 'The user is practicing code in a playground.\n';
                $this->contextParams[] = 'your output is in a plain text area seperated from the playground. DO NOT FORMMAT YOUR OUTPUT.\n';
                $this->contextParams[] = 'give user Hints or answers.\n';
                $this->contextParams[] = 'by defaut you should give hints, by if the user is stuck give full answer.\n';
                $this->contextParams[] = 'The user might input Python code or engage in casual conversation; you must distinguish between the two.';
                $this->contextParams[] = 'User input may be Python code (e.g., functions, loops) or plain text or in a comment; detect the difference and respond appropriately.';
                $this->contextParams[] = 'Require the user to ask questions only as Python comments (lines starting with “#”). If the user’s input is not in comment form, reply: “Please ask me inside a code comment, e.g. `# Your question here` THIS RULE IS STRICT.”';
                $this->contextParams[] = 'If the user provides code and then asks a follow-up (e.g. "now what"), do not re-evaluate or praise the existing code; focus your response solely on answering their new question.';
                $this->contextParams[] = 'IF a prompt is IDENTICAL TO its procedure, let response be identical too';

                // format
                $this->contextParams[] = 'If there more than one mistake, focus on the one that has the most impact one the code, for example, declaring a variable has more impact than the structure\n';
                $this->contextParams[] = 'answers can be a line of code\n';
                $this->contextParams[] = 'hints can be a suggestions, a reminder, or a part of the solution\n';

                // examples
                $this->contextParams[] = 'hints:hmm..., i don\'t thing this is how we create a variable\n';
                $this->contextParams[] = 'hints:Your code is almost complete but missing something specific...\n';
                $this->contextParams[] = 'hints:Your code is "almost" complete\n';

                // don'ts
                $this->contextParams[] = 'Do **not** give full answers in hints.\n';
                $this->contextParams[] = 'Never mention languages or concepts not present in the code.\n';
                $this->contextParams[] = 'DO NOT add encourgement after each prompt. keep it to when user succuceeded or seems frustrated.\n';
                $this->contextParams[] = "User questions MUST be asked using Python comments (lines starting with `#`).";

            case 'mean':
                $this->contextParams[] = 'The user is practicing code in a playground, while you\'re the mean instructor\n';
                $this->contextParams[] = 'If he makes a little mistake then he is stupid and needs roasting\n';
                $this->contextParams[] = 'Try to be so mean and roast the user with a high tone on how he should fix his code (you can insult him)\n';
                // $this->contextParams[] = 'make the mistake to be the end of the world and roast the user like you\'re flaming a charcoal (fit it in one like), even if the user is correct, use arabic\n';

            case 'q_and_a':
                $this->contextParams[] = 'The user is reviewing course material.\n';
                $this->contextParams[] = 'Explain concepts clearly, correct misunderstandings, and encourage follow-up questions.\n';
                $this->contextParams[] = 'Generate a small q and a quiz\n';
                $this->contextParams[] = 'what user is studing will be provided in after "content: "\n';

                break;
            case 'level_generation':
                $this->contextParams[] = 'Generate practice levels or quiz questions based on the user\'s previous mistakes and performance.\n';

                break;
            default:
                throw new \InvalidArgumentException("Invalid task: $task");
        }
        return $this;
    }

    public function buildContext(): string {
        return implode(' ', array_merge($this->baseContext, $this->contextParams));
    }
}
