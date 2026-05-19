# VO Pads

VO Pads is a browser-local performance tool for arranging video and image sources onto triggerable pads, then playing or sequencing those pads during a live set.

## Language

**Project**:
A local saved performance setup containing pads, sequencing, presentation settings, and metadata.
_Avoid_: Document, session

**Pad**:
A triggerable slot whose configuration determines what plays when triggered.
_Avoid_: Clip, button

**Media Source**:
An assignable input for a pad, such as a YouTube URL or ID, local file, pasted image, or future provider URL.
_Avoid_: Source, clip

**Media**:
Resolved metadata and stored data derived from a Media Source.
_Avoid_: Source

**Share Preview**:
Request-time metadata for a shared Project URL, used by link unfurlers before the browser-local app loads.
_Avoid_: Backend project state

**Playback Engine**:
The browser-local runtime boundary that turns Pad triggers into playback commands, readiness state, choke-group stops, priority ordering, and visible playback state.
_Avoid_: Player, backend playback

**Starter Project**:
An importable, remixable Project intended to help a performer reach a playable setup quickly.
_Avoid_: Template, demo project

**Controller Profile**:
A reusable local user asset describing input mappings that can be applied across Projects.
_Avoid_: Project mapping, device preset

**Show Package**:
An exportable bundle containing Project structure and eligible local Media for moving a performance setup between devices.
_Avoid_: Cloud backup, hosted project

## Relationships

- A **Project** contains multiple **Pads**.
- A **Pad** may have zero or one active **Media Source**.
- A **Media Source** resolves to **Media** before playback, thumbnailing, or persistence.
- The **Playback Engine** interprets **Pad** triggers and coordinates playback through Player adapters.
- A **Share Preview** may describe a **Project**, but it does not persist Project or Media data outside the browser.
- A **Starter Project** becomes a local **Project** when imported or remixed.
- A **Controller Profile** may be applied to many **Projects**, but it is not owned by a single Project.
- A **Show Package** may include eligible local **Media**, while provider-backed **Media Sources** remain references.

## Example dialogue

> **Dev:** "When a performer drops a local video onto a **Pad**, should we save the file directly on the pad?"
> **Domain expert:** "No - the dropped file is the **Media Source**. Resolve it to **Media**, persist that browser-locally, then assign the source to the **Pad** inside the **Project**."

## Flagged ambiguities

- "source" was used to mean both the assignable **Media Source** and the resolved **Media**. Resolved: use **Media Source** for the input assigned to a pad, and **Media** for resolved metadata/stored data.
- "player" is overloaded in code between React components, adapter instances, DOM surfaces, and runtime state. Use **Playback Engine** for the domain/runtime boundary and reserve Player for adapter or component names.
