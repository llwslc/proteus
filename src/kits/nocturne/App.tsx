import { useEffect, useId, useState } from "react";
import { Toggle as BaseToggle } from "@base-ui/react/toggle";
import { ToggleGroup as BaseToggleGroup } from "@base-ui/react/toggle-group";
import "./App.css";
import Loader from "./Loader";
import {
  Accordion,
  AlertDialog,
  AlertDialogClose,
  Autocomplete,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Checkbox,
  CheckboxGroup,
  Collapsible,
  Combobox,
  ContextMenu,
  Dialog,
  DialogClose,
  Drawer,
  DrawerClose,
  Field,
  Fieldset,
  Form,
  Input,
  Menu,
  MenuItem,
  MenuSeparator,
  MenuSub,
  Menubar,
  MenubarMenu,
  Meter,
  NavigationMenu,
  NumberField,
  OtpField,
  Panel,
  Popover,
  PreviewCard,
  Progress,
  Radio,
  RadioGroup,
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
  Select,
  Separator,
  Slider,
  Switch,
  Tabs,
  ToastProvider,
  Toggle,
  ToggleGroup,
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarLink,
  ToolbarSeparator,
  Tooltip,
  useToast,
} from "./components";
import {
  BellIcon,
  BookIcon,
  ClockIcon,
  DropIcon,
  KeyIcon,
  LampIcon,
  LeafIcon,
  MoonIcon,
  QuillIcon,
  SealIcon,
  SearchIcon,
  VialIcon,
  XIcon,
} from "./components/icons";
import { Bloom, Bud, Leaf, MotifDefs, Tendril } from "./components/bloom";

const NAV = [
  {
    label: "The Garden",
    links: [
      {
        label: "Garden orders",
        href: "#inputs",
        description: "Buttons, switches, blooms",
      },
      {
        label: "Gauges & stills",
        href: "#feedback",
        description: "Needles and moonlight",
      },
      { label: "Summons", href: "#overlays", description: "Layers that answer softly" },
      {
        label: "Plates & seals",
        href: "#display",
        description: "Everything taken to brass",
      },
    ],
  },
  {
    label: "The Register",
    links: [
      { label: "All blooms", href: "#inputs", description: "37 plates in the album" },
      { label: "First hairlines", href: "#foundations", description: "Type and rules" },
      { label: "Night entries", href: "#forms", description: "Signed before dawn" },
      { label: "Frames", href: "#foundations", description: "Velvet under brass" },
    ],
  },
  { label: "Almanac", href: "#hero" },
  {
    label: "Poison Cabinet",
    disabled: true,
    links: [
      { label: "Sealed shelf", href: "#display", description: "Warden's key only" },
    ],
  },
];

const FLORA = [
  { label: "Belladonna", value: "belladonna" },
  { label: "Night Jasmine", value: "jasmine" },
  { label: "Evening Primrose", value: "primrose" },
  { label: "Moonflower", value: "moonflower" },
  { label: "Queen of the Night", value: "queen" },
  { label: "Angel's Trumpet", value: "trumpet" },
  { label: "Night Phlox", value: "phlox" },
  { label: "Four-o'clock", value: "fouroclock" },
  { label: "Datura", value: "datura" },
  { label: "Mandrake", value: "mandrake" },
  { label: "Wolfsbane", value: "wolfsbane" },
  { label: "Foxglove", value: "foxglove", disabled: true },
];
const FLORA_SHORT = FLORA.slice(0, 3);

const FLORA_NAMES = [
  "Belladonna",
  "Night Jasmine",
  "Evening Primrose",
  "Moonflower",
  "Queen of the Night",
  "Angel's Trumpet",
  "Night Phlox",
  "Four-o'clock",
  "Datura",
  "Mandrake",
  "Wolfsbane",
  { label: "Foxglove", disabled: true },
];

const ROUNDS = [
  "Trim the lamps",
  "Gather dew",
  "Seal a vial",
  "Walk the south wall",
  "Wind the watch-bell",
  "Note the scent",
  "Water the arbor",
  "Sweep fallen petals",
  "Chart the moon",
  "Feed the moths",
  "Check the gate",
  { label: "Wake the foxglove", disabled: true },
];

function HourClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return <span className="nocturne-clock">{now.toLocaleTimeString("en-GB")}</span>;
}

