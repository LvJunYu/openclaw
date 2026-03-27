// Public speech-provider builders for bundled or third-party plugins.

export { buildElevenLabsSpeechProvider } from "../../extensions/elevenlabs/speech-provider.js";
export { buildInWorldSpeechProvider } from "../../extensions/inworld/speech-provider.js";
export { buildMicrosoftSpeechProvider } from "../../extensions/microsoft/speech-provider.js";
export { buildOpenAISpeechProvider } from "../../extensions/openai/speech-provider.js";
export {
  edgeTTS,
  elevenLabsTTS,
  inferEdgeExtension,
  INWORLD_TTS_MODELS,
  INWORLD_TTS_VOICES,
  inworldTTS,
  openaiTTS,
} from "../tts/tts-core.js";
export { OPENAI_TTS_MODELS, OPENAI_TTS_VOICES } from "../tts/tts-core.js";
export { parseTtsDirectives } from "../tts/tts-core.js";
export type { SpeechVoiceOption } from "../tts/provider-types.js";
