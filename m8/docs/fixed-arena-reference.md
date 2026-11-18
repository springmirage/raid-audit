# Fixed arena reference for M8 replays

All accessible activity-day replays use one fixed WCL-yard reference (1, 1553), independent of player tracks, fight bounds, deaths or egg distributions.

Conversion: `screenX = wclX - 1`; `screenY = 1553 - wclY`. Original samples remain unchanged. Display unit is one yard. Default viewBox is `-70 -70 140 140`; SVG overflow remains visible so zooming out includes distant samples rather than deleting/clamping them. The center and diagonal guides stay at local (0,0).

## Calibration source and limits

This is a third-party arena calibration, not a claim that Blizzard defines the same world origin. Raidstrats Ula'tek module provides a fixed WCL-centiyard anchor `cx:100, cy:155300` independent of any fight's observed bounds, and repeats these values in its mechanic geometry. The corresponding map-image anchor is `tx:2475.8, ty:1371.6` on `ula-3.jpg`; it falls at the central main platform. The module also supplies scale `.14854`, rotation `Math.PI+.00356`, flipX true, flipY false. We adopt only the fixed world anchor, not their image transform or image asset.

Sources inspected 2026-11-18:
- https://raidstrats.gg/vite-assets/chunks/custom-Bktw4HLg.js
- https://raidstrats.gg/background/ula-3.jpg
- https://raidstrats.gg/replay/play?r=LbHw4cjQX9AK7DZ1&f=4

Cross-check with this repository's raw-event axis calibration: WCL x east and y north, so keep x and invert y for Boss-up. Boss (1.23,1599.81) transforms to (0.23,-46.81). The measured left/right marker and egg samples preserve handedness. Historical 2026-11-10's additional x flip is removed under the user's all-fights correction request.

The diagonal lines are quadrant guides, not measured platform walls. Neither the API's per-fight boundingBox nor player extrema supply the origin. Archived JSON evidence and raw coordinates are unmodified.
