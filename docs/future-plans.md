# VO Pads Future Exploration Map

This document is an exploration map, not a roadmap, backlog, or release promise. It collects possible future directions for VO Pads and keeps them comparable without committing the project to any one path.

The north star is VO Pads as a live performance instrument: a solo or casual performer should be able to discover or remix a playable setup, map it quickly, and perform it confidently. The browser-local Project and Media model remains the core. Optional services are worth exploring only when they support performance, remixing, or show readiness without turning the app into a cloud-first platform.

## Horizons

- **Adjacent**: close to the current app shape and likely to reuse the existing browser-local model.
- **Ambitious**: meaningful product expansion or new domain concepts, with clear architecture and UX trade-offs.
- **Moonshot**: blue-sky direction that could reshape the product if proven valuable.

## Pillar 1: Controller Performance Depth

Controller performance depth is about making Pads feel fast, predictable, and expressive under real show pressure. Future work in this pillar should strengthen the Playback Engine and input mapping experience rather than make controller setup a separate product.

### Controller Profiles

- **Horizon**: Adjacent
- **User value**: A performer can save a reusable MIDI, keyboard, or touch mapping and apply it across Projects or Starter Projects.
- **Dependencies**: Stable mapping model, import/export for profiles, clear conflict handling when a Project suggests different mappings.
- **Risks**: Profiles can become confusing if they silently override Project behavior or hide which Pad is triggered by which control.
- **Validation signal**: A user can open a Starter Project, apply their preferred Controller Profile, and perform without remapping every Pad.
- **ADR boundary**: Stays browser-local and supports the existing Playback Engine boundary. It should not add server playback or persistence responsibilities.

### Guided Mapping Mode

- **Horizon**: Adjacent
- **User value**: A performer can map controls by touching a Pad, pressing a controller input, and seeing immediate feedback.
- **Dependencies**: Better input feedback, mapping state, and safe handling for duplicate assignments.
- **Risks**: Mapping mode could interrupt performance if it is too easy to enter accidentally or if edits are applied mid-set.
- **Validation signal**: A first-time MIDI user can connect a controller and map a small Project without reading documentation.
- **ADR boundary**: Fits the browser-local runtime. It should remain an input workflow, not a remote configuration service.

### Performance Gestures

- **Horizon**: Ambitious
- **User value**: Pads can respond to richer controller behavior such as velocity, latching, repeats, modifiers, or quantized triggers.
- **Dependencies**: A clearer distinction between raw input, mapping policy, and Playback Engine commands.
- **Risks**: Gesture features can make Projects less portable if they depend on specific hardware behavior.
- **Validation signal**: Existing simple Pad triggering stays easy while advanced users can create more expressive live sets.
- **ADR boundary**: Any new gesture policy should feed the Playback Engine rather than leaking into Player adapters or DOM helpers.

## Pillar 2: Remixable Starter Projects

Starter Projects help casual users move from discovery to performance. The goal is not passive browsing; it is giving users a playable Project they can understand, adapt, and run with their own Media Sources and Controller Profiles.

### Starter Project Gallery

- **Horizon**: Adjacent
- **User value**: A user can import a known-good Starter Project and learn the app by remixing something playable.
- **Dependencies**: Curated examples, safe import flow, clear attribution, and preview metadata that does not imply hosted Project persistence.
- **Risks**: Starter Projects can become stale if they depend on unavailable provider URLs or undocumented controller assumptions.
- **Validation signal**: New users reach a playable Pad grid faster than starting from an empty Project.
- **ADR boundary**: A static or bundled gallery fits the current Vite SPA plus thin preview server model.

### Hosted Project Registry

- **Horizon**: Ambitious
- **User value**: Users can publish, discover, fork, and update Starter Projects under stable URLs.
- **Dependencies**: Registry model, moderation policy, attribution, versioning, import flow, and clear data ownership boundaries.
- **Risks**: This is a boundary-pushing optional service. If it stores full Projects or Media, it would contradict the current browser-local architecture.
- **Validation signal**: Users discover Starter Projects from the registry and remix them into local Projects without needing accounts for basic playback.
- **ADR boundary**: The registry should store Project manifests and metadata, not Media. Local Media remains local, and provider-backed Media Sources remain external references.

### Remix Lineage

- **Horizon**: Moonshot
- **User value**: A user can see where a Starter Project came from, what changed, and how to credit or fork it.
- **Dependencies**: Stable Project identity, manifest versioning, attribution fields, and a registry or share mechanism that can preserve lineage.
- **Risks**: Lineage can make the product feel social-first instead of performance-first if it dominates the workflow.
- **Validation signal**: Remix metadata helps users choose and adapt Projects without slowing down the path to performance.
- **ADR boundary**: Lineage may need hosted metadata, but it should not require hosted Media or server-side playback.

## Pillar 3: Portable Show Packages

Portable show packages are about confidence before a live set. They should help a performer move a performance setup between devices while making Media availability and provider risks explicit.

### Exportable Show Package

- **Horizon**: Ambitious
- **User value**: A performer can export a show file containing Project structure and eligible local Media, then import it on another device.
- **Dependencies**: Bundle format, file-size limits, Media eligibility rules, import repair flow, and compatibility checks.
- **Risks**: Large packages, browser storage limits, and unclear provider rules can make portability unreliable if not surfaced early.
- **Validation signal**: A user can move a local-Media Project to another browser and confirm it is playable before a set.
- **ADR boundary**: A Show Package is a user-controlled export, not cloud persistence. YouTube and future provider Media should travel as references only, with preflight warnings.

### Project Preflight

- **Horizon**: Adjacent
- **User value**: A performer can check missing Media, invalid provider URLs, unmapped controls, browser support, and playback readiness before performing.
- **Dependencies**: Readiness checks across Project, Media Source, Media, Controller Profile, and Playback Engine state.
- **Risks**: Preflight can produce noisy warnings if it does not separate show-critical failures from useful suggestions.
- **Validation signal**: Users run preflight before a set and fix actionable issues without needing to inspect every Pad manually.
- **ADR boundary**: Preflight should read browser-local state and provider reachability. It should not become a backend validation service.

### Device Handoff

- **Horizon**: Moonshot
- **User value**: A user can move a Project, Controller Profile, and eligible Media from preparation device to performance device with confidence.
- **Dependencies**: Show Package maturity, clear conflict resolution, storage estimates, and import compatibility reporting.
- **Risks**: Handoff can imply sync or account behavior if the product language is not careful.
- **Validation signal**: A user can prepare on one machine, test on another, and know what still depends on network/provider access.
- **ADR boundary**: Handoff should be based on explicit export/import unless a later ADR commits to optional sync.

## De-emphasized Branches

### AI Generation

AI generation is not a main branch for this exploration map. Generated visuals, automatic Pad setup, or AI-assisted remixing may be useful experiments later, but they do not currently strengthen the core path of discovering a playable setup, mapping it quickly, and performing it confidently.

### Full Cloud Platform

A full cloud platform is not the default direction. Accounts, hosted Media libraries, real-time collaboration, and cross-device sync may become future options, but they should be evaluated as optional services around the browser-local performance core.

## Open Questions

- What minimum Controller Profile model supports MIDI, keyboard, and touch without overfitting to one controller family?
- What fields belong in a Project manifest if a registry stores no Media?
- What should make a Media item eligible for inclusion in a Show Package?
- How should the app communicate provider-backed Media risk without making shared Projects feel broken?
- When does a registry, Show Package format, or sync-like workflow become committed enough to require an ADR?
