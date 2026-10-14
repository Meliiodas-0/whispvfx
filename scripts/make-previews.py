"""Create small, silent gallery loops from the already optimized web reels.

Requires Python and imageio-ffmpeg. Does not read or modify original captures.
"""
from pathlib import Path
import subprocess
import sys
import imageio_ffmpeg

root = Path(__file__).resolve().parent.parent
output = root / 'dist' / 'assets' / 'previews'
output.mkdir(parents=True, exist_ok=True)
starts = {
    'spectral-serpent': 2.5, 'fourfold-frost': 2, 'scarlet-ascension': 4,
    'crimson-hand-magic': 8, 'crimson-rift': 1.5, 'celestial-orbit': 8,
    'arcane-convergence': 1.5, 'crimson-flow-beam': 3, 'void-orb': 0,
    'violet-aegis': 0, 'red-lance': 0, 'storm-descent': 0,
    'rose-shatter': 0, 'ember-beam': 4, 'surface-impact': 10,
}
selected = set(sys.argv[1:])
if selected - starts.keys():
    raise SystemExit('Unknown effect: ' + ', '.join(sorted(selected - starts.keys())))
for source in sorted((root / 'dist' / 'assets' / 'reels').glob('*.mp4')):
    if selected and source.stem not in selected:
        continue
    target = output / source.name
    subprocess.run([
        imageio_ffmpeg.get_ffmpeg_exe(), '-hide_banner', '-loglevel', 'error', '-y',
        '-ss', str(starts[source.stem]), '-i', str(source), '-t', '6',
        '-vf', "scale='min(800,iw)':-2,fps=30,setsar=1", '-an', '-c:v', 'libx264',
        '-preset', 'medium', '-crf', '26', '-pix_fmt', 'yuv420p',
        '-movflags', '+faststart', '-map_metadata', '-1', str(target),
    ], check=True)
    print(f'{target.name}: {target.stat().st_size:,} bytes', flush=True)
