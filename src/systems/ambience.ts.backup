// =============================================
// GODTIDE: BASTION SEA - Procedural Ambient Sound System
// =============================================
// Location-aware ambient soundscapes using Web Audio API.
// No audio files required. Pure synthesis.
//
// Ambience changes based on WHERE the player is (island type),
// WHAT they're doing (panel/combat/travel), and scene context.
// Each soundscape is a layered mix of procedural audio.
// =============================================

export type AmbienceType =
  // Location-based
  | 'port_tavern'       // Tavven Shoal, harbor scenes: dock water, crowd murmur, gulls, rope creak
  | 'island_settled'    // Keldriss, Coppervein, Sorrens, Anvil Cay, Noon: wind, birds, distant voices
  | 'island_wild'       // Mossbreak surface, Windrow, Rotstone: wind, insects, wood creaking
  | 'underground'       // Mossbreak caves, underground scenes: stone echo, dripping, deep hum
  | 'wardensea_military'// Durrek Garrison, Vess Harbour: low pulse, boot steps, flag flapping
  | 'ghostlight'        // Ghostlight Reef: eerie tone, fog-muffle, distant chimes
  | 'mirrorwater'       // Mirrorwater: glass-still water, crystalline tones, barely-there wind
  // Gameplay-state
  | 'open_sea'          // Map panel, general ocean: waves, wind, open water
  | 'voyage'            // Sea travel: deep ocean hum, wind, hull creaking
  | 'combat'            // Battle: tension drone, heartbeat, metallic echoes
  | 'combat_boss'       // Boss fights: deeper drone, rising pressure, distortion
  | 'storm'             // Threat/raids: heavy rain, thunder, howling wind
  // Scene-specific
  | 'story_tension'     // Tense story moments: low pressure, uneasy hum
  | 'story_calm'        // Quiet intimate scenes: warm pad, soft air
  // System
  | 'title'             // Title screen: ethereal pad + gentle ocean
  | 'silence';          // No ambience

// =============================================
// ISLAND-TO-AMBIENCE MAP
// =============================================

const ISLAND_AMBIENCE: Record<string, AmbienceType> = {
  tavven_shoal: 'port_tavern',
  keldriss: 'island_settled',
  durrek_garrison: 'wardensea_military',
  coppervein: 'island_settled',
  mossbreak: 'island_wild',
  sorrens_flat: 'island_settled',
  anvil_cay: 'island_settled',
  mirrorwater: 'mirrorwater',
  windrow: 'island_wild',
  ghostlight_reef: 'ghostlight',
  vess_harbour: 'wardensea_military',
  noon_island: 'island_settled',
  rotstone: 'island_wild',
};

// =============================================
// NOISE GENERATOR UTILITIES
// =============================================

/** Create a looping buffer of filtered noise */
function createNoiseBuffer(ctx: AudioContext, seconds: number): AudioBuffer {
  const sampleRate = ctx.sampleRate;
  const length = sampleRate * seconds;
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
}

/** Create a sine wave oscillator node */
function createOsc(
  ctx: AudioContext,
  freq: number,
  type: OscillatorType = 'sine',
  detune = 0,
): OscillatorNode {
  const osc = ctx.createOscillator();
  osc.type = type;
  osc.frequency.value = freq;
  osc.detune.value = detune;
  return osc;
}

// =============================================
// LAYER BUILDERS -- each returns a gain node to connect
// =============================================

interface AmbienceLayer {
  output: GainNode;
  nodes: (AudioNode | AudioBufferSourceNode | OscillatorNode)[];
}

// ------- WATER LAYERS -------

/** Ocean waves: filtered noise with LFO modulation */
function buildOceanWaves(ctx: AudioContext, volume = 0.25): AmbienceLayer {
  const nodes: (AudioNode | AudioBufferSourceNode | OscillatorNode)[] = [];
  const output = ctx.createGain();
  output.gain.value = volume;

  const noiseBuffer = createNoiseBuffer(ctx, 4);
  const noise = ctx.createBufferSource();
  noise.buffer = noiseBuffer;
  noise.loop = true;

  const bp = ctx.createBiquadFilter();
  bp.type = 'bandpass';
  bp.frequency.value = 400;
  bp.Q.value = 0.5;

  const lfo = createOsc(ctx, 0.08);
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 200;
  lfo.connect(lfoGain);
  lfoGain.connect(bp.frequency);
  lfo.start();

  const volLfo = createOsc(ctx, 0.1);
  const volLfoGain = ctx.createGain();
  volLfoGain.gain.value = volume * 0.4;
  volLfo.connect(volLfoGain);
  volLfoGain.connect(output.gain);
  volLfo.start();

  noise.connect(bp);
  bp.connect(output);
  noise.start();

  nodes.push(noise, bp, lfo, lfoGain, volLfo, volLfoGain);
  return { output, nodes };
}