function VineSide() {
  const id = useId();
  const d = (v: string) => ({ "--nocturne-d": v }) as React.CSSProperties;
  return (
    <svg viewBox="0 0 170 560" fill="none" aria-hidden="true" focusable="false">
      <MotifDefs id={id} />
      <path
        className="nocturne-grow"
        style={{ ...d("0.2s"), "--nocturne-grow-dur": "1.8s" } as React.CSSProperties}
        pathLength={1}
        d="M96 560 C 58 512, 42 482, 58 446 C 74 410, 112 394, 106 354 C 100 314, 54 302, 46 262 C 38 222, 84 202, 92 166 C 99 136, 76 114, 58 94 C 44 78, 40 58, 50 34"
        stroke="var(--nocturne-gilt)"
        strokeWidth="2"
        opacity=".85"
        strokeLinecap="round"
      />
      <path
        className="nocturne-grow"
        style={{ ...d("0.59s"), "--nocturne-grow-dur": "0.95s" } as React.CSSProperties}
        pathLength={1}
        d="M58 446 C 82 454, 110 457, 134 447"
        stroke="var(--nocturne-gilt)"
        strokeWidth="1.4"
        opacity=".7"
        strokeLinecap="round"
      />
      <path
        className="nocturne-grow"
        style={{ ...d("0.91s"), "--nocturne-grow-dur": "0.95s" } as React.CSSProperties}
        pathLength={1}
        d="M106 354 C 122 346, 136 336, 143 326"
        stroke="var(--nocturne-gilt)"
        strokeWidth="1.3"
        opacity=".62"
        strokeLinecap="round"
      />
      <path
        className="nocturne-grow"
        style={{ ...d("1.22s"), "--nocturne-grow-dur": "0.95s" } as React.CSSProperties}
        pathLength={1}
        d="M46 262 C 41 254, 35 245, 31 236"
        stroke="var(--nocturne-gilt)"
        strokeWidth="1.4"
        opacity=".7"
        strokeLinecap="round"
      />
      <path
        className="nocturne-grow"
        style={{ ...d("1.55s"), "--nocturne-grow-dur": "0.95s" } as React.CSSProperties}
        pathLength={1}
        d="M92 166 C 110 158, 126 151, 138 142"
        stroke="var(--nocturne-gilt)"
        strokeWidth="1.4"
        opacity=".7"
        strokeLinecap="round"
      />
      <path
        className="nocturne-grow"
        style={{ ...d("1.79s"), "--nocturne-grow-dur": "0.95s" } as React.CSSProperties}
        pathLength={1}
        d="M58 94 C 47 88, 36 79, 27 70"
        stroke="var(--nocturne-gilt)"
        strokeWidth="1.3"
        opacity=".62"
        strokeLinecap="round"
      />
      <Leaf
        defs={id}
        className="nocturne-sprout"
        style={d("0.51s")}
        transform="translate(52,469) rotate(-138)"
      />
      <Leaf
        defs={id}
        className="nocturne-sprout"
        style={d("0.73s")}
        transform="translate(84,409) rotate(24) scale(.9)"
      />
      <Tendril
        className="nocturne-sprout"
        style={d("0.88s")}
        transform="translate(104,377) rotate(30)"
      />
      <Leaf
        defs={id}
        className="nocturne-sprout"
        style={d("1.14s")}
        transform="translate(69,301) rotate(171) scale(.95)"
      />
      <Leaf
        defs={id}
        className="nocturne-sprout"
        style={d("1.35s")}
        transform="translate(58,219) rotate(14) scale(.8)"
      />
      <Tendril
        className="nocturne-sprout"
        style={d("1.5s")}
        transform="translate(69,205) rotate(-140) scale(.85)"
      />
      <Leaf
        defs={id}
        className="nocturne-sprout"
        style={d("1.72s")}
        transform="translate(80,130) rotate(-175) scale(.75)"
      />
      <Bud
        defs={id}
        className="nocturne-sprout"
        style={d("1.85s")}
        transform="translate(56,92) rotate(58) scale(.82)"
      />
      <Bud
        defs={id}
        className="nocturne-sprout"
        style={d("2.05s")}
        transform="translate(50,34) rotate(-16)"
      />
      <Leaf
        defs={id}
        className="nocturne-sprout"
        style={d("1.59s")}
        transform="translate(134,447) rotate(18) scale(.82)"
      />
      <Bud
        defs={id}
        className="nocturne-sprout"
        style={d("1.79s")}
        transform="translate(134,447) rotate(52) scale(.6)"
      />
      <Tendril
        className="nocturne-sprout"
        style={d("1.91s")}
        transform="translate(143,326) rotate(-9) scale(.8)"
      />
      <Leaf
        defs={id}
        className="nocturne-sprout"
        style={d("2.22s")}
        transform="translate(31,236) rotate(-152) scale(.72)"
      />
      <Leaf
        defs={id}
        className="nocturne-sprout"
        style={d("2.55s")}
        transform="translate(138,142) rotate(12) scale(.7)"
      />
      <Leaf
        defs={id}
        className="nocturne-sprout"
        style={d("2.79s")}
        transform="translate(27,70) rotate(180) scale(.62)"
      />
      <Bloom
        defs={id}
        r={30}
        mode="entrance"
        delay={0.96}
        transform="translate(106,354)"
      />
      <Bloom
        defs={id}
        r={24}
        mode="entrance"
        delay={1.27}
        transform="translate(46,262)"
      />
      <Bloom defs={id} r={27} mode="entrance" delay={1.6} transform="translate(92,166)" />
    </svg>
  );
}

function HeroLantern({ lit, onToggle }: { lit: boolean; onToggle: () => void }) {
  return (
    <div className="nocturne-lantern-stage">
      <button
        type="button"
        className="nocturne-lantern"
        aria-pressed={lit}
        aria-label={lit ? "Snuff the lamps" : "Light the lamps"}
        onClick={onToggle}
      >
        <svg viewBox="0 0 90 140" aria-hidden="true" focusable="false">
          <path
            d="M45 6 V 18"
            stroke="var(--nocturne-gilt)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M32 6 H 58"
            stroke="var(--nocturne-gilt)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M33 18 H 57 L 60 30 H 30 Z"
            fill="var(--nocturne-bg-deep)"
            stroke="var(--nocturne-gilt)"
            strokeWidth="1.5"
          />
          <path
            d="M30 30 H 60 L 66 96 A 8 8 0 0 1 58 105 H 32 A 8 8 0 0 1 24 96 Z"
            fill="var(--nocturne-surface-inset)"
            stroke="var(--nocturne-gilt)"
            strokeWidth="1.5"
          />
          <path
            d="M36 30 L 39.5 105 M54 30 L 50.5 105"
            stroke="var(--nocturne-gilt-30)"
            strokeWidth="1"
          />
          <path
            className="nocturne-lantern__flame"
            d="M45 56 C 40.5 63, 41 70, 45 74.5 C 49 70, 49.5 63, 45 56 Z"
            stroke="var(--nocturne-gilt-dim)"
            strokeWidth="1"
          />
          <path
            d="M32 105 H 58 L 55 117 H 35 Z"
            fill="var(--nocturne-bg-deep)"
            stroke="var(--nocturne-gilt)"
            strokeWidth="1.5"
          />
          <path
            d="M45 117 V 128 M38 128 H 52"
            stroke="var(--nocturne-gilt-dim)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <p className="nocturne-lantern-stage__line">
        {lit
          ? "Warm light spills over the flower wall — the night round begins."
          : "Let the flowers be by themselves a while."}
      </p>
      <span className="nocturne-cap nocturne-lantern-stage__hint">
        {lit ? "Tap to snuff the lamps" : "Tap to light the lamps"}
      </span>
    </div>
  );
}

