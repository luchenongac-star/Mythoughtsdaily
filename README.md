# Pokémon Run vlog (Remotion)

Daily vertical vlog (1080×1920, 30 fps) built from phone photos + clips.

## Make a new episode
1. Put the day's photos in story order into `scripts/prepare.py` (`STORY` list) and run `python3 scripts/prepare.py` → `raw/` (local only, never committed).
2. Face privacy: `python3 scripts/detect_faces.py <previewDir>` suggests candidates; review them and list real bystander faces (x, y, w, h in `raw/` pixels) in `scripts/blur_boxes.json`. Keep your own face out of the list.
3. `python3 scripts/blur_faces.py` → blurred copies in `public/photos/` (these are what the video uses).
4. Edit `src/data/day01.ts` (copy it for `day02.ts`): captions, beats per scene, route position (`km`), Pokédex spots.
5. Preview: `npm run studio`. Stills: `node scripts/stills.mjs out/stills <frame> ...`.
6. Render: `npm run render` → `out/day-01.mp4`.

Clips: convert phone HEVC `.mov` to H.264 first (`ffmpeg -i in.mov -c:v libx264 -crf 20 -pix_fmt yuv420p -an public/clip/name.mp4`).
Music: `python3 scripts/make_music.py` generates an original 132-BPM chiptune; scene cuts land on its beat grid (`BPM` in the data file).

Fan-made. Pokémon © Nintendo / Creatures Inc. / GAME FREAK inc.