/** Gentle dock water lapping: quieter, more rhythmic than open ocean */
function buildDockWater(ctx: AudioContext): AmbienceLayer {
  const nodes: (AudioNode | AudioBufferSourceNode | OscillatorNode)[] = [];
  const output = ctx.createGain();
  output.gain.value = 0.12;

  const noiseBuffer = createNoiseBuffer(ctx, 3);
  const noise = ctx.createBufferSource();
  noise.buffer = noiseBuffer;
  noise.loop = true;

  // Narrower band, lower frequency: water against wood, not open surf
  const bp = ctx.createBiquadFilter();
  bp.type = 'bandpass';
  bp.frequency.value = 250;
  bp.Q.value = 1.0;

  // Rhythmic lapping LFO
  const lfo = createOsc(ctx, 0.3);
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 0.08;
  lfo.connect(lfoGain);
  lfoGain.connect(output.gain);
  lfo.start();

  noise.connect(bp);
  bp.connect(output);
  noise.start();

  nodes.push(noise, bp, lfo, lfoGain);
  return { output, nodes };
}

/** Dripping water: irregular high-frequency clicks */
function buildDrips(ctx: AudioContext, volume = 0.06): AmbienceLayer {
  const nodes: (AudioNode | AudioBufferSourceNode | OscillatorNode)[] = [];
  const output = ctx.createGain();
  output.gain.value = volume;

  // Two detuned high-frequency oscillators modulated by very slow LFOs
  // creates an irregular "ping" texture like water drops on stone
  [2400, 3200].forEach((freq, i) => {
    const osc = createOsc(ctx, freq, 'sine', i * 7);
    const oscGain = ctx.createGain();
    oscGain.gain.value = 0;

    // Irregular pulse: multiply two LFOs at non-harmonic ratios
    const lfo1 = createOsc(ctx, 0.7 + i * 0.3);
    const lfo1Gain = ctx.createGain();
    lfo1Gain.gain.value = 0.04;
    lfo1.connect(lfo1Gain);
    lfo1Gain.connect(oscGain.gain);
    lfo1.start();

    const lfo2 = createOsc(ctx, 0.13 + i * 0.07);
    const lfo2Gain = ctx.createGain();
    lfo2Gain.gain.value = 0.03;
    lfo2.connect(lfo2Gain);
    lfo2Gain.connect(oscGain.gain);
    lfo2.start();

    osc.connect(oscGain);
    oscGain.connect(output);
    osc.start();
    nodes.push(osc, oscGain, lfo1, lfo1Gain, lfo2, lfo2Gain);
  });

  return { output, nodes };
}

// ------- WIND LAYERS -------

/** Wind: high-pass filtered noise with slow modulation */
function buildWind(ctx: AudioContext, intensity = 0.15): AmbienceLayer {
  const nodes: (AudioNode | AudioBufferSourceNode | OscillatorNode)[] = [];
  const output = ctx.createGain();
  output.gain.value = intensity;

  const noiseBuffer = createNoiseBuffer(ctx, 3);
  const noise = ctx.createBufferSource();
  noise.buffer = noiseBuffer;
  noise.loop = true;

  const hp = ctx.createBiquadFilter();
  hp.type = 'highpass';
  hp.frequency.value = 800;
  hp.Q.value = 0.3;

  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = 2000;

  const gustLfo = createOsc(ctx, 0.15);
  const gustGain = ctx.createGain();
  gustGain.gain.value = intensity * 0.6;
  gustLfo.connect(gustGain);
  gustGain.connect(output.gain);
  gustLfo.start();

  noise.connect(hp);
  hp.connect(lp);
  lp.connect(output);
  noise.start();

  nodes.push(noise, hp, lp, gustLfo, gustGain);
  return { output, nodes };
}

/** Foliage rustle: mid-range noise with irregular modulation */
function buildFoliage(ctx: AudioContext, volume = 0.08): AmbienceLayer {
  const nodes: (AudioNode | AudioBufferSourceNode | OscillatorNode)[] = [];
  const output = ctx.createGain();
  output.gain.value = volume;

  const noiseBuffer = createNoiseBuffer(ctx, 2);
  const noise = ctx.createBufferSource();
  noise.buffer = noiseBuffer;
  noise.loop = true;

  // Band that sounds like leaves: 1500-4000 Hz
  const bp = ctx.createBiquadFilter();
  bp.type = 'bandpass';
  bp.frequency.value = 2500;
  bp.Q.value = 0.4;

  // Irregular gusting
  const lfo = createOsc(ctx, 0.25);
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = volume * 0.7;
  lfo.connect(lfoGain);
  lfoGain.connect(output.gain);
  lfo.start();

  noise.connect(bp);
  bp.connect(output);
  noise.start();

  nodes.push(noise, bp, lfo, lfoGain);
  return { output, nodes };
}

// ------- RAIN -------

/** Rain: dense high-frequency noise */
function buildRain(ctx: AudioContext, intensity = 0.2): AmbienceLayer {
  const nodes: (AudioNode | AudioBufferSourceNode | OscillatorNode)[] = [];
  const output = ctx.createGain();
  output.gain.value = intensity;

  const noiseBuffer = createNoiseBuffer(ctx, 2);
  const noise = ctx.createBufferSource();
  noise.buffer = noiseBuffer;
  noise.loop = true;

  const hp = ctx.createBiquadFilter();
  hp.type = 'highpass';
  hp.frequency.value = 4000;
  hp.Q.value = 0.2;

  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = 10000;

  noise.connect(hp);
  hp.connect(lp);
  lp.connect(output);
  noise.start();

  nodes.push(noise, hp, lp);
  return { output, nodes };
}

