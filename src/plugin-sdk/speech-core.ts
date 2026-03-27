// Shared speech-provider implementation helpers for bundled and third-party plugins.

export type { SpeechProviderPlugin } from "../plugins/types.js";
export type { SpeechVoiceOption } from "../tts/provider-types.js";

export {
  edgeTTS,
  elevenLabsTTS,
  inferEdgeExtension,
  INWORLD_TTS_MODELS,
  INWORLD_TTS_VOICES,
  inworldTTS,
  OPENAI_TTS_MODELS,
  OPENAI_TTS_VOICES,
  openaiTTS,
  parseTtsDirectives,
} from "../tts/tts-core.js";

export { resolvePreferredOpenClawTmpDir } from "../infra/tmp-openclaw-dir.js";
export { isVoiceCompatibleAudio } from "../media/audio.js";
