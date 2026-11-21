import { Canvas, Circle, Ellipse, Layer, Line, Path, Rect, Svg } from "@hyper-elements/react";
import { art, colors, sea } from "@/shared/theme/tokens";
import { theme } from "@/shared/theme/theme";
import { MonoLabel } from "@/shared/ui/mono-label";
import { Positioned } from "@/shared/ui/positioned";

/**
 * The email's pictures. An Email can't hold Svg, so each is a PNG made from a
 * Canvas (served by /api/email-art). Drawn at 2x so the email can show them at
 * half size and stay sharp on phones.
 */
export const EMAIL_ART = {
  hero: { width: 600, height: 330, background: colors.sky },
  logo: { width: 36, height: 36, background: colors.sky },
  anglerfish: { width: 140, height: 86, background: colors.deepCard },
  dumbo: { width: 94, height: 86, background: colors.deepCard },
  snailfish: { width: 140, height: 84, background: colors.deepCard },
} as const;

export type EmailArtId = keyof typeof EMAIL_ART;
const SCALE = 2;
const open = { fill: "transparent" } as const;
const line = (stroke: string, strokeWidth: number) => ({ stroke, strokeWidth }) as const;

const BANDS = [
  [70, 40, sea.shallow],
  [110, 40, sea.blue],
  [150, 40, sea.twilightDeep],
  [190, 40, sea.midnight],
  [230, 40, sea.abyssal1],
  [270, 60, sea.hadal],
] as const;
const DASHES = Array.from({ length: 21 }, (_, i) => 84 + i * 10);
const WAVE = `M0 70 q15 -10 30 0${" t30 0".repeat(19)}`;

function Hero() {
  const label = (top: number, color: string, text: string) => (
    <Positioned top={(top - 10) * SCALE} left={262 * SCALE}>
      <MonoLabel color={color} size={12 * SCALE}>
        {text}
      </MonoLabel>
    </Positioned>
  );
  return (
    <Layer>
      <Svg
        width={600 * SCALE}
        height={330 * SCALE}
        viewBox="0 0 600 330"
        title="A boat with a line dropping through the ocean zones to the bottom"
      >
        {BANDS.map(([y, h, fill]) => (
          <Rect key={y} x={0} y={y} width={600} height={h} style={{ fill }} />
        ))}
        <Path d={WAVE} style={{ ...open, ...line(sea.midnight, 2) }} />
        <Path
          d="M196 64 L284 63 Q278 78 270 82 Q240 85 208 82 Q200 74 196 64 Z"
          style={{ fill: colors.hull, ...line(sea.midnight, 2.5) }}
        />
        <Path d="M220 64 L221 46 L256 46 L255 64 Z" style={{ fill: sea.twilight, ...line(sea.midnight, 2.5) }} />
        <Line x1={238} y1={46} x2={238} y2={26} style={line(sea.midnight, 2.5)} />
        <Path d="M239 27 L258 32 L239 37 Z" style={{ fill: sea.twilight, ...line(sea.midnight, 2) }} />
        {/* Line has no dash style: the plumb line is short strokes (aqua below 110 m, navy over the light water) */}
        {DASHES.map((y) => (
          <Line key={y} x1={240} y1={y} x2={240} y2={y + 5} style={line(y < 110 ? sea.midnight : colors.aqua, 2)} />
        ))}
        <Circle cx={240} cy={300} r={20} style={{ fill: colors.glow, opacity: 0.12 }} />
        <Circle cx={240} cy={300} r={12} style={{ fill: colors.glow, opacity: 0.28 }} />
        <Circle cx={240} cy={300} r={5} style={{ fill: colors.glow }} />
      </Svg>
      {label(96, sea.midnight, "0 m")}
      {label(174, colors.aqua, "200 m · twilight")}
      {label(214, colors.aqua, "1,000 m · midnight")}
      {label(304, colors.glow, "10,935 m · you, earlier")}
    </Layer>
  );
}

