<script>
  export let size = 48;
</script>

<svg class="pl" viewBox="0 0 48 48" width={size} height={size} role="img" aria-label="A dot attempts to catch up to one on the right by moving like a Slinky, but it keeps inching away">
  <defs>
    <linearGradient id="pl-grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#000" />
      <stop offset="100%" stop-color="#fff" />
    </linearGradient>
    <mask id="pl-mask">
      <rect x="-1" y="-1" width="50" height="18" fill="url(#pl-grad)" />
    </mask>
  </defs>
  <g fill="none" stroke="currentcolor" stroke-linecap="round" stroke-width="2" transform="translate(0,19)">
    <g class="pl__layer">
      <g class="pl__scene">
        <path class="pl__curve" d="M 16 9 C 16 4.582 19.582 1 24 1 C 28.418 1 32 4.582 32 9" stroke-dasharray="25.13 25.13" stroke-dashoffset="25.12" />
        <polyline class="pl__dot" points="32 9,48 9" stroke-dasharray="0.01 16" />
      </g>
    </g>
    <g class="pl__layer" mask="url(#pl-mask)">
      <g class="pl__scene">
        <path class="pl__curve" d="M 16 9 C 16 4.582 19.582 1 24 1 C 28.418 1 32 4.582 32 9" stroke-dasharray="25.13 25.13" stroke-dashoffset="25.12" />
        <polyline class="pl__dot" points="32 9,48 9" stroke-dasharray="0.01 16" />
      </g>
    </g>
  </g>
</svg>

<style>
.pl {
  display: block;
  margin: auto;
  width: 16em;
  height: auto;
}

.pl__curve,
.pl__dot,
.pl__scene {
  animation-duration: 1s;
  animation-timing-function: cubic-bezier(0.65, 0, 0.35, 1);
  animation-iteration-count: infinite;
}

.pl__curve {
  animation-name: curve-offset;
  stroke: var(--accent);
}

.pl__layer + .pl__layer .pl__curve {
  stroke: hsl(163, 90%, 50%);
}

.pl__dot {
  animation-name: dot-move;
  stroke: var(--secondary-accent);
}

.pl__layer + .pl__layer .pl__dot {
  stroke: var(--secondary-accent);
}

.pl__scene {
  animation-name: scene-move;
  animation-timing-function: linear;
}

@keyframes curve-offset {
  from {
    stroke-dashoffset: 25.12;
  }
  46% {
    stroke-dashoffset: 0;
  }
  92%, to {
    stroke-dashoffset: -24.97;
  }
}

@keyframes dot-move {
  from, 25% {
    stroke-dashoffset: 0;
  }
  50%, to {
    stroke-dashoffset: -15.99;
  }
}

@keyframes scene-move {
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(-16px, 0);
  }
}
</style>
