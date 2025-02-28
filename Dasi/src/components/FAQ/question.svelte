<script>
    import { onMount } from 'svelte';
    let plussMinus = "+";
    export let id; // Unique identifier for each component instance
    export let title; // Question text
    export let answerText; // Answer text
    
    let answer = false;
    let text = answerText;   
    let displayedText = {};
    let intervalDuration = 200 / (text.length / 2); // Calculate interval duration for 0.2 seconds, adding two characters at a time
    
    const toggleAnswer = () => {
        if (answer) {
            answer = false;
            displayedText = "";
            plussMinus = "+";
        } else {
            answer = true;
            plussMinus = "-";
            displayedText = "";
            let i = 0;
            const interval = setInterval(() => {
                if (i < text.length) {
                    displayedText += text.charAt(i);
                    if (i + 1 < text.length) {
                        displayedText += text.charAt(i + 1);
                    }
                    i += 2;
                } else {
                    clearInterval(interval);
                }
            }, intervalDuration); // Use calculated interval duration
        }
    };
    
    onMount(() => {
        const allQuestionDiv = document.querySelector(`.allQuestion-${id}`);
        if (allQuestionDiv) {
            allQuestionDiv.addEventListener('click', toggleAnswer);
        }

        return () => {
            if (allQuestionDiv) {
                allQuestionDiv.removeEventListener('click', toggleAnswer);
            }
        };
    });
</script>

<div class={`allQuestion allQuestion-${id}`}>
    <div class="questionTitlePluss">
        <h3 class="regular title">{title}</h3>
        <div class="pluss">{plussMinus}</div>
    </div>
    {#if answer}
    <div class="questionAnswer">
        <p class="answer">{displayedText}</p>
    </div>
    {/if}
    <hr class="questionLine">
</div>

<style>
.title {
    font-size: 16px;
}

.allQuestion {
    cursor: pointer;
}

.answer {
    color: var(--secondary-text);
    line-height: 1.6;
    letter-spacing: 0.5px;
    font-size: 13px;
}

.questionLine {
    border: none;
    height: 1px;
    background-color: var(--secondary-text);
    margin: 20px 0;
}

.questionTitlePluss {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    color: var(--primary-text);
    margin-bottom: 0.5rem;
    font-size: 14px;
}
</style>