// ------- CROWD / ACTIVITY LAYERS -------

/** Crowd murmur: low-mid bandpass noise with slow undulation */
function buildCrowdMurmur(ctx: AudioContext, volume = 0.12): AmbienceLayer {
  const nodes: (AudioNode | AudioBufferSourceNode | OscillatorNode)[] = [];
  const output = ctx.createGain();
  output.gain.value = volume;

  const noiseBuffer = createNoiseBuffer(ctx, 5);
  const noise = ctx.createBufferSource();
  noise.buffer = noiseBuffer;
  noise.loop = true;

  const bp = ctx.createBiquadFilter();
  bp.type = 'bandpass';
  bp.frequency.value = 320;
  bp.Q.value = 0.9;

  const murmurLfo = createOsc(ctx, 0.18);
  const murmurGain = ctx.createGain();
  murmurGain.gain.value = volume * 0.4;
  murmurLfo.connect(murmurGain);
  murmurGain.connect(output.gain);
  murmurLfo.start();

  noise.connect(bp);
  bp.connect(output);
  noise.start();

  nodes.push(noise, bp, murmurLfo, murmurGain);
  return { output, nodes };
}

/** Rope/wood creaking: very low frequency oscillation */
function buildCreaking(ctx: AudioContext, volume = 0.04): AmbienceLayer {
  const nodes: (AudioNode | AudioBufferSourceNode | OscillatorNode)[] = [];
  const output = ctx.createGain();
  output.gain.value = volume;

  // Two detuned low oscillators that slowly beat against each other
  const osc1 = createOsc(ctx, 180, 'triangle');
  const osc2 = createOsc(ctx, 183, 'triangle', 5);

  const oscGain = ctx.createGain();
  oscGain.gain.value = 0.3;

  // Very slow amplitude modulation: occasional creak
  const lfo = createOsc(ctx, 0.08);
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 0.3;
  lfo.connect(lfoGain);
  lfoGain.connect(oscGain.gain);
  lfo.start();

  osc1.connect(oscGain);
  osc2.connect(oscGain);
  oscGain.connect(output);
  osc1.start();
  osc2.start();

  nodes.push(osc1, osc2, oscGain, lfo, lfoGain);
  return { output, nodes };
}

/** Distant bird-like tones: high sine chirps at irregular intervals */
function buildBirdChirps(ctx: AudioContext, volume = 0.04): AmbienceLayer {
  const nodes: (AudioNode | AudioBufferSourceNode | OscillatorNode)[] = [];
  const output = ctx.createGain();
  output.gain.value = volume;

  // Multiple chirp oscillators at bird-like frequencies
  [3800, 4500, 5200].forEach((freq, i) => {
    const osc = createOsc(ctx, freq, 'sine', i * 12);
    const oscGain = ctx.createGain();
    oscGain.gain.value = 0;

    // Pulse on/off: non-harmonic LFO ratios = irregular chirps
    const lfo = createOsc(ctx, 0.4 + i * 0.17);
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.05;
    lfo.connect(lfoGain);
    lfoGain.connect(oscGain.gain);
    lfo.start();

    osc.connect(oscGain);
    oscGain.connect(output);
    osc.start();
    nodes.push(osc, oscGain, lfo, lfoGain);
  });

  return { output, nodes };
}

/** Insect buzz: high-frequency layered tones */
function buildInsects(ctx: AudioContext, volume = 0.03): AmbienceLayer {
  const nodes: (AudioNode | AudioBufferSourceNode | OscillatorNode)[] = [];
  const output = ctx.createGain();
  output.gain.value = volume;

  // Layered high-frequency tones that slowly modulate
  [5500, 6200, 7000].forEach((freq, i) => {
    const osc = createOsc(ctx, freq, 'sine', i * 5);
    const oscGain = ctx.createGain();
    oscGain.gain.value = 0.15 / (i + 1);

    const lfo = createOsc(ctx, 0.3 + i * 0.15);
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.1 / (i + 1);
    lfo.connect(lfoGain);
    lfoGain.connect(oscGain.gain);
    lfo.start();

    osc.connect(oscGain);
    oscGain.connect(output);
    osc.start();
    nodes.push(osc, oscGain, lfo, lfoGain);
  });

  return { output, nodes };
}

// ------- MILITARY / INSTITUTIONAL -------