function Logo() {
  return (
    <Svg width={36 * SCALE} height={36 * SCALE} viewBox="0 0 36 36" title="">
      <Circle cx={18} cy={18} r={15} style={{ fill: sea.shallow, ...line(sea.midnight, 2.5) }} />
      <Path d="M5 15 q4 -3 8 0 t8 0 t8 0 t6 0" style={{ ...open, ...line(sea.midnight, 2) }} />
      <Line x1={18} y1={15} x2={18} y2={29} style={line(sea.midnight, 2)} />
      <Circle cx={18} cy={29} r={2.5} style={{ fill: sea.midnight }} />
    </Svg>
  );
}

function Anglerfish() {
  const edge = line(colors.aqua, 5);
  return (
    <Svg width={140 * SCALE} height={86 * SCALE} viewBox="0 0 290 180" title="Anglerfish">
      <Circle cx={50} cy={38} r={36} style={{ fill: colors.glow, opacity: 0.08 }} />
      <Circle cx={50} cy={38} r={22} style={{ fill: colors.glow, opacity: 0.18 }} />
      <Path d="M150 40 C 132 4, 72 2, 52 32" style={{ ...open, ...edge }} />
      <Circle cx={50} cy={38} r={9} style={{ fill: colors.glow }} />
      <Path d="M240 110 L272 86 L280 142 L240 124 Z" style={{ fill: art.anglerBody, ...edge }} />
      <Path
        d="M80 92 C 80 42, 150 22, 200 40 C 240 56, 252 92, 240 116 C 222 152, 150 162, 110 142 C 90 132, 80 114, 80 92 Z"
        style={{ fill: art.anglerBody, ...edge }}
      />
      <Path d="M88 94 l5 13 l6 -11 l5 13 l6 -11 l5 13" style={{ ...open, ...line(colors.hull, 4) }} />
      <Circle cx={152} cy={70} r={9} style={{ fill: colors.aqua }} />
    </Svg>
  );
}

function Dumbo() {
  const edge = line(colors.aqua, 3);
  return (
    <Svg width={94 * SCALE} height={86 * SCALE} viewBox="0 0 122 112" title="Dumbo octopus">
      <Ellipse cx={24} cy={30} rx={15} ry={9} style={{ fill: art.dumboFin, ...edge }} />
      <Ellipse cx={98} cy={30} rx={15} ry={9} style={{ fill: art.dumboFin, ...edge }} />
      <Path
        d="M28 54 Q10 80 18 100 Q34 88 42 104 Q54 90 61 106 Q68 90 80 104 Q88 88 104 100 Q112 80 94 54 Z"
        style={{ fill: art.dumboBelly, ...edge }}
      />
      <Path d="M27 58 C 24 20, 98 20, 95 58 Z" style={{ fill: art.dumboFin, ...edge }} />
      <Circle cx={49} cy={46} r={5} style={{ fill: sea.midnight }} />
      <Circle cx={73} cy={46} r={5} style={{ fill: sea.midnight }} />
    </Svg>
  );
}

function Snailfish() {
  return (
    <Svg width={140 * SCALE} height={84 * SCALE} viewBox="0 -14 140 84" title="Snailfish">
      <Path
        d="M10 28 C 10 12, 30 6, 46 10 C 80 16, 110 22, 136 28 C 110 34, 80 40, 46 44 C 28 46, 10 42, 10 28 Z"
        style={{ fill: art.snailfishBody, ...line(colors.aqua, 3) }}
      />
      <Path d="M44 36 C 40 50, 26 54, 18 48 C 28 46, 34 40, 36 34 Z" style={{ fill: art.snailfishFin, ...line(colors.aqua, 2.5) }} />
      <Circle cx={24} cy={22} r={3.5} style={{ fill: sea.midnight }} />
    </Svg>
  );
}

const PIECES = { hero: Hero, logo: Logo, anglerfish: Anglerfish, dumbo: Dumbo, snailfish: Snailfish };

/** One picture of the welcome email, as a Canvas (PNG at 2x). */
export function EmailArt({ id }: { id: EmailArtId }) {
  const { width, height, background } = EMAIL_ART[id];
  const Piece = PIECES[id];
  return (
    <Canvas theme={theme} width={width * SCALE} height={height * SCALE} style={{ backgroundColor: background }}>
      <Piece />
    </Canvas>
  );
}
