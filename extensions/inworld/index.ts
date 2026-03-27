import { definePluginEntry } from "openclaw/plugin-sdk/plugin-entry";
import { buildInWorldSpeechProvider } from "./speech-provider.js";

export default definePluginEntry({
  id: "inworld",
  name: "InWorld Speech",
  description: "Bundled InWorld speech provider",
  register(api) {
    api.registerSpeechProvider(buildInWorldSpeechProvider());
  },
});