/** Military low pulse: slow rhythmic bass like distant drums */
function buildMilitaryPulse(ctx: AudioContext, volume = 0.10): AmbienceLayer {
  const nodes: (AudioNode | AudioBufferSourceNode | OscillatorNode)[] = [];
  const output = ctx.createGain();
  output.gain.value = volume;

  // Deep rhythmic pulse
  const drone = createOsc(ctx, 50, 'sine');
  const droneGain = ctx.createGain();
  droneGain.gain.value = 0.3;

  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = 100;

  drone.connect(lp);
  lp.connect(droneGain);
  droneGain.connect(output);
  drone.start();

  // Rhythmic pulse LFO -- march-like cadence (~72 BPM = 1.2 Hz)
  const pulseLfo = createOsc(ctx, 0.6);
  const pulseLfoGain = ctx.createGain();
  pulseLfoGain.gain.value = 0.25;
  pulseLfo.connect(pulseLfoGain);
  pulseLfoGain.connect(droneGain.gain);
  pulseLfo.start();

  nodes.push(drone, droneGain, lp, pulseLfo, pulseLfoGain);
  return { output, nodes };
}

/** Flag flapping: mid-range noise bursts */
function buildFlagFlap(ctx: AudioContext, volume = 0.04): AmbienceLayer {
  const nodes: (AudioNode | AudioBufferSourceNode | OscillatorNode)[] = [];
  const output = ctx.createGain();
  output.gain.value = volume;

  const noiseBuffer = createNoiseBuffer(ctx, 1);
  const noise = ctx.createBufferSource();
  noise.buffer = noiseBuffer;
  noise.loop = true;

  const bp = ctx.createBiquadFilter();
  bp.type = 'bandpass';
  bp.frequency.value = 1800;
  bp.Q.value = 0.6;

  // Irregular flapping
  const lfo = createOsc(ctx, 2.5);
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = volume;
  lfo.connect(lfoGain);
  lfoGain.connect(output.gain);
  lfo.start();

  // Second slower LFO to break up the regularity
  const lfo2 = createOsc(ctx, 0.3);
  const lfo2Gain = ctx.createGain();
  lfo2Gain.gain.value = volume * 0.5;
  lfo2.connect(lfo2Gain);
  lfo2Gain.connect(output.gain);
  lfo2.start();

  noise.connect(bp);
  bp.connect(output);
  noise.start();

  nodes.push(noise, bp, lfo, lfoGain, lfo2, lfo2Gain);
  return { output, nodes };
}

// ------- CAVE / UNDERGROUND -------

/** Deep ambient hum: very low resonant tone */
function buildCaveHum(ctx: AudioContext, volume = 0.10): AmbienceLayer {
  const nodes: (AudioNode | AudioBufferSourceNode | OscillatorNode)[] = [];
  const output = ctx.createGain();
  output.gain.value = volume;

  const drone = createOsc(ctx, 40, 'sine');
  const droneGain = ctx.createGain();
  droneGain.gain.value = 0.35;

  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = 80;

  drone.connect(lp);
  lp.connect(droneGain);
  droneGain.connect(output);
  drone.start();

  // Very slow breathing modulation
  const lfo = createOsc(ctx, 0.04);
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 0.1;
  lfo.connect(lfoGain);
  lfoGain.connect(output.gain);
  lfo.start();

  nodes.push(drone, droneGain, lp, lfo, lfoGain);
  return { output, nodes };
}

/** Stone echo: filtered reverb-like noise, very quiet */
function buildStoneEcho(ctx: AudioContext, volume = 0.05): AmbienceLayer {
  const nodes: (AudioNode | AudioBufferSourceNode | OscillatorNode)[] = [];
  const output = ctx.createGain();
  output.gain.value = volume;

  const noiseBuffer = createNoiseBuffer(ctx, 4);
  const noise = ctx.createBufferSource();
  noise.buffer = noiseBuffer;
  noise.loop = true;

  // Mid resonance: sounds enclosed
  const bp = ctx.createBiquadFilter();
  bp.type = 'bandpass';
  bp.frequency.value = 600;
  bp.Q.value = 3.0;

  // Very slow modulation: air moving through passages
  const lfo = createOsc(ctx, 0.06);
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = volume * 0.5;
  lfo.connect(lfoGain);
  lfoGain.connect(output.gain);
  lfo.start();

  noise.connect(bp);
  bp.connect(output);
  noise.start();

  nodes.push(noise, bp, lfo, lfoGain);
  return { output, nodes };
}

// ------- EERIE / GHOSTLIGHT -------

/** Eerie low tone: detuned sine drones */
function buildEerieTone(ctx: AudioContext, volume = 0.08): AmbienceLayer {
  const nodes: (AudioNode | AudioBufferSourceNode | OscillatorNode)[] = [];
  const output = ctx.createGain();
  output.gain.value = volume;

  // Two slightly detuned drones for unsettling beating
  const osc1 = createOsc(ctx, 70, 'sine');
  const osc2 = createOsc(ctx, 71.5, 'sine', 3);

  const mix = ctx.createGain();
  mix.gain.value = 0.3;

  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = 150;

  osc1.connect(mix);
  osc2.connect(mix);
  mix.connect(lp);
  lp.connect(output);
  osc1.start();
  osc2.start();

  // Slow swell
  const lfo = createOsc(ctx, 0.03);
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = volume * 0.4;
  lfo.connect(lfoGain);
  lfoGain.connect(output.gain);
  lfo.start();

  nodes.push(osc1, osc2, mix, lp, lfo, lfoGain);
  return { output, nodes };
}

