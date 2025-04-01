<script>
  let transcript = ''; // For transcribed text
  let translation = ''; // For translated text
  let isRecording = false;
  let mediaRecorder;
  let audio;

  // Start recording
  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = async (event) => {
        const chunk = event.data;
        await sendAudioChunk(chunk); // Send each chunk to the server
      };

      mediaRecorder.start();
      isRecording = true;
    } catch (error) {
      console.error("Feil med mikrofonen:", error);
    }
  }

  // Stop recording
  function stopRecording() {
    mediaRecorder.stop();
    isRecording = false;
  }

  // Send a single audio chunk to the server
  async function sendAudioChunk(chunk) {
    const formData = new FormData();
    formData.append('file', chunk, 'chunk.wav'); // Append the audio chunk with a filename

    try {
      const response = await fetch('/api/whisper', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Error:', error);
        return;
      }

      const data = await response.json();
      transcript += data.transcription + ' '; // Append the new transcription to the existing text
      translation += data.translation + ' '; // Append the new translation to the existing text
      // Play the audio if a valid URL or Base64 string is returned
      if (data.audio) {
        const audioPlayer = new Audio(data.audio); // Create a new Audio object
        audioPlayer.play(); // Play the audio
      } else {
        console.error('No audio file returned from the server.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
</script>

<!-- UI for recording -->
<div>
  {#if isRecording}
    <button on:click={stopRecording}>Stopp opptak</button>
  {:else}
    <button on:click={startRecording}>Start opptak</button>
  {/if}
</div>

<p><strong>Transkripsjon:</strong> {transcript}</p>
<p><strong>Oversettelse:</strong> {translation}</p>