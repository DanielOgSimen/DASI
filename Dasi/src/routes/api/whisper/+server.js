import { OpenAI } from 'openai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import textToSpeech from "@google-cloud/text-to-speech";
import { env } from "$env/dynamic/private"; // Importerer miljøvariabler

// Resolve __dirname for ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: env.OPENAI_KEY // Use an environment variable
});

const ttsClient = new textToSpeech.TextToSpeechClient();


export async function POST({ request }) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    // Check if the file is valid
    if (!(file instanceof File)) {
      return new Response(
        JSON.stringify({ error: 'Filen ble ikke sendt med forespørselen.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Ensure the temp directory exists
    const tempDir = path.join(__dirname, 'temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    // Save the file temporarily
    const tempFilePath = path.join(tempDir, file.name);
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(tempFilePath, buffer);

    // Create transcription using OpenAI
    console.log('Sending file to OpenAI for transcription...');
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(tempFilePath),
      model: 'whisper-1',
    });
    console.log('Transcription received:', transcription);

    // Translate the transcription text using the chat completion endpoint
    console.log('Sending transcription to OpenAI for translation...');
    const translationResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Use 'gpt-3.5-turbo' or 'gpt-4'
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that translates text to Norwegian and dont answer anything else.',
        },
        {
          role: 'user',
          content: `Translate the following text to Norwegian:\n\n${transcription.text}`,
        },
      ],
      max_tokens: 1000,
    });

    const translation = translationResponse.choices[0]?.message?.content?.trim() || '';
    console.log('Translation received:', translation);

    // Delete the temporary file after processing
    try {
      fs.unlinkSync(tempFilePath);
    } catch (error) {
      console.error('Failed to delete temporary file:', error);
    }

    // Create audio using Google Text-to-Speech
    

    // Return the transcription and translation as a response
    return new Response(
      JSON.stringify({
        transcription: transcription.text,
        translation: translation
      }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Feil under behandling av filen:', error);
    return new Response(
      JSON.stringify({ error: 'Det oppstod en feil under behandling av forespørselen.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}