/** Fog muffle: very low-pass filtered noise */
function buildFogMuffle(ctx: AudioContext, volume = 0.06): AmbienceLayer {
  const nodes: (AudioNode | AudioBufferSourceNode | OscillatorNode)[] = [];
  const output = ctx.createGain();
  output.gain.value = volume;

  const noiseBuffer = createNoiseBuffer(ctx, 5);
  const noise = ctx.createBufferSource();
  noise.buffer = noiseBuffer;
  noise.loop = true;

  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = 300;
  lp.Q.value = 0.5;

  noise.connect(lp);
  lp.connect(output);
  noise.start();

  nodes.push(noise, lp);
  return { output, nodes };
}

/** Distant chimes: high sine tones that ping at irregular intervals */
function buildDistantChimes(ctx: AudioContext, volume = 0.03): AmbienceLayer {
  const nodes: (AudioNode | AudioBufferSourceNode | OscillatorNode)[] = [];
  const output = ctx.createGain();
  output.gain.value = volume;

  // Bell-like tones at non-harmonic intervals
  [1320, 1760, 2090, 2640].forEach((freq, i) => {
    const osc = createOsc(ctx, freq, 'sine');
    const oscGain = ctx.createGain();
    oscGain.gain.value = 0;

    // Very slow, irregular pinging
    const lfo = createOsc(ctx, 0.05 + i * 0.03);
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.025 / (i + 1);
    lfo.connect(lfoGain);
    lfoGain.connect(oscGain.gain);
    lfo.start();

    osc.connect(oscGain);
    oscGain.connect(output);
    osc.start();
    nodes.push(osc, oscGain, lfo, lfoGain);
  });

  return { output, nodes };
}

// ------- MIRRORWATER: crystalline stillness -------

/** Crystal tones: pure harmonics, very quiet and shimmering */
function buildCrystalTones(ctx: AudioContext, volume = 0.04): AmbienceLayer {
  const nodes: (AudioNode | AudioBufferSourceNode | OscillatorNode)[] = [];
  const output = ctx.createGain();
  output.gain.value = volume;

  // Perfect fifth harmony: A4, E5, A5
  [440, 660, 880].forEach((freq, i) => {
    const osc = createOsc(ctx, freq, 'sine', i * 2);
    const oscGain = ctx.createGain();
    oscGain.gain.value = 0.03 / (i + 1);

    const lfo = createOsc(ctx, 0.04 + i * 0.02);
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.015 / (i + 1);
    lfo.connect(lfoGain);
    lfoGain.connect(oscGain.gain);
    lfo.start();

    osc.connect(oscGain);
    oscGain.connect(output);
    osc.start();
    nodes.push(osc, oscGain, lfo, lfoGain);
  });

  return { output, nodes };
}

/** Glass-still water: very gentle, barely audible lapping */
function buildStillWater(ctx: AudioContext): AmbienceLayer {
  const nodes: (AudioNode | AudioBufferSourceNode | OscillatorNode)[] = [];
  const output = ctx.createGain();
  output.gain.value = 0.05;

  const noiseBuffer = createNoiseBuffer(ctx, 6);
  const noise = ctx.createBufferSource();
  noise.buffer = noiseBuffer;
  noise.loop = true;

  const bp = ctx.createBiquadFilter();
  bp.type = 'bandpass';
  bp.frequency.value = 200;
  bp.Q.value = 1.5;

  // Extremely slow modulation: barely perceptible ripples
  const lfo = createOsc(ctx, 0.03);
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 0.03;
  lfo.connect(lfoGain);
  lfoGain.connect(output.gain);
  lfo.start();

  noise.connect(bp);
  bp.connect(output);
  noise.start();

  nodes.push(noise, bp, lfo, lfoGain);
  return { output, nodes };
}

// ------- COMBAT -------

/** Low tension drone for combat */
function buildCombatDrone(ctx: AudioContext, isBoss = false): AmbienceLayer {
  const nodes: (AudioNode | AudioBufferSourceNode | OscillatorNode)[] = [];
  const output = ctx.createGain();
  output.gain.value = 0.12;

  const baseFreq = isBoss ? 45 : 55;

  const drone = createOsc(ctx, baseFreq, 'sawtooth');
  const droneGain = ctx.createGain();
  droneGain.gain.value = 0.3;

  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = isBoss ? 120 : 150;

  drone.connect(lp);
  lp.connect(droneGain);
  droneGain.connect(output);
  drone.start();

  const pulse = createOsc(ctx, baseFreq / 2, 'sine');
  const pulseGain = ctx.createGain();
  pulseGain.gain.value = 0.15;

  const pulseLfo = createOsc(ctx, isBoss ? 1.2 : 0.8);
  const pulseLfoGain = ctx.createGain();
  pulseLfoGain.gain.value = 0.15;
  pulseLfo.connect(pulseLfoGain);
  pulseLfoGain.connect(pulseGain.gain);
  pulseLfo.start();

  pulse.connect(pulseGain);
  pulseGain.connect(output);
  pulse.start();

  const shimmer = createOsc(ctx, isBoss ? 1200 : 800, 'sine');
  const shimmerGain = ctx.createGain();
  shimmerGain.gain.value = 0.02;

  const shimmerLfo = createOsc(ctx, 0.3);
  const shimmerLfoGain = ctx.createGain();
  shimmerLfoGain.gain.value = 0.02;
  shimmerLfo.connect(shimmerLfoGain);
  shimmerLfoGain.connect(shimmerGain.gain);
  shimmerLfo.start();

  shimmer.connect(shimmerGain);
  shimmerGain.connect(output);
  shimmer.start();

  nodes.push(drone, droneGain, lp, pulse, pulseGain, pulseLfo, pulseLfoGain, shimmer, shimmerGain, shimmerLfo, shimmerLfoGain);

  if (isBoss) {
    const dissonance = createOsc(ctx, 62, 'sawtooth', 15);
    const disGain = ctx.createGain();
    disGain.gain.value = 0.08;
    const disLp = ctx.createBiquadFilter();
    disLp.type = 'lowpass';
    disLp.frequency.value = 100;
    dissonance.connect(disLp);
    disLp.connect(disGain);
    disGain.connect(output);
    dissonance.start();
    nodes.push(dissonance, disGain, disLp);
  }

  return { output, nodes };
}

