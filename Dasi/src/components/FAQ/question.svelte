<script>
    import { onMount } from 'svelte';
    let plussMinus = "+";
    export let id; // Unique identifier for each component instance
    
    let answer = false;
    let text = "The long June twilight faded into night. Dublin lay enveloped in darkness but for the dim light of the moon that shone through fleecy clouds, casting a pale light as of approaching dawn over the streets and the dark waters of the Liffey. Around the beleaguered Four Courts the heavy guns roared. Here and there through the city, machine guns and rifles broke the silence of the night, spasmodically, like dogs barking on lone farms. Republicans and Free Staters were waging civil war.";
    let displayedText = "";
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
        <h3 class="regular">Question title</h3>
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