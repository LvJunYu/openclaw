import type { SpeechProviderPlugin } from "openclaw/plugin-sdk/core";
import {
  INWORLD_TTS_MODELS,
  INWORLD_TTS_VOICES,
  type SpeechVoiceOption,
  inworldTTS,
} from "openclaw/plugin-sdk/speech";

const INWORLD_OUTPUT = {
  audioEncoding: "MP3" as const,
  outputFormat: "mp3",
  fileExtension: ".mp3",
  sampleRateHertz: 44_100,
  bitRate: 128_000,
};

export function buildInWorldSpeechProvider(): SpeechProviderPlugin {
  return {
    id: "inworld",
    label: "InWorld",
    models: INWORLD_TTS_MODELS,
    voices: INWORLD_TTS_VOICES,
    listVoices: async () =>
      INWORLD_TTS_VOICES.map(
        (voice): SpeechVoiceOption => ({
          id: voice,
          name: voice,
        }),
      ),
    isConfigured: ({ config }) => Boolean(config.inworld.apiKey || process.env.INWORLD_API_KEY),
    synthesize: async (req) => {
      const apiKey = req.config.inworld.apiKey || process.env.INWORLD_API_KEY;
      if (!apiKey) {
        throw new Error("InWorld API key missing");
      }
      const audioBuffer = await inworldTTS({
        text: req.text,
        apiKey,
        baseUrl: req.config.inworld.baseUrl,
        voiceId: req.overrides?.inworld?.voiceId ?? req.config.inworld.voiceId,
        modelId: req.overrides?.inworld?.modelId ?? req.config.inworld.modelId,
        audioEncoding: INWORLD_OUTPUT.audioEncoding,
        sampleRateHertz: INWORLD_OUTPUT.sampleRateHertz,
        bitRate: INWORLD_OUTPUT.bitRate,
        timeoutMs: req.config.timeoutMs,
      });
      return {
        audioBuffer,
        outputFormat: INWORLD_OUTPUT.outputFormat,
        fileExtension: INWORLD_OUTPUT.fileExtension,
        voiceCompatible: false,
      };
    },
  };
}