// ------- STORY MOODS -------

/** Warm pad: gentle harmonic drones for calm scenes */
function buildWarmPad(ctx: AudioContext, volume = 0.06): AmbienceLayer {
  const nodes: (AudioNode | AudioBufferSourceNode | OscillatorNode)[] = [];
  const output = ctx.createGain();
  output.gain.value = volume;

  // Warm intervals: C3, E3, G3, C4
  [130.8, 164.8, 196, 261.6].forEach((freq, i) => {
    const osc = createOsc(ctx, freq, 'sine', (i - 1.5) * 2);
    const gain = ctx.createGain();
    gain.gain.value = 0.04 / (i + 1);

    const lfo = createOsc(ctx, 0.04 + i * 0.02);
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.02 / (i + 1);
    lfo.connect(lfoGain);
    lfoGain.connect(gain.gain);
    lfo.start();

    osc.connect(gain);
    gain.connect(output);
    osc.start();
    nodes.push(osc, gain, lfo, lfoGain);
  });

  return { output, nodes };
}

/** Tension undercurrent: low dissonant hum for uneasy scenes */
function buildTensionHum(ctx: AudioContext, volume = 0.07): AmbienceLayer {
  const nodes: (AudioNode | AudioBufferSourceNode | OscillatorNode)[] = [];
  const output = ctx.createGain();
  output.gain.value = volume;

  // Tritone interval: unsettling
  const osc1 = createOsc(ctx, 82, 'sawtooth');
  const osc2 = createOsc(ctx, 116, 'sawtooth', 8);

  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = 180;

  const mix = ctx.createGain();
  mix.gain.value = 0.2;

  osc1.connect(mix);
  osc2.connect(mix);
  mix.connect(lp);
  lp.connect(output);
  osc1.start();
  osc2.start();

  const lfo = createOsc(ctx, 0.05);
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = volume * 0.3;
  lfo.connect(lfoGain);
  lfoGain.connect(output.gain);
  lfo.start();

  nodes.push(osc1, osc2, mix, lp, lfo, lfoGain);
  return { output, nodes };
}

// ------- TITLE -------

/** Ethereal pad for title screen */
function buildTitlePad(ctx: AudioContext): AmbienceLayer {
  const nodes: (AudioNode | AudioBufferSourceNode | OscillatorNode)[] = [];
  const output = ctx.createGain();
  output.gain.value = 0.1;

  const freqs = [110, 165, 220, 330];
  freqs.forEach((freq, i) => {
    const osc = createOsc(ctx, freq, 'sine', (i - 1.5) * 3);
    const gain = ctx.createGain();
    gain.gain.value = 0.06 / (i + 1);

    const lfo = createOsc(ctx, 0.05 + i * 0.03);
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.03 / (i + 1);
    lfo.connect(lfoGain);
    lfoGain.connect(gain.gain);
    lfo.start();

    osc.connect(gain);
    gain.connect(output);
    osc.start();
    nodes.push(osc, gain, lfo, lfoGain);
  });

  const oceanLayer = buildOceanWaves(ctx, 0.1);
  const oceanMix = ctx.createGain();
  oceanMix.gain.value = 0.4;
  oceanLayer.output.connect(oceanMix);
  oceanMix.connect(output);
  nodes.push(...oceanLayer.nodes, oceanLayer.output, oceanMix);

  return { output, nodes };
}

// =============================================
// AMBIENCE COMPOSITES -- combine layers into soundscapes
// =============================================

