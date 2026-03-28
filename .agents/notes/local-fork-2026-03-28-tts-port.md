# Local Fork TTS Port Notes (2026-03-28)

## Context

- Goal: carry forward local TTS work from `v2026.3.13-1` onto `v2026.3.24`.
- Resulting scratch branch: `scratch/junyu-v2026.3.24-port`.
- Final carry-forward commits on that branch:
  - `5b6afe6f3a` `docs: carry forward local fork guidance`
  - `0243541b72` `feat(tts): port InWorld provider to latest TTS architecture`
  - `327c262202` `feat(tts): port per-agent voice config to latest runtime`

## Strategy

- Do not rebase the old TTS commits in place when upstream heavily refactors the same subsystem.
- Start from the latest release tag, then port forward the local behavior onto the new seams.
- Keep the logical split small:
  - local fork docs/housekeeping
  - provider integration
  - per-agent overlay on top of the new provider/runtime structure

## Why This Was The Clean Path

- `v2026.3.24` moved TTS toward a provider-registry/plugin model.
- Discord voice integration also moved, so replaying the old branch directly would mostly become conflict resolution against code that already changed shape.
- The clean seam for local behavior is now:
  - `agents[].voice`
  - `resolveTtsConfigForAgent(...)`
- Provider registration, secrets, and runtime provider setup stay global under `messages.tts`.

## Implementation Notes

- InWorld was ported as a bundled extension under `extensions/inworld/`.
- Per-agent TTS was added as a thin overlay only for voice-facing defaults:
  - provider
  - auto / enabled / mode
  - provider-specific voice/model fields
- Do not move API keys, base URLs, prefs paths, or timeouts into `agents[].voice`.
- Prefer updating runtime call sites to pass `agentId` into TTS entry points instead of branching provider internals again.

## Important Files And Seams

- `src/tts/tts.ts`
- `src/config/types.tts.ts`
- `src/config/types.agents.ts`
- `src/config/zod-schema.core.ts`
- `src/config/zod-schema.agent-runtime.ts`
- `src/auto-reply/reply/dispatch-from-config.ts`
- `src/auto-reply/reply/dispatch-acp.ts`
- `src/auto-reply/reply/commands-tts.ts`
- `src/auto-reply/status.ts`
- `extensions/inworld/`
- `extensions/discord/src/voice/manager.ts`

## Validation Loop

- Prefer focused checks over heavy full-suite runs:
  - targeted TTS config tests
  - targeted `/tts status` / status output tests
  - `pnpm check:base-config-schema`
  - `pnpm check:bundled-plugin-metadata`
  - `pnpm build`

## Gotchas

- Do not carry old `AGENTS.md` maintainer-policy text forward just because it existed on the old local branch. Keep only the local-fork-specific guidance.
- `dist-runtime` ignore rules were already present in `v2026.3.24`; no extra local carry-forward was needed there.
- If bundled plugin metadata changes, rebuild before testing runtime behavior. A stale build can still show:
  - `plugin inworld: plugin id mismatch (manifest uses "inworld", entry hints "inworld-speech")`
- The source-side fix for that warning was aligning bundled metadata so InWorld resolves to `idHint: "inworld"`.

## Next Time

- Before starting another similar rebase/port:
  - compare the old local feature commits against the latest tag
  - identify the new architectural seam first
  - prefer a fresh port over direct cherry-picks when upstream refactors the same subsystem
  - keep the port split into small logical commits so later rebases stay understandable
