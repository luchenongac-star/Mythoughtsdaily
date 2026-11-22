"""Original 8-bit 'run day' chiptune (royalty-free, generated). Writes public/audio/run-theme.mp3"""
import numpy as np, wave, subprocess, os
SR = 44100; BPM = 132; BEAT = 60 / BPM; DUR = 80
n = int(SR * DUR); t = np.arange(n) / SR
def f(m): return 440 * 2 ** ((m - 69) / 12)
def sq(freq, tt, duty=0.5): return np.where(((tt * freq) % 1.0) < duty, 1.0, -1.0)
def tri(freq, tt): return 2 * np.abs(2 * ((tt * freq) % 1.0) - 1) - 1
L = np.zeros(n); R = np.zeros(n)
def add(sig, start, gain=1.0, pan=0.0):
    i = int(start * SR); j = min(n, i + len(sig))
    if i >= n: return
    s = sig[: j - i] * gain
    L[i:j] += s * (1 - max(0, pan)); R[i:j] += s * (1 + min(0, pan))
def env(length, a=0.004, r=0.08):
    k = int(length * SR); e = np.ones(k); ai = max(1, int(a * SR)); ri = max(1, int(r * SR))
    e[:ai] = np.linspace(0, 1, ai); e[-ri:] *= np.linspace(1, 0, ri); return e
# C - G - Am - F ; two bars each (8th-note arps)
chords = [(60, 64, 67), (55, 59, 62), (57, 60, 64), (53, 57, 60)]
bass_root = [36, 43, 45, 41]
melody = [  # per chord, 8 eighth notes (midi offsets from chord idx, None = rest)
    [76, 79, 76, 72, 74, 76, 72, None], [74, 79, 78, 74, 71, 74, 79, None],
    [72, 76, 81, 76, 72, 76, 74, None], [72, 77, 81, 77, 76, 74, 72, None]]
rng = np.random.default_rng(7)
bar = BEAT * 4; nbars = int(DUR / bar)
for b in range(nbars):
    ci = (b // 2) % 4; t0 = b * bar; ch = chords[ci]
    sec = (b // 8) % 2   # alternate energy every 8 bars
    for e in range(8):
        st = t0 + e * BEAT / 2; ln = BEAT / 2 * 0.9; tt = np.arange(int(ln * SR)) / SR
        # arpeggio
        add(sq(f(ch[e % 3] + 12), tt, 0.25) * env(ln, r=0.05), st, 0.10, -0.4)
        # melody (square, 50%) enters from bar 2
        m = melody[ci][e]
        if m and b >= 2 and (b % 8) < 7:
            add(sq(f(m), tt, 0.5) * env(ln, r=0.06), st, 0.16 if sec == 0 else 0.20, 0.3)
        # bass triangle
        add(tri(f(bass_root[ci] + (12 if e % 4 == 3 else 0)), tt) * env(ln, r=0.04), st, 0.30)
        # hat on every 8th
        add(rng.uniform(-1, 1, int(0.03 * SR)) * np.linspace(1, 0, int(0.03 * SR)), st, 0.05 if e % 2 else 0.08, 0.2)
    for kb in (0, 2):  # kick beats 1,3 ; snare 2,4
        st = t0 + kb * BEAT; kt = np.arange(int(0.12 * SR)) / SR
        add(np.sin(2 * np.pi * (140 * np.exp(-kt * 28)) * kt) * np.linspace(1, 0, len(kt)), st, 0.35)
        st = t0 + (kb + 1) * BEAT; add(rng.uniform(-1, 1, int(0.09 * SR)) * np.linspace(1, 0, int(0.09 * SR)), st, 0.14)
# master: gentle intro, fade out, soft clip
fade_in = np.minimum(1, t / 1.5); fade_out = np.minimum(1, (DUR - t) / 4.0)
for ch_ in (L, R): ch_ *= fade_in * fade_out
st = np.tanh(np.stack([L, R], 1) * 1.3) * 0.8
wav = "/tmp/run-theme.wav"
with wave.open(wav, "wb") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((st * 32767).astype("<i2").tobytes())
out = os.path.join(os.path.dirname(__file__), "..", "public", "audio", "run-theme.mp3")
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", wav, "-b:a", "160k", out], check=True)
print("ok", out)