function buildSoundscape(ctx: AudioContext, type: AmbienceType): AmbienceLayer[] {
  switch (type) {
    // --- Location-based ---
    case 'port_tavern':
      return [buildDockWater(ctx), buildCrowdMurmur(ctx, 0.10), buildCreaking(ctx, 0.035), buildBirdChirps(ctx, 0.02)];
    case 'island_settled':
      return [buildWind(ctx, 0.06), buildBirdChirps(ctx, 0.03), buildFoliage(ctx, 0.05), buildCrowdMurmur(ctx, 0.04)];
    case 'island_wild':
      return [buildWind(ctx, 0.10), buildFoliage(ctx, 0.08), buildInsects(ctx, 0.03), buildCreaking(ctx, 0.03)];
    case 'underground':
      return [buildCaveHum(ctx), buildStoneEcho(ctx), buildDrips(ctx)];
    case 'wardensea_military':
      return [buildMilitaryPulse(ctx), buildWind(ctx, 0.05), buildFlagFlap(ctx), buildCreaking(ctx, 0.02)];
    case 'ghostlight':
      return [buildEerieTone(ctx), buildFogMuffle(ctx), buildDistantChimes(ctx), buildDockWater(ctx)];
    case 'mirrorwater':
      return [buildStillWater(ctx), buildCrystalTones(ctx), buildWind(ctx, 0.03)];
    // --- Gameplay-state ---
    case 'open_sea':
      return [buildOceanWaves(ctx, 0.18), buildWind(ctx, 0.08)];
    case 'voyage':
      return [buildOceanWaves(ctx, 0.20), buildWind(ctx, 0.10), buildCreaking(ctx, 0.04)];
    case 'combat':
      return [buildCombatDrone(ctx, false)];
    case 'combat_boss':
      return [buildCombatDrone(ctx, true)];
    case 'storm':
      return [buildOceanWaves(ctx, 0.20), buildWind(ctx, 0.25), buildRain(ctx, 0.20)];
    // --- Story moods ---
    case 'story_tension':
      return [buildTensionHum(ctx), buildWind(ctx, 0.04)];
    case 'story_calm':
      return [buildWarmPad(ctx), buildWind(ctx, 0.03)];
    // --- System ---
    case 'title':
      return [buildTitlePad(ctx)];
    case 'silence':
    default:
      return [];
  }
}

// =============================================
// AMBIENCE MANAGER
// =============================================

class AmbienceManager {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private currentType: AmbienceType = 'silence';
  private activeLayers: AmbienceLayer[] = [];
  private _volume: number = 0.12;
  private _masterVolume: number = 0.7;
  private _muted: boolean = false;
  private fadeInterval: ReturnType<typeof setInterval> | null = null;
  private _fadingOutLayers: AmbienceLayer[] | null = null;

  /** Effective volume = channel * master */
  private get effectiveVol(): number {
    return this._volume * this._masterVolume;
  }

