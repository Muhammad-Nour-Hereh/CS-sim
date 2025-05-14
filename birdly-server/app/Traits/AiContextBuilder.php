<?php

namespace App\Traits;

trait AiContextBuilder {
    protected $content = <<<TEXT
    ## Python Variables
    
    ### Variables
    Variables are containers for storing data values.
    
    ### Creating Variables
    Python has no command for declaring a variable.  
    A variable is created the moment you first assign a value to it.
    
    Example:
    x = 5  
    y = "John"  
    print(x)  
    print(y)
    
    Variables do not need to be declared with any particular type, and can even change type after they have been set.
    
    Example:
    x = 4       # x is of type int  
    x = "Sally" # x is now of type str  
    print(x)
    
    ### Casting
    If you want to specify the data type of a variable, this can be done with casting.
    
    Example:
    x = str(3)    # x will be '3'  
    y = int(3)    # y will be 3  
    z = float(3)  # z will be 3.0
    
    ### Get the Type
    You can get the data type of a variable with the type() function.
    
    Example:
    x = 5  
    y = "John"  
    print(type(x))  
    print(type(y))
    
    You will learn more about data types and casting later in this tutorial.
    
    ### Single or Double Quotes?
    String variables can be declared either by using single or double quotes.
    
    Example:
    x = "John"  
    # is the same as  
    x = 'John'
    
    ### Case-Sensitive
    Variable names are case-sensitive.
    
    Example:  
    This will create two variables:
    a = 4  
    A = "Sally"  
    # A will not overwrite a
    TEXT;

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
                $this->contextParams[] = 'The user is practicing code in a playground.\n';
                $this->contextParams[] = 'give user Hints or answers.\n';
                $this->contextParams[] = 'by defaut you should give hints, by if the user is stuck give full answer.\n';

                // format
                $this->contextParams[] = 'If there more than one mistake, focus on the one that has the most impact one the code, for example, declaring a variable has more impact than the structure\n';
                $this->contextParams[] = 'answers can be a line of code\n';
                $this->contextParams[] = 'hints can be a suggestions, a reminder, or a part of the solution\n';

                // examples
                $this->contextParams[] = 'hints:hmm..., i don\'t thing this is how we create a variable\n';
                $this->contextParams[] = 'hints:Your code is almost complete but missing something specific...\n';
                $this->contextParams[] = 'hints:Your code is "almost" complete\n';

                $this->contextParams[] = 'Do **not** give full answers unless asked.\n';
                $this->contextParams[] = 'Never mention languages or concepts not present in the code.\n';
                break;
            case 'mean':
                $this->contextParams[] = 'The user is practicing code in a playground, while you\'re the mean instructor\n';
                $this->contextParams[] = 'If he makes a little mistake then he is stupid and needs roasting\n';
                $this->contextParams[] = 'Try to be so mean and roast the user with a high tone on how he should fix his code (you can insult him)\n';
                // $this->contextParams[] = 'make the mistake to be the end of the world and roast the user like you\'re flaming a charcoal (fit it in one like), even if the user is correct, use arabic\n';
            case 'q_and_a':
                $this->contextParams[] = 'The user is reviewing course material.\n';
                $this->contextParams[] = 'Explain concepts clearly, correct misunderstandings, and encourage follow-up questions.\n';
                $this->contextParams[] = 'this page is what user study\n';
                $this->contextParams[] = $this->content;
                $this->contextParams[] = 'Generate a small q and a quiz\n';


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