function ProgressBars() {
  const [val, setVal] = useState(24);
  useEffect(() => {
    const id = setInterval(() => setVal((v) => (v >= 100 ? 8 : v + 4)), 900);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="nocturne-stack">
      <Progress label="Moonlight distilling" value={val} />
      <Progress label="Register inked" value={67} />
      <Progress label="Vial sealed" value={100} />
      <Progress label="Night watch…" showValue={false} value={null} />
    </div>
  );
}

function AccessKeyField() {
  const [code, setCode] = useState("");
  const valid = code.length >= 6;
  const touched = code.length > 0;
  return (
    <Field
      label="Warden's word"
      placeholder="Six letters or more…"
      value={code}
      onChange={(e) => setCode(e.target.value)}
      error={touched && !valid ? "The word is too short to hold the gate." : undefined}
    />
  );
}

const SECTIONS: { group: string; items: [string, string, string][] }[] = [
  {
    group: "Inputs",
    items: [
      ["button", "Button", "BTN"],
      ["switch", "Switch", "SWT"],
      ["toggle", "Toggle Group", "TGL"],
      ["checkbox", "Checkbox", "CHK"],
      ["checkbox-group", "Checkbox Group", "CHG"],
      ["radio", "Radio Group", "RDO"],
      ["select", "Select", "SEL"],
      ["combobox", "Combobox", "CBX"],
      ["autocomplete", "Autocomplete", "ACP"],
      ["slider", "Slider", "SLD"],
      ["number", "Number Field", "NUM"],
      ["input", "Text Field", "TXT"],
      ["otp", "OTP Field", "OTP"],
    ],
  },
  {
    group: "Forms",
    items: [
      ["fieldset", "Fieldset", "FLD"],
      ["form", "Form", "FRM"],
    ],
  },
  {
    group: "Feedback",
    items: [
      ["progress", "Progress", "PRG"],
      ["meter", "Meter", "MTR"],
      ["tabs", "Tabs", "TAB"],
      ["accordion", "Accordion", "ACC"],
      ["collapsible", "Collapsible", "CLP"],
    ],
  },
  {
    group: "Overlays",
    items: [
      ["tooltip", "Tooltip", "TIP"],
      ["popover", "Popover", "POP"],
      ["preview", "Preview Card", "PVW"],
      ["menu", "Menu", "MNU"],
      ["menubar", "Menubar", "MBR"],
      ["navmenu", "Navigation Menu", "NAV"],
      ["context", "Context Menu", "CTX"],
      ["dialog", "Dialog", "DLG"],
      ["alert", "Alert Dialog", "ALT"],
      ["drawer", "Drawer", "DRW"],
      ["toast", "Toast", "TST"],
    ],
  },
  {
    group: "Display",
    items: [
      ["avatar", "Avatar", "AVT"],
      ["badge", "Badge", "BDG"],
      ["toolbar", "Toolbar", "TBR"],
      ["scroll", "Scroll Area", "SCR"],
    ],
  },
  {
    group: "Foundations",
    items: [
      ["typography", "Typography", "TYP"],
      ["separator", "Separator", "SEP"],
      ["panel", "Panel", "PNL"],
    ],
  },
  {
    group: "Signature",
    items: [["loader", "Loader", "LDR"]],
  },
];

export default function App() {
  return (
    <ToastProvider>
      <Demo />
    </ToastProvider>
  );
}

function FormDemo() {
  const { add } = useToast();
  const [errors, setErrors] = useState<Record<string, string>>({});
  return (
    <Form
      errors={errors}
      onFormSubmit={(values) => {
        if (String(values.word ?? "").length < 6) {
          setErrors({ word: "The register refuses this word — six letters at least." });
          return;
        }
        setErrors({});
        add({
          title: "Entry archived",
          description: "Signed and filed in the night register.",
          type: "success",
        });
      }}
    >
      <Field label="Specimen" name="specimen" placeholder="Name the bloom…" />
      <Field
        label="Warden's word"
        name="word"
        type="password"
        placeholder="Whispered at the gate…"
      />
      <Button type="submit">Sign the Page</Button>
    </Form>
  );
}

function Demo() {
  const toast = useToast();
  const [lit, setLit] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    document.querySelectorAll(".nocturne-grid").forEach((grid) => {
      grid.classList.add("nocturne-reveal");
      for (const el of grid.children) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <div className={`nocturne-app${lit ? " nocturne-app--lamp-on" : ""}`} lang="en">
      <div className="nocturne-halo-lamp" aria-hidden="true" />
      <header className="nocturne-header">
        <div className="nocturne-logo">
          <span className="nocturne-moondot nocturne-logo__mark" aria-hidden="true" />
          <span className="nocturne-logo__text">NOCTURNE</span>
          <span className="nocturne-logo__sub">DARK BOTANICAL UI KIT</span>
        </div>
        <nav className="nocturne-header__nav">
          <NavigationMenu items={NAV} />
        </nav>
        <div className="nocturne-header__status">
          <Badge tone="secondary" dot>
            NIGHT WATCH
          </Badge>
          <span className="nocturne-header__hora">Hora Noctis</span>
          <ClockIcon className="nocturne-header__status-icon" aria-hidden="true" />
          <HourClock />
        </div>
      </header>

      <div className="nocturne-shell">
        <aside className="nocturne-sidebar">
          {SECTIONS.map((sec) => (
            <nav className="nocturne-sidebar__group" key={sec.group}>
              <span className="nocturne-cap nocturne-sidebar__group-title">
                {sec.group}
              </span>
              {sec.items.map(([id, name, code]) => (
                <a key={id} href={`#${id}`} className="nocturne-sidebar__link">
                  <span>{name}</span>
                  <span className="nocturne-sidebar__meta">{code}</span>
                </a>
              ))}
            </nav>
          ))}
        </aside>

        <main className="nocturne-shell__main">
          <section className="nocturne-hero" id="hero">
            <div
              className="nocturne-hero__vine nocturne-hero__vine--l"
              aria-hidden="true"
            >
              <VineSide />
            </div>
            <div
              className="nocturne-hero__vine nocturne-hero__vine--r"
              aria-hidden="true"
            >
              <VineSide />
            </div>
            <div className="nocturne-hero__glow" aria-hidden="true" />
            <div className="nocturne-hero__text">
              <span className="nocturne-hero__script">Hortus Nocturnus</span>
              <span className="nocturne-cap nocturne-hero__eyebrow">
                Night Register · 37 Blooms
              </span>
              <h1 className="nocturne-h1 nocturne-hero__title">
                A <span className="nocturne-h1--accent">night-blooming</span> interface
                kit
                <br />
                kept in wine, brass &amp; bone till{" "}dawn
              </h1>
              <p className="nocturne-text nocturne-hero__desc">
                Deep-violet velvet, wine-red blooms and brass hairlines — every plate
                watched over by one dim glow until dawn.
              </p>
              <p className="nocturne-text nocturne-hero__desc">
                Every control is its own folder, themed entirely through portable{" "}
                <code className="nocturne-hero__code">--nocturne-*</code> tokens.
              </p>
              <div className="nocturne-hero__stats">
                {[
                  ["37", "Blooms"],
                  ["1", "Token File"],
                  ["0", "Extra Deps"],
                  ["A11y", "Built In"],
                ].map(([n, l]) => (
                  <div key={l} className="nocturne-hero__stat">
                    <span className="nocturne-hero__stat-n">{n}</span>
                    <span className="nocturne-cap">{l}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="nocturne-hero__visual">
              <HeroLantern lit={lit} onToggle={() => setLit((v) => !v)} />
            </div>
          </section>

          <GroupRule
            id="inputs"
            label="Inputs"
            sub="Garden orders · one touch, one promise."
          />
          <div className="nocturne-grid">
            <Panel id="button" title="Button" wide>
              <div className="nocturne-stack">
                <div className="nocturne-row">
                  <Button icon={<LampIcon />}>Light the Lamps</Button>
                  <Button variant="secondary">Browse the Plates</Button>
                  <Button variant="danger">Uproot</Button>
                  <Button variant="ghost">Slip Out Quietly</Button>
                  <Button disabled>Not Dark Yet</Button>
                </div>
                <Separator />
                <div className="nocturne-row">
                  <Button size="sm">Trim</Button>
                  <Button size="md">Tend</Button>
                  <Button size="lg">Bloom</Button>
                </div>
                <Separator />
                <div className="nocturne-row">
                  <Button variant="icon" aria-label="Press the seal">
                    <SealIcon />
                  </Button>
                  <Button variant="icon" aria-label="Ring the bell">
                    <BellIcon />
                  </Button>
                  <Button variant="icon" disabled aria-label="Sealed">
                    <XIcon />
                  </Button>
                  <Button variant="icon-ghost" aria-label="Write a note">
                    <QuillIcon />
                  </Button>
                  <Button variant="icon-ghost" aria-label="Gather dew">
                    <DropIcon />
                  </Button>
                </div>
              </div>
            </Panel>

            <Panel id="switch" title="Switch">
              <div className="nocturne-stack">
                <label className="nocturne-row nocturne-row--between">
                  <span className="nocturne-cap">Warm lamp</span>
                  <Switch defaultChecked />
                </label>
                <label className="nocturne-row nocturne-row--between">
                  <span className="nocturne-cap">Night mist</span>
                  <Switch />
                </label>
                <label className="nocturne-row nocturne-row--between">
                  <span className="nocturne-cap">Sealed vents</span>
                  <Switch disabled defaultChecked />
                </label>
                <label className="nocturne-row nocturne-row--between">
                  <span className="nocturne-cap">Frost alarm</span>
                  <Switch disabled />
                </label>
              </div>
            </Panel>
            <Panel id="toggle" title="Toggle Group">
              <div className="nocturne-stack">
                <ToggleGroup defaultValue={["north"]}>
                  <Toggle value="north">North Wall</Toggle>
                  <Toggle value="south">South Wall</Toggle>
                  <Toggle value="arbor" disabled>
                    Arbor
                  </Toggle>
                </ToggleGroup>
                <ToggleGroup multiple defaultValue={["lamps", "mist", "moths"]}>
                  <Toggle value="lamps">Lamps</Toggle>
                  <Toggle value="mist">Mist</Toggle>
                  <Toggle value="bell">Bell</Toggle>
                  <Toggle value="moths" disabled>
                    Moths
                  </Toggle>
                </ToggleGroup>
              </div>
            </Panel>

            <Panel id="checkbox" title="Checkbox">
              <div className="nocturne-stack">
                <Checkbox defaultChecked label="Bloom noted" />
                <Checkbox label="Scent noted" />
                <Checkbox disabled defaultChecked label="Poison noted" />
                <Checkbox disabled label="Frost noted" />
              </div>
            </Panel>
            <Panel id="checkbox-group" title="Checkbox Group">
              <div className="nocturne-stack">
                <CheckboxGroup
                  defaultValue={["lamps"]}
                  parentLabel="Every duty"
                  items={[
                    { label: "Walk the lamps", value: "lamps" },
                    { label: "Note the dew", value: "dew" },
                    { label: "Watch the moths", value: "moths" },
                  ]}
                />
                <CheckboxGroup
                  defaultValue={["gate"]}
                  parentLabel="Locked duties"
                  disabled
                  items={[
                    { label: "Seal the gate", value: "gate" },
                    { label: "Feed the stove", value: "stove" },
                  ]}
                />
              </div>
            </Panel>

            <Panel id="radio" title="Radio Group">
              <div className="nocturne-stack">
                <span className="nocturne-cap">On duty tonight</span>
                <RadioGroup defaultValue="belladonna">
                  <Radio value="belladonna">Belladonna</Radio>
                  <Radio value="jasmine">Night Jasmine</Radio>
                  <Radio value="primrose">Evening Primrose</Radio>
                  <Radio value="mandrake" disabled>
                    Mandrake (asleep)
                  </Radio>
                </RadioGroup>
                <span className="nocturne-cap">Watch order (sealed)</span>
                <RadioGroup disabled defaultValue="second">
                  <Radio value="first">First watch</Radio>
                  <Radio value="second">Second watch (fixed)</Radio>
                </RadioGroup>
              </div>
            </Panel>
            <Panel id="select" title="Select">
              <div className="nocturne-stack">
                <label className="nocturne-cap" htmlFor="sel-1">
                  Bloom of the hour
                </label>
                <Select
                  items={FLORA}
                  placeholder="Choose a bloom…"
                  defaultValue="jasmine"
                  id="sel-1"
                />
                <label className="nocturne-cap" htmlFor="sel-2">
                  Second bloom
                </label>
                <Select items={FLORA_SHORT} placeholder="Not chosen" id="sel-2" />
                <label className="nocturne-cap" htmlFor="sel-3">
                  Sealed choice
                </label>
                <Select items={FLORA_SHORT} defaultValue="jasmine" disabled id="sel-3" />
              </div>
            </Panel>

            <Panel id="combobox" title="Combobox">
              <div className="nocturne-stack">
                <span className="nocturne-cap">Find a flower</span>
                <Combobox
                  items={FLORA_NAMES}
                  placeholder="Petal by petal…"
                  emptyText="No such flower in the garden"
                  label="Find a flower"
                />
              </div>
            </Panel>
            <Panel id="autocomplete" title="Autocomplete">
              <div className="nocturne-stack">
                <span className="nocturne-cap">Call a round</span>
                <Autocomplete
                  items={ROUNDS}
                  placeholder="Tonight we…"
                  emptyText="No such flower in the garden"
                  label="Call a round"
                />
              </div>
            </Panel>

            <Panel id="slider" title="Slider">
              <div className="nocturne-stack">
                <Slider label="Flame height" defaultValue={62} />
                <Slider label="Mist reach" defaultValue={40} disabled />
                <Slider label="Scent drift" defaultValue={75} showValue={false} />
              </div>
            </Panel>
            <Panel id="number" title="Number Field">
              <div className="nocturne-stack">
                <label className="nocturne-cap" htmlFor="num-1">
                  Lamps lit
                </label>
                <NumberField defaultValue={7} min={0} max={12} step={1} id="num-1" />
                <label className="nocturne-cap" htmlFor="num-2">
                  Lamp cap
                </label>
                <NumberField defaultValue={12} min={0} max={12} step={1} id="num-2" />
              </div>
            </Panel>

            <Panel id="input" title="Text Field">
              <div className="nocturne-stack">
                <Field
                  label="Specimen name"
                  placeholder="Belladonna"
                  defaultValue="Belladonna"
                  description="Entered under this name in the register."
                />
                <Input
                  icon={<SearchIcon />}
                  placeholder="Search the album…"
                  aria-label="Search the album"
                />
                <AccessKeyField />
                <Field label="Locked entry" defaultValue="BELLADONNA-217" disabled />
                <Field
                  label="Catalog code"
                  defaultValue="BELLAD0NNA·2!7"
                  error="Only brass letters and numerals are archived."
                />
              </div>
            </Panel>
            <Panel id="otp" title="OTP Field">
              <div className="nocturne-stack">
                <span className="nocturne-cap">Specimen code</span>
                <OtpField
                  length={6}
                  splitAt={3}
                  defaultValue="217"
                  label="Specimen code"
                />
                <span className="nocturne-cap">Whispered code</span>
                <OtpField
                  length={6}
                  splitAt={3}
                  defaultValue="217"
                  mask
                  label="Whispered code"
                />
                <span className="nocturne-cap">Faded code</span>
                <OtpField
                  length={6}
                  splitAt={3}
                  defaultValue="217"
                  disabled
                  label="Faded code"
                />
              </div>
            </Panel>
          </div>

          <GroupRule
            id="forms"
            label="Forms"
            sub="Night-register entries · archived at the stroke of the pen."
          />
          <div className="nocturne-grid">
            <Panel id="fieldset" title="Fieldset">
              <Fieldset legend="The Warden">
                <Field label="Name" defaultValue="Lady Belladonna" />
                <Field label="Post" defaultValue="South Conservatory" />
              </Fieldset>
            </Panel>
            <Panel id="form" title="Form">
              <FormDemo />
            </Panel>
          </div>

          <GroupRule
            id="feedback"
            label="Feedback"
            sub="Garden gauges · trim the flame, watch the needle."
          />
          <div className="nocturne-grid">
            <Panel id="progress" title="Progress">
              <ProgressBars />
            </Panel>
            <Panel id="meter" title="Meter">
              <div className="nocturne-stack">
                <Meter label="Hothouse heat" value={88} />
                <Meter label="Dew yield" value={70} tone="success" />
                <Meter label="Scent load" value={52} tone="warning" />
                <Meter label="Wilt risk" value={23} tone="danger" />
              </div>
            </Panel>

            <Panel id="tabs" title="Tabs" wide>
              <Tabs
                defaultValue="belladonna"
                items={[
                  {
                    value: "belladonna",
                    label: "Belladonna",
                    content: (
                      <p className="nocturne-text">
                        The garden takes its name from her. Violet-black corollas hang
                        like little bells, and the berries shine with bad intent — beauty
                        and poison sharing one name.
                      </p>
                    ),
                  },
                  {
                    value: "jasmine",
                    label: "Night Jasmine",
                    content: (
                      <p className="nocturne-text">
                        By day it passes for an ordinary shrub; by night its scent floods
                        half the garden. The warden keeps it for a watch-drum.
                      </p>
                    ),
                  },
                  {
                    value: "primrose",
                    label: "Evening Primrose",
                    content: (
                      <p className="nocturne-text">
                        A temperament that blooms only for the moon — the sweetest in the
                        garden, busiest when the register runs fullest.
                      </p>
                    ),
                    disabled: true,
                  },
                ]}
              />
            </Panel>

            <Panel id="accordion" title="Accordion">
              <div className="nocturne-stack">
                <span className="nocturne-cap">One at a time</span>
                <Accordion
                  defaultValue={["rounds"]}
                  items={[
                    {
                      value: "rounds",
                      title: "The rounds",
                      content:
                        "South Conservatory to Weeping Arbor — miss not one lamp on the way.",
                    },
                    {
                      value: "lamps",
                      title: "The lamps",
                      content:
                        "Wicks at one third through the night; brass hoods wiped before dawn.",
                    },
                    {
                      value: "poisons",
                      disabled: true,
                      title: "The poisons",
                      content: "Sealed shelf. Warden's key only, and only at need.",
                    },
                  ]}
                />
                <span className="nocturne-cap">Open together</span>
                <Accordion
                  openMultiple
                  defaultValue={["dew", "rule"]}
                  items={[
                    {
                      value: "dew",
                      title: "The dew",
                      content: "Three drams a night, sealed before the fourth hour.",
                    },
                    {
                      value: "rule",
                      disabled: true,
                      title: "The rule",
                      content: "Dawn is near — put out the lamps for the flowers.",
                    },
                  ]}
                />
              </div>
            </Panel>
            <Panel id="collapsible" title="Collapsible">
              <div className="nocturne-stack">
                <Collapsible title="Warden's note" defaultOpen>
                  <p className="nocturne-text">
                    The belladonna opened three bells early tonight. Watch her.
                  </p>
                </Collapsible>
                <Collapsible title="Maintenance log">
                  <p className="nocturne-text">
                    Flame gauge re-brassed; the needle walks true again.
                  </p>
                </Collapsible>
                <Collapsible title="Poison cabinet" disabled>
                  <p className="nocturne-text">Sealed until the eleventh hour.</p>
                </Collapsible>
                <Collapsible title="House rule" defaultOpen disabled>
                  <p className="nocturne-text">
                    Every growth of the night is entered here — no exceptions.
                  </p>
                </Collapsible>
              </div>
            </Panel>
          </div>

          <GroupRule
            id="overlays"
            label="Overlays"
            sub="Summons · knock softly, and the layers will come."
          />
          <div className="nocturne-grid">
            <Panel id="tooltip" title="Tooltip">
              <div className="nocturne-row">
                <Tooltip content="Wicks at one third — enough to read by" side="top">
                  <Button variant="ghost">Lamps</Button>
                </Tooltip>
                <Tooltip content="Three drams, sealed in celadon" side="bottom">
                  <Button variant="ghost">Dew</Button>
                </Tooltip>
                <Tooltip content="Pressed by the warden's own hand" side="left">
                  <Button variant="ghost">Seal</Button>
                </Tooltip>
                <Tooltip content="One ring at the stroke of midnight" side="right">
                  <Button variant="ghost">Bell</Button>
                </Tooltip>
              </div>
            </Panel>
            <Panel id="popover" title="Popover">
              <Popover
                trigger={<Button variant="ghost">Tonight's round</Button>}
                title="South Conservatory"
              >
                Ancestral hall of the nightshades — wine drapes all year, and one copper
                lamp kept lit for the duty bloom.
              </Popover>
            </Panel>

            <Panel id="preview" title="Preview Card" wide>
              <div className="nocturne-stack">
                <span className="nocturne-cap">Hover the warden</span>
                <p className="nocturne-text">
                  The rounds are drawn each dusk by{" "}
                  <PreviewCard
                    trigger={
                      <a
                        href="#preview"
                        className="nocturne-link"
                        onClick={(e) => e.preventDefault()}
                      >
                        @belladonna
                      </a>
                    }
                  >
                    <div className="nocturne-preview__head">
                      <Avatar status="online">
                        <AvatarImage src="https://i.pravatar.cc/96?img=47" alt="" />
                        <AvatarFallback>B</AvatarFallback>
                      </Avatar>
                      <span className="nocturne-preview__ident">
                        <span className="nocturne-h3 nocturne-preview__title">
                          Lady Belladonna
                        </span>
                        <span className="nocturne-preview__handle">@belladonna</span>
                      </span>
                    </div>
                    <p className="nocturne-text nocturne-preview__desc">
                      Warden of the night garden. Keeps the light for the lamps, and the
                      lamps for the flowers.
                    </p>
                    <div className="nocturne-preview__footer">
                      <Badge tone="primary" dot>
                        Warden
                      </Badge>
                      <Badge tone="neutral">Night Garden</Badge>
                    </div>
                  </PreviewCard>{" "}
                  before the lamps go up.
                </p>
              </div>
            </Panel>

            <Panel id="menu" title="Menu">
              <Menu trigger="Garden actions">
                <MenuItem icon={<LampIcon />} shortcut="⌘L">
                  Light the lamp room
                </MenuItem>
                <MenuItem icon={<QuillIcon />} shortcut="⌘R">
                  Register a sprout
                </MenuItem>
                <MenuItem icon={<DropIcon />} shortcut="⌘G">
                  Gather dew
                </MenuItem>
                <MenuItem icon={<SealIcon />} disabled>
                  Press the seal
                </MenuItem>
                <MenuItem icon={<BellIcon />}>Ring the watch-bell</MenuItem>
                <MenuItem icon={<LeafIcon />}>Turn a new leaf</MenuItem>
                <MenuItem icon={<BookIcon />}>Open the album</MenuItem>
                <MenuItem icon={<MoonIcon />}>Chart the moon</MenuItem>
                <MenuItem icon={<VialIcon />}>Seal a vial</MenuItem>
                <MenuItem icon={<KeyIcon />}>Check the gate</MenuItem>
                <MenuItem icon={<ClockIcon />}>Call the hour</MenuItem>
                <MenuSeparator />
                <MenuItem icon={<XIcon />} tone="danger">
                  Uproot
                </MenuItem>
              </Menu>
            </Panel>
            <Panel id="menubar" title="Menubar">
              <Menubar>
                <MenubarMenu label="Register">
                  <MenuItem>Open tonight's page</MenuItem>
                  <MenuItem>Sign the page</MenuItem>
                  <MenuItem disabled>Amend an entry</MenuItem>
                  <MenuSeparator />
                  <MenuItem tone="danger">Tear out a leaf</MenuItem>
                </MenubarMenu>
                <MenubarMenu label="Lamps">
                  <MenuItem shortcut="⌘↑">Raise the flames</MenuItem>
                  <MenuItem shortcut="⌘↓">Lower the flames</MenuItem>
                </MenubarMenu>
                <MenubarMenu label="Garden">
                  <MenuItem>Open the gates</MenuItem>
                  <MenuItem>Draw the curtains</MenuItem>
                  <MenuSub label="Rounds">
                    <MenuItem>South wall</MenuItem>
                    <MenuItem>Moonlit gallery</MenuItem>
                    <MenuItem>Weeping arbor</MenuItem>
                    <MenuSeparator />
                    <MenuItem>Full round</MenuItem>
                  </MenuSub>
                </MenubarMenu>
              </Menubar>
            </Panel>

            <Panel id="navmenu" title="Navigation Menu">
              <NavigationMenu items={NAV} onLinkClick={(e) => e.preventDefault()} />
            </Panel>
            <Panel id="context" title="Context Menu">
              <div className="nocturne-stack">
                <ContextMenu
                  trigger={
                    <div className="nocturne-context__zone">
                      <span className="nocturne-context__hint">
                        Right-click to summon the warden
                      </span>
                    </div>
                  }
                >
                  <MenuItem shortcut="⌘I">Inspect the bloom</MenuItem>
                  <MenuItem shortcut="⌘D">Copy the entry</MenuItem>
                  <MenuItem disabled>Call for aid</MenuItem>
                  <MenuSeparator />
                  <MenuItem tone="danger">Uproot</MenuItem>
                </ContextMenu>
              </div>
            </Panel>

            <Panel id="dialog" title="Dialog">
              <Dialog
                trigger={<Button variant="secondary">Open the Night Register</Button>}
                title="Tonight's Watch List"
                description="Before you sign, check tonight's two small tasks."
                actions={
                  <>
                    <DialogClose>Another Night</DialogClose>
                    <DialogClose variant="secondary">Sign</DialogClose>
                  </>
                }
              >
                <p className="nocturne-text">
                  Walk the lamps from South Conservatory to Weeping Arbor, and note three
                  drams of dew before the fourth hour.
                </p>
              </Dialog>
            </Panel>
            <Panel id="alert" title="Alert Dialog">
              <div className="nocturne-row">
                <AlertDialog
                  tone="danger"
                  trigger={<Button variant="ghost">Uproot the belladonna</Button>}
                  title="Uproot the belladonna?"
                  description="She has held the north wall for forty years. This cannot be undone."
                  actions={
                    <>
                      <AlertDialogClose>Let her stand</AlertDialogClose>
                      <AlertDialogClose variant="danger">Uproot</AlertDialogClose>
                    </>
                  }
                />
                <AlertDialog
                  tone="warning"
                  trigger={<Button variant="ghost">Snuff every lamp</Button>}
                  title="Snuff every lamp?"
                  description="The flowers will be alone until the next round is called."
                  actions={
                    <>
                      <AlertDialogClose>Keep them lit</AlertDialogClose>
                      <AlertDialogClose variant="primary">Snuff them</AlertDialogClose>
                    </>
                  }
                />
                <AlertDialog
                  tone="primary"
                  trigger={<Button variant="ghost">Apply the planting plan</Button>}
                  title="Apply this planting plan?"
                  description="The current beds will be redrawn under the new plan."
                  actions={
                    <>
                      <AlertDialogClose>Not yet</AlertDialogClose>
                      <AlertDialogClose variant="primary">Apply</AlertDialogClose>
                    </>
                  }
                />
              </div>
            </Panel>

            <Panel id="drawer" title="Drawer">
              <div className="nocturne-row">
                {(
                  [
                    ["top", "Top"],
                    ["bottom", "Bottom"],
                    ["left", "Left"],
                    ["right", "Right"],
                  ] as const
                ).map(([side, label]) => (
                  <Drawer
                    key={side}
                    side={side}
                    trigger={<Button variant="ghost">{label}</Button>}
                    title="Hothouse controls"
                    description="Trim this wing of the garden without leaving the page."
                    actions={<DrawerClose variant="secondary">Close</DrawerClose>}
                  >
                    <div className="nocturne-stack">
                      <label className="nocturne-row nocturne-row--between">
                        <span className="nocturne-cap">Warm lamp</span>
                        <Switch defaultChecked />
                      </label>
                      <label className="nocturne-row nocturne-row--between">
                        <span className="nocturne-cap">Night mist</span>
                        <Switch />
                      </label>
                      <Slider label="Flame height" defaultValue={50} />
                    </div>
                  </Drawer>
                ))}
              </div>
            </Panel>
            <Panel id="toast" title="Toast">
              <div className="nocturne-row">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    toast.add({
                      title: "Entry noted",
                      description: "Filed in Volume VII of the register.",
                    })
                  }
                >
                  Note
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    const id = toast.add({
                      title: "Dew gathered",
                      description: "Three drams tonight, ready for sealing.",
                      type: "success",
                      actionProps: {
                        children: "Seal the vial",
                        onClick: () => toast.close(id),
                      },
                    });
                  }}
                >
                  Gather
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    toast.add({
                      title: "Scent thickening",
                      description: "The jasmine says it is nearly midnight.",
                      type: "warning",
                    })
                  }
                >
                  Scent
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    toast.add({
                      title: "Frost at the gate",
                      description: "Shut the vents of the south wall, quickly.",
                      type: "danger",
                    })
                  }
                >
                  Frost
                </Button>
              </div>
            </Panel>
          </div>

          <GroupRule
            id="display"
            label="Display"
            sub="Plates and seals · all taken to brass."
          />
          <div className="nocturne-grid">
            <Panel id="avatar" title="Avatar">
              <div className="nocturne-row">
                <Avatar status="online">
                  <AvatarImage src="https://i.pravatar.cc/96?img=47" alt="" />
                  <AvatarFallback>B</AvatarFallback>
                </Avatar>
                <Avatar size="sm" status="busy">
                  <AvatarFallback>J</AvatarFallback>
                </Avatar>
                <Avatar status="away">
                  <AvatarFallback>P</AvatarFallback>
                </Avatar>
                <Avatar size="lg" status="offline">
                  <AvatarFallback>M</AvatarFallback>
                </Avatar>
              </div>
            </Panel>
            <Panel id="badge" title="Badge">
              <div className="nocturne-row">
                <Badge tone="primary" dot>
                  In bloom
                </Badge>
                <Badge tone="success">Dew sealed</Badge>
                <Badge tone="warning">Scent high</Badge>
                <Badge tone="danger" dot>
                  Frost
                </Badge>
                <Badge tone="secondary">On watch</Badge>
                <Badge tone="neutral">Dormant</Badge>
              </div>
            </Panel>

            <Panel id="toolbar" title="Toolbar">
              <Toolbar aria-label="Lamp bench">
                <BaseToggleGroup
                  className="nocturne-toolbar__group"
                  defaultValue={["dim"]}
                  aria-label="Flame"
                >
                  <ToolbarButton render={<BaseToggle />} value="dim">
                    Dim
                  </ToolbarButton>
                  <ToolbarButton render={<BaseToggle />} value="warm">
                    Warm
                  </ToolbarButton>
                  <ToolbarButton render={<BaseToggle />} value="bright">
                    Bright
                  </ToolbarButton>
                </BaseToggleGroup>
                <ToolbarSeparator />
                <ToolbarGroup aria-label="Tools">
                  <ToolbarButton aria-label="Write a note">
                    <QuillIcon />
                  </ToolbarButton>
                  <ToolbarButton disabled aria-label="Sealed tool">
                    <SealIcon />
                  </ToolbarButton>
                </ToolbarGroup>
                <ToolbarSeparator />
                <ToolbarLink href="#toolbar">
                  <LampIcon />
                  Lamps steady
                </ToolbarLink>
              </Toolbar>
            </Panel>
            <Panel id="scroll" title="Scroll Area">
              <ScrollArea>
                <ScrollAreaViewport
                  style={{ maxHeight: "var(--nocturne-scroll-demo-h)" }}
                >
                  <ScrollAreaContent>
                    <ol className="nocturne-scroll-list">
                      {[
                        ["23:00", "Lamps up — the night round begins"],
                        ["23:12", "South Conservatory wicks trimmed"],
                        ["23:28", "Belladonna opened three bells early"],
                        ["23:41", "Moonlit Gallery walked, all quiet"],
                        ["23:55", "Jasmine scent thickening — midnight near"],
                        ["00:00", "Watch-bell rung at the stroke"],
                        ["00:17", "First dram of dew gathered"],
                        ["00:44", "Poison cabinet checked and sealed"],
                        ["01:09", "Second dram of dew gathered"],
                        ["01:36", "Weeping Arbor curtains drawn"],
                        ["02:04", "Third dram sealed in celadon"],
                        ["02:30", "Half round done — flames at one third"],
                      ].map(([time, msg]) => (
                        <li key={time} className="nocturne-text">
                          <span className="nocturne-scroll-list__time">{time}</span> {msg}
                        </li>
                      ))}
                    </ol>
                  </ScrollAreaContent>
                </ScrollAreaViewport>
                <ScrollAreaScrollbar>
                  <ScrollAreaThumb />
                </ScrollAreaScrollbar>
              </ScrollArea>
            </Panel>
          </div>

          <GroupRule
            id="foundations"
            label="Foundations"
            sub="The night is built from one brass hairline."
          />
          <div className="nocturne-grid">
            <Panel id="typography" title="Typography" wide>
              <div className="nocturne-stack">
                <h2 className="nocturne-h1">The Garden Wakes at Dusk</h2>
                <h3 className="nocturne-h2">Bone serif over wine velvet</h3>
                <span className="nocturne-h3">Section Sub-Label</span>
                <p className="nocturne-text">
                  Body copy is Cormorant Garamond — a bookplate hand for a garden that
                  keeps its records at night. Catalog codes are struck on a brass
                  typewriter.
                </p>
                <span className="nocturne-cap">Field Caption · 217</span>
              </div>
            </Panel>

            <Panel id="separator" title="Separator">
              <div className="nocturne-stack">
                <span className="nocturne-cap">Bare hairline</span>
                <Separator />
                <span className="nocturne-cap">With a label</span>
                <Separator label="Second wing" align="start" />
                <Separator label="Second wing" />
                <Separator label="Second wing" align="end" />
                <span className="nocturne-cap">Upright</span>
                <div className="nocturne-row">
                  <span className="nocturne-text">Wine</span>
                  <Separator orientation="vertical" />
                  <span className="nocturne-text">Brass</span>
                  <Separator orientation="vertical" />
                  <span className="nocturne-text">Bone</span>
                </div>
              </div>
            </Panel>
            <Panel id="panel" title="Panel">
              <p className="nocturne-text nocturne-panel-note">
                Every plate in the album sits on one of these — velvet under brass,
                hairline within hairline, corners grown over with sprigs.
              </p>
              <Panel title="Nested plate">
                <span className="nocturne-cap">A plate within a plate</span>
              </Panel>
            </Panel>
          </div>

          <GroupRule
            id="signature"
            label="Signature"
            sub="The flowers stand watch, and keep the light for the lamps."
          />
          <div className="nocturne-grid">
            <Panel id="loader" title="Loader" wide>
              <div className="demo-loader-stage">
                <Loader />
              </div>
            </Panel>
          </div>

          <footer className="nocturne-footer">
            <span className="nocturne-cap">
              NOCTURNE · built on @base-ui/react · themed via --nocturne-* tokens ·{" "}
              {new Date().getFullYear()}
            </span>
          </footer>
        </main>
      </div>
    </div>
  );
}

function GroupRule({ id, label, sub }: { id: string; label: string; sub: string }) {
  return (
    <div className="nocturne-grouprule" id={id}>
      <span className="nocturne-moondot nocturne-grouprule__marker" aria-hidden="true" />
      <h2 className="nocturne-h2 nocturne-grouprule__label">{label}</h2>
      <span className="nocturne-cap nocturne-grouprule__sub">{sub}</span>
      <span className="nocturne-grouprule__line" />
    </div>
  );
}