  /** Lazy-init the AudioContext (must happen after user gesture) */
  private ensureContext(): AudioContext {
    if (!this.ctx || this.ctx.state === 'closed') {
      this.ctx = new AudioContext();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = this._muted ? 0 : this.effectiveVol;
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  /** Stop all currently playing layers */
  private stopLayers(): void {
    for (const layer of this.activeLayers) {
      try {
        layer.output.disconnect();
        for (const node of layer.nodes) {
          if ('stop' in node && typeof node.stop === 'function') {
            try { (node as OscillatorNode | AudioBufferSourceNode).stop(); } catch { /* already stopped */ }
          }
          try { node.disconnect(); } catch { /* already disconnected */ }
        }
      } catch { /* cleanup failure is non-critical */ }
    }
    this.activeLayers = [];
  }

  /** Switch to a new ambience type with crossfade */
  play(type: AmbienceType): void {
    if (type === this.currentType) return;

    const ctx = this.ensureContext();

    // Clear any in-progress fade
    if (this.fadeInterval) {
      clearInterval(this.fadeInterval);
      this.fadeInterval = null;
      if (this._fadingOutLayers) {
        for (const layer of this._fadingOutLayers) {
          try {
            layer.output.disconnect();
            for (const node of layer.nodes) {
              if ('stop' in node && typeof node.stop === 'function') {
                try { (node as OscillatorNode | AudioBufferSourceNode).stop(); } catch {}
              }
              try { node.disconnect(); } catch {}
            }
          } catch {}
        }
        this._fadingOutLayers = null;
      }
    }

    // Fade out old layers over 1.5 seconds
    const oldLayers = [...this.activeLayers];
    this._fadingOutLayers = oldLayers;
    const oldGains = oldLayers.map((l) => l.output);

    if (oldGains.length > 0) {
      const fadeSteps = 30;
      let step = 0;
      const startGains = oldGains.map((g) => g.gain.value);

      this.fadeInterval = setInterval(() => {
        step++;
        const progress = step / fadeSteps;
        oldGains.forEach((g, i) => {
          try { g.gain.value = startGains[i] * (1 - progress); } catch { /* node gone */ }
        });
        if (step >= fadeSteps) {
          if (this.fadeInterval) clearInterval(this.fadeInterval);
          this.fadeInterval = null;
          this._fadingOutLayers = null;
          for (const layer of oldLayers) {
            try {
              layer.output.disconnect();
              for (const node of layer.nodes) {
                if ('stop' in node && typeof node.stop === 'function') {
                  try { (node as OscillatorNode | AudioBufferSourceNode).stop(); } catch {}
                }
                try { node.disconnect(); } catch {}
              }
            } catch {}
          }
        }
      }, 50);
    }

    // Build and connect new layers
    this.currentType = type;
    if (type === 'silence') {
      this.activeLayers = [];
      return;
    }

    const newLayers = buildSoundscape(ctx, type);
    this.activeLayers = newLayers;

    for (const layer of newLayers) {
      const targetGain = layer.output.gain.value;
      layer.output.gain.value = 0;
      layer.output.connect(this.masterGain!);

      const fadeSteps = 40;
      let step = 0;
      const fadeIn = setInterval(() => {
        step++;
        const progress = step / fadeSteps;
        try { layer.output.gain.value = targetGain * progress; } catch { /* node gone */ }
        if (step >= fadeSteps) clearInterval(fadeIn);
      }, 50);
    }
  }

  /** Force-resume the AudioContext after a user gesture */
  forceResume(): void {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  /** Re-trigger current ambience */
  retrigger(): void {
    if (this.currentType !== 'silence') {
      const type = this.currentType;
      this.currentType = 'silence' as AmbienceType;
      this.play(type);
    }
  }

  /** Stop all ambience */
  stop(): void {
    this.stopLayers();
    this.currentType = 'silence';
  }

  /** Set channel volume (0-1) */
  set volume(vol: number) {
    this._volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && !this._muted) {
      this.masterGain.gain.value = this.effectiveVol;
    }
  }

  get volume(): number {
    return this._volume;
  }

  /** Set master volume (0-1) */
  set masterVolume(vol: number) {
    this._masterVolume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && !this._muted) {
      this.masterGain.gain.value = this.effectiveVol;
    }
  }

  get masterVolume(): number {
    return this._masterVolume;
  }

  /** Set muted state */
  set muted(m: boolean) {
    this._muted = m;
    if (this.masterGain) {
      this.masterGain.gain.value = m ? 0 : this.effectiveVol;
    }
  }

  get muted(): boolean {
    return this._muted;
  }

  /** Get current ambience type */
  get current(): AmbienceType {
    return this.currentType;
  }

  /** Full cleanup */
  cleanup(): void {
    this.stopLayers();
    if (this.fadeInterval) {
      clearInterval(this.fadeInterval);
      this.fadeInterval = null;
    }
    if (this.ctx && this.ctx.state !== 'closed') {
      this.ctx.close().catch(() => {});
    }
    this.ctx = null;
    this.masterGain = null;
    this.currentType = 'silence';
  }
}

// Singleton
export const ambienceManager = new AmbienceManager();

// =============================================
// CONTEXT RESOLVER -- map game state to ambience
// =============================================

/** Determine the right ambience for the current game context.
 *  Priority: Title > Combat > Travel > Story scene > Island location > Panel default */
export function getAmbienceForContext(context: {
  activePanel: string;
  combatState: unknown | null;
  travelState: unknown | null;
  currentScene: { id: string } | null;
  gameStarted: boolean;
  isBossFight?: boolean;
  currentIsland?: string;
}): AmbienceType {
  // Title screen
  if (!context.gameStarted) return 'title';

  // Combat takes priority
  if (context.combatState) {
    return context.isBossFight ? 'combat_boss' : 'combat';
  }

  // Sea travel
  if (context.travelState) return 'voyage';

  // Story panel: scene-aware ambience
  if (context.activePanel === 'story' && context.currentScene) {
    const sceneId = context.currentScene.id;
    // Storm / battle scenes
    if (sceneId.includes('storm') || sceneId.includes('battle') || sceneId.includes('raid') || sceneId.includes('blockade')) {
      return 'storm';
    }
    // Underground / cave scenes
    if (sceneId.includes('cave') || sceneId.includes('underground') || sceneId.includes('tunnel')) {
      return 'underground';
    }
    // Confrontation / tense scenes
    if (sceneId.includes('confrontation') || sceneId.includes('ultimatum') || sceneId.includes('prime_khoss') || sceneId.includes('ironclad')) {
      return 'story_tension';
    }
    // Romance / calm / personal scenes
    if (sceneId.includes('romance') || sceneId.includes('cabin') || sceneId.includes('personal') || sceneId.includes('epilogue')) {
      return 'story_calm';
    }
    // Tavern / dock / Tavven-specific story scenes
    if (sceneId.includes('tavern') || sceneId.includes('dock') || sceneId.includes('tavven')) {
      return 'port_tavern';
    }
    // Default for story: use island-based ambience if available
    if (context.currentIsland && ISLAND_AMBIENCE[context.currentIsland]) {
      return ISLAND_AMBIENCE[context.currentIsland];
    }
    return 'open_sea';
  }

  // Map panel: open sea
  if (context.activePanel === 'map') {
    return 'open_sea';
  }

  // Management panel: use island-based ambience
  if (context.activePanel === 'management') {
    if (context.currentIsland && ISLAND_AMBIENCE[context.currentIsland]) {
      return ISLAND_AMBIENCE[context.currentIsland];
    }
    return 'port_tavern';
  }

  // Default: island-based or open sea
  if (context.currentIsland && ISLAND_AMBIENCE[context.currentIsland]) {
    return ISLAND_AMBIENCE[context.currentIsland];
  }
  return 'open_sea';
}
