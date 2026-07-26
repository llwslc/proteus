import { useEffect, useState } from "react";
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
  ClockIcon,
  CopyIcon,
  DropIcon,
  FeatherIcon,
  FlameIcon,
  FlowerIcon,
  KeyIcon,
  LeafIcon,
  MoonIcon,
  SearchIcon,
  SproutIcon,
  TrashIcon,
  VialIcon,
  XIcon,
} from "./components/icons";

const NAV = [
  {
    label: "Garden",
    links: [
      {
        label: "Light the Lamp",
        href: "#inputs",
        description: "Warrants and the register",
      },
      { label: "Read the Flame", href: "#feedback", description: "Gauges and meters" },
      { label: "Ring for Aid", href: "#overlays", description: "Bells and dispatches" },
      { label: "Plaques & Marks", href: "#display", description: "Labels at a glance" },
    ],
  },
  {
    label: "Register",
    links: [
      { label: "All Instruments", href: "#inputs", description: "Thirty-seven blooms" },
      { label: "Line & Letter", href: "#foundations", description: "Brass strokes" },
      { label: "Log Pages", href: "#forms", description: "Night-register leaves" },
      { label: "Plates & Plaques", href: "#foundations", description: "The frame set" },
    ],
  },
  { label: "Garden Rule", href: "#hero" },
  {
    label: "Poison Cabinet",
    disabled: true,
    links: [
      {
        label: "Sealed Files",
        href: "#display",
        description: "Opened by warden's seal only",
      },
    ],
  },
];

const HOUSES = [
  { label: "South Conservatory", value: "south" },
  { label: "Moonlit Gallery", value: "gallery" },
  { label: "Poison Cabinet", value: "poison" },
  { label: "Weeping Arbor", value: "arbor" },
  { label: "North Bed", value: "north" },
  { label: "Glasshouse Dome", value: "dome" },
  { label: "Moss Cistern", value: "moss" },
  { label: "Dew Well", value: "well" },
  { label: "Vine Corridor", value: "vine" },
  { label: "Fungus Cellar", value: "fungus" },
  { label: "Herbarium", value: "herbarium" },
  { label: "Sealed Hothouse", value: "sealed", disabled: true },
];
const HOUSES_SHORT = HOUSES.slice(0, 3);

const FLOWERS = [
  "Belladonna",
  "Night Jasmine",
  "Evening Primrose",
  "Datura",
  "Spider Lily",
  "Silk Tree",
  "Mimosa",
  "Hemlock",
  "Aconite",
  "Lily of the Valley",
  "Moonflower",
  { label: "Heartbreak Grass", disabled: true },
];

const KEEPERS = [
  "Lampkeeper",
  "Warden",
  "Dew Gatherer",
  "Night Warden",
  "Bloom Marshal",
  "Bell Ringer",
  "Herbalist",
  "Registrar",
  "Glasshouse Hand",
  "Arbor Tender",
  "Moon Clerk",
  { label: "Sealbearer", disabled: true },
];

function Clock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return <span className="nocturne-clock">{now.toLocaleTimeString("en-US")}</span>;
}

function HeroLamp() {
  return (
    <div className="nocturne-lamp-stage" aria-hidden="true">
      <span className="nocturne-lamp-stage__halo" />
      <span className="nocturne-script nocturne-lamp-stage__script">
        Hortus Nocturnus
      </span>
      <svg className="nocturne-lamp-stage__lamp" viewBox="0 0 140 200" fill="none">
        <circle
          className="nocturne-lamp-stage__glow"
          cx="70"
          cy="86"
          r="52"
          fill="url(#lampHalo)"
        />
        <defs>
          <radialGradient id="lampFlame" cx="50%" cy="72%" r="62%">
            <stop offset="0" stopColor="#FFF4D6" />
            <stop offset=".5" stopColor="#F2C14E" />
            <stop offset="1" stopColor="#C0741C" />
          </radialGradient>
          <radialGradient id="lampHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#F2C14E" stopOpacity=".34" />
            <stop offset="1" stopColor="#F2C14E" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="lampBrass" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#6B5026" />
            <stop offset=".34" stopColor="#D6B478" />
            <stop offset=".62" stopColor="#AD8340" />
            <stop offset="1" stopColor="#665029" />
          </linearGradient>
          <linearGradient id="lampOil" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#431223" />
            <stop offset=".38" stopColor="#71223B" />
            <stop offset="1" stopColor="#330D1C" />
          </linearGradient>
        </defs>
        <path
          d="M46 124 C 37 108 37 86 44 68 C 49 54 49 34 45 18 L95 18 C 91 34 91 54 96 68 C 103 86 103 108 94 124 Z"
          fill="rgba(233,204,138,.05)"
          stroke="rgba(198,154,78,.34)"
          strokeWidth="1.2"
        />
        <ellipse
          cx="70"
          cy="18"
          rx="25"
          ry="4.4"
          fill="rgba(18,10,24,.5)"
          stroke="rgba(198,154,78,.4)"
          strokeWidth="1.2"
        />
        <g className="nocturne-lamp-stage__flame">
          <path
            d="M70 120 C 58 108 53 94 58 78 C 61 68 66 61 70 52 C 74 61 79 68 82 78 C 87 94 82 108 70 120 Z"
            fill="url(#lampFlame)"
          />
          <path
            d="M70 116 C 63 110 60 101 63 91 C 65 85 68 81 70 75 C 72 81 75 85 76 91 C 79 101 76 110 70 116 Z"
            fill="#7A2440"
            opacity=".42"
          />
        </g>
        <rect
          x="56"
          y="114"
          width="28"
          height="7"
          rx="1"
          fill="url(#lampBrass)"
          stroke="#5E4622"
          strokeWidth=".8"
        />
        <path
          d="M40 124 L100 124 L96 134 L44 134 Z"
          fill="url(#lampBrass)"
          stroke="#5E4622"
          strokeWidth=".8"
        />
        <path
          d="M45 134 C 34 148 33 168 47 176 L93 176 C 107 168 106 148 95 134 Z"
          fill="url(#lampOil)"
          stroke="#8A6B3A"
          strokeWidth="1.1"
        />
        <path
          d="M45 176 L95 176 L102 190 L38 190 Z"
          fill="url(#lampBrass)"
          stroke="#5E4622"
          strokeWidth=".8"
        />
        <rect
          x="36"
          y="189"
          width="68"
          height="6"
          rx="2"
          fill="url(#lampBrass)"
          stroke="#5E4622"
          strokeWidth=".8"
        />
      </svg>
      <span className="nocturne-script nocturne-lamp-stage__hand">
        Flowers keep the light
      </span>
    </div>
  );
}

function DistillBars() {
  const [val, setVal] = useState(24);
  useEffect(() => {
    const id = setInterval(() => setVal((v) => (v >= 100 ? 8 : v + 4)), 900);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="nocturne-stack">
      <Progress label="Moonlight distilling" value={val} />
      <Progress label="Temperature read" value={67} />
      <Progress label="Flask sealed" value={100} />
      <Progress label="Settling…" showValue={false} value={null} />
    </div>
  );
}

function SpecNameField() {
  const [code, setCode] = useState("");
  const valid = code.length >= 6;
  const touched = code.length > 0;
  return (
    <Field
      label="Specimen name"
      placeholder="Six characters or more…"
      value={code}
      onChange={(e) => setCode(e.target.value)}
      error={touched && !valid ? "Too short for the register." : undefined}
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

function Demo() {
  const toast = useToast();

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
    <div className="nocturne-app" lang="en">
      <header className="nocturne-header">
        <div className="nocturne-logo">
          <FlowerIcon className="nocturne-logo__mark" aria-hidden="true" />
          <span className="nocturne-logo__text">NOCTURNE</span>
          <span className="nocturne-logo__sub">DARK-BOTANICAL UI KIT</span>
        </div>
        <nav className="nocturne-header__nav">
          <NavigationMenu items={NAV} />
        </nav>
        <div className="nocturne-header__status">
          <Badge tone="primary" dot>
            GARDEN OPEN
          </Badge>
          <ClockIcon className="nocturne-header__status-icon" aria-hidden="true" />
          <Clock />
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
          <section className="nocturne-hero" id="hero" lang="en">
            <div className="nocturne-hero__text">
              <span className="nocturne-cap nocturne-hero__eyebrow">
                Hortus Nocturnus · 37 Blooms
              </span>
              <h1 className="nocturne-h1 nocturne-hero__title">
                A <span className="nocturne-h1--accent">dark-botanical</span> interface
                kit
                <br />
                inked in brass, kept by lamplight
              </h1>
              <p className="nocturne-text nocturne-hero__desc">
                Velvet ground, brass hairline frames, wine plaques and a lamp-warm glow —
                a midnight herbarium where flowers keep the light.
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
              <HeroLamp />
            </div>
          </section>

          <GroupRule
            id="inputs"
            label="Inputs"
            sub="A vow per switch, a stroke per record."
          />
          <div className="nocturne-grid">
            <Panel id="button" title="Button" meta="BTN" wide>
              <div className="nocturne-stack">
                <div className="nocturne-row">
                  <Button icon={<SproutIcon />}>Register bloom</Button>
                  <Button variant="secondary">Browse plates</Button>
                  <Button variant="danger">Erase record</Button>
                  <Button variant="ghost">Slip out</Button>
                  <Button disabled>Not yet dusk</Button>
                </div>
                <Separator />
                <div className="nocturne-row">
                  <Button size="sm">Tap</Button>
                  <Button size="md">Standard</Button>
                  <Button size="lg">Light it</Button>
                </div>
                <Separator />
                <div className="nocturne-row">
                  <Button variant="icon" aria-label="Copy">
                    <CopyIcon />
                  </Button>
                  <Button variant="icon" aria-label="Seal">
                    <KeyIcon />
                  </Button>
                  <Button variant="icon" disabled aria-label="Locked">
                    <XIcon />
                  </Button>
                  <Button variant="icon-ghost" aria-label="Pick">
                    <FlowerIcon />
                  </Button>
                  <Button variant="icon-ghost" aria-label="Gather dew">
                    <DropIcon />
                  </Button>
                </div>
              </div>
            </Panel>

            <Panel id="switch" title="Switch" meta="SWT">
              <div className="nocturne-stack">
                <label className="nocturne-row nocturne-row--between">
                  <span className="nocturne-cap">Keep lamp lit</span>
                  <Switch defaultChecked />
                </label>
                <label className="nocturne-row nocturne-row--between">
                  <span className="nocturne-cap">Night mist</span>
                  <Switch />
                </label>
                <label className="nocturne-row nocturne-row--between">
                  <span className="nocturne-cap">Seal the dew</span>
                  <Switch disabled defaultChecked />
                </label>
                <label className="nocturne-row nocturne-row--between">
                  <span className="nocturne-cap">Lock poison bed</span>
                  <Switch disabled />
                </label>
              </div>
            </Panel>
            <Panel id="toggle" title="Toggle Group" meta="TGL">
              <div className="nocturne-stack">
                <ToggleGroup defaultValue={["night"]}>
                  <Toggle value="night">Rounds</Toggle>
                  <Toggle value="dawn">Harvest</Toggle>
                  <Toggle value="rest" disabled>
                    Rest
                  </Toggle>
                </ToggleGroup>
                <ToggleGroup multiple defaultValue={["lamp", "mist", "seal"]}>
                  <Toggle value="lamp">Lamp</Toggle>
                  <Toggle value="mist">Mist</Toggle>
                  <Toggle value="dew">Dew</Toggle>
                  <Toggle value="seal" disabled>
                    Seal
                  </Toggle>
                </ToggleGroup>
              </div>
            </Panel>

            <Panel id="checkbox" title="Checkbox" meta="CHK">
              <div className="nocturne-stack">
                <Checkbox defaultChecked label="Bloom period" />
                <Checkbox label="Scent" />
                <Checkbox disabled defaultChecked label="Toxicity logged" />
                <Checkbox disabled label="Sealed" />
              </div>
            </Panel>
            <Panel id="checkbox-group" title="Checkbox Group" meta="CHG">
              <div className="nocturne-stack">
                <CheckboxGroup
                  defaultValue={["bloom"]}
                  parentLabel="Catalogue all"
                  items={[
                    { label: "Bloom period", value: "bloom" },
                    { label: "Scent", value: "scent" },
                    { label: "Toxicity", value: "toxin" },
                  ]}
                />
                <CheckboxGroup
                  defaultValue={["orbit"]}
                  parentLabel="Sealed fields"
                  disabled
                  items={[
                    { label: "Moon phase", value: "orbit" },
                    { label: "Dew yield", value: "dew" },
                  ]}
                />
              </div>
            </Panel>

            <Panel id="radio" title="Radio Group" meta="RDO">
              <div className="nocturne-stack">
                <span className="nocturne-cap">Bloom on duty tonight</span>
                <RadioGroup defaultValue="belladonna">
                  <Radio value="belladonna">Belladonna</Radio>
                  <Radio value="jasmine">Night Jasmine</Radio>
                  <Radio value="primrose">Evening Primrose</Radio>
                  <Radio value="sealed" disabled>
                    Heartbreak Grass (locked)
                  </Radio>
                </RadioGroup>
                <span className="nocturne-cap">Flame mode (sealed)</span>
                <RadioGroup disabled defaultValue="steady">
                  <Radio value="flicker">Flickering</Radio>
                  <Radio value="steady">Steady (fixed)</Radio>
                </RadioGroup>
              </div>
            </Panel>
            <Panel id="select" title="Select" meta="SEL">
              <div className="nocturne-stack">
                <label className="nocturne-cap" htmlFor="sel-1">
                  Rounds tonight
                </label>
                <Select
                  items={HOUSES}
                  placeholder="Pick a house…"
                  defaultValue="gallery"
                  id="sel-1"
                />
                <label className="nocturne-cap" htmlFor="sel-2">
                  Second round
                </label>
                <Select items={HOUSES_SHORT} placeholder="Unchosen" id="sel-2" />
                <label className="nocturne-cap" htmlFor="sel-3">
                  Sealed house
                </label>
                <Select items={HOUSES_SHORT} defaultValue="gallery" disabled id="sel-3" />
              </div>
            </Panel>

            <Panel id="combobox" title="Combobox" meta="CBX">
              <div className="nocturne-stack">
                <span className="nocturne-cap">Search blooms</span>
                <Combobox
                  items={FLOWERS}
                  placeholder="Flower name…"
                  emptyText="No such bloom in the garden"
                  label="Search blooms"
                />
              </div>
            </Panel>
            <Panel id="autocomplete" title="Autocomplete" meta="ACP">
              <div className="nocturne-stack">
                <span className="nocturne-cap">Call a keeper</span>
                <Autocomplete
                  items={KEEPERS}
                  placeholder="Name…"
                  emptyText="No such keeper in the garden"
                  label="Call a keeper"
                />
              </div>
            </Panel>

            <Panel id="slider" title="Slider" meta="SLD">
              <div className="nocturne-stack">
                <Slider label="Lamp flame" defaultValue={62} />
                <Slider label="Mist density" defaultValue={40} disabled />
                <Slider label="Dew collected" defaultValue={75} showValue={false} />
              </div>
            </Panel>
            <Panel id="number" title="Number Field" meta="NUM">
              <div className="nocturne-stack">
                <label className="nocturne-cap" htmlFor="num-1">
                  Keepers on duty
                </label>
                <NumberField defaultValue={7} min={0} max={12} step={1} id="num-1" />
                <label className="nocturne-cap" htmlFor="num-2">
                  Duty cap
                </label>
                <NumberField defaultValue={12} min={0} max={12} step={1} id="num-2" />
              </div>
            </Panel>

            <Panel id="input" title="Text Field" meta="TXT">
              <div className="nocturne-stack">
                <Field
                  label="Garden name"
                  placeholder="Belladonna Night Garden"
                  defaultValue="Belladonna Night Garden"
                  description="The register files it under this name."
                />
                <Input
                  icon={<SearchIcon />}
                  placeholder="Search specimens…"
                  aria-label="Search specimens"
                />
                <SpecNameField />
                <Field label="Sealed" defaultValue="Register 217" disabled />
                <Field
                  label="Specimen no."
                  defaultValue="Register 2１7"
                  error="Contains a character the register won't take."
                />
              </div>
            </Panel>
            <Panel id="otp" title="OTP Field" meta="OTP">
              <div className="nocturne-stack">
                <span className="nocturne-cap">Entry cipher</span>
                <OtpField
                  length={6}
                  splitAt={3}
                  defaultValue="217"
                  label="Entry cipher"
                />
                <span className="nocturne-cap">Hidden cipher</span>
                <OtpField
                  length={6}
                  splitAt={3}
                  defaultValue="217"
                  mask
                  label="Hidden cipher"
                />
                <span className="nocturne-cap">Voided cipher</span>
                <OtpField
                  length={6}
                  splitAt={3}
                  defaultValue="217"
                  disabled
                  label="Voided cipher"
                />
              </div>
            </Panel>
          </div>

          <GroupRule id="forms" label="Forms" sub="The night register, entry by entry." />
          <div className="nocturne-grid">
            <Panel id="fieldset" title="Fieldset" meta="FLD">
              <Fieldset legend="Keeper">
                <Field label="Name" defaultValue="Lampkeeper" />
                <Field label="On duty" defaultValue="South Conservatory" />
              </Fieldset>
            </Panel>
            <Panel id="form" title="Form" meta="FRM">
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  toast.add({
                    title: "Filed",
                    description: "The register received the specimen.",
                    type: "success",
                  });
                }}
              >
                <Field
                  label="Specimen name"
                  placeholder="e.g. Belladonna · first dusk bloom"
                />
                <Field label="Entry cipher" type="password" placeholder="Cipher…" />
                <Button type="submit" variant="primary">
                  File to register
                </Button>
              </Form>
            </Panel>
          </div>

          <GroupRule
            id="feedback"
            label="Feedback"
            sub="Flame high or low, told at a glance."
          />
          <div className="nocturne-grid">
            <Panel id="progress" title="Progress" meta="PRG">
              <DistillBars />
            </Panel>
            <Panel id="meter" title="Meter" meta="MTR">
              <div className="nocturne-stack">
                <Meter label="Greenhouse temp" value={88} />
                <Meter label="Bloom progress" value={70} tone="success" />
                <Meter label="Dew loss" value={52} tone="warning" />
                <Meter label="Toxicity" value={23} tone="danger" />
              </div>
            </Panel>

            <Panel id="tabs" title="Tabs" meta="TAB" wide>
              <Tabs
                defaultValue="belladonna"
                items={[
                  {
                    value: "belladonna",
                    label: "Belladonna",
                    content: (
                      <p className="nocturne-text">
                        The garden is named for it. A blackish-purple corolla hangs like a
                        small bell, the berries gleam a little too brightly — beauty and
                        poison under one name.
                      </p>
                    ),
                  },
                  {
                    value: "jasmine",
                    label: "Night Jasmine",
                    content: (
                      <p className="nocturne-text">
                        A plain shrub by day; after dark its scent floods half the garden.
                        The keeper reads it like a watch-drum: when the scent is thickest,
                        it is midnight.
                      </p>
                    ),
                  },
                  {
                    value: "primrose",
                    label: "Evening Primrose",
                    content: (
                      <p className="nocturne-text">
                        It opens only for the moon, the easiest temper in the garden. It
                        blooms most around the full moon, and its record page fills up the
                        fullest too.
                      </p>
                    ),
                    disabled: true,
                  },
                ]}
              />
            </Panel>

            <Panel id="accordion" title="Accordion" meta="ACC">
              <div className="nocturne-stack">
                <span className="nocturne-cap">One at a time</span>
                <Accordion
                  defaultValue={["duty"]}
                  items={[
                    {
                      value: "duty",
                      title: "On duty",
                      content:
                        "Light the lamp at midnight, walk from the south wing to the weeping arbor, miss none.",
                    },
                    {
                      value: "register",
                      title: "Register",
                      content:
                        "Filed the moment you write it — entered in the Night Register, volume seven.",
                    },
                    {
                      value: "seal",
                      disabled: true,
                      title: "Seal",
                      content:
                        "The poison cabinet opens by warden's seal only; once logged, touch it no more.",
                    },
                  ]}
                />
                <span className="nocturne-cap">Open together</span>
                <Accordion
                  openMultiple
                  defaultValue={["lamp", "vow"]}
                  items={[
                    {
                      value: "lamp",
                      title: "Lamp room",
                      content:
                        "One bead of brass flame all night; nudge the flame up a notch, the needle moves an inch.",
                    },
                    {
                      value: "vow",
                      disabled: true,
                      title: "Garden vow",
                      content:
                        "By first light, put out the lamp for the flowers. It is the garden's first rule.",
                    },
                  ]}
                />
              </div>
            </Panel>
            <Panel id="collapsible" title="Collapsible" meta="CLP">
              <div className="nocturne-stack">
                <Collapsible title="Night-round notes" defaultOpen>
                  <p className="nocturne-text">
                    Records of the nightly rounds. Seal the flask before the small hours,
                    or the dew scatters.
                  </p>
                </Collapsible>
                <Collapsible title="Flame log">
                  <p className="nocturne-text">
                    Trim the wick to a third — enough to read the leaf veins without
                    waking the folded blooms.
                  </p>
                </Collapsible>
                <Collapsible title="Sealed files" disabled>
                  <p className="nocturne-text">
                    Opened by warden's seal only; hold your breath at the door.
                  </p>
                </Collapsible>
                <Collapsible title="Garden rule" defaultOpen disabled>
                  <p className="nocturne-text">
                    By first light, put out the lamp for the flowers — posted under seal.
                  </p>
                </Collapsible>
              </div>
            </Panel>
          </div>

          <GroupRule
            id="overlays"
            label="Overlays"
            sub="Ring once, and aid comes quietly."
          />
          <div className="nocturne-grid">
            <Panel id="tooltip" title="Tooltip" meta="TIP">
              <div className="nocturne-row">
                <Tooltip content="Raise the flame" side="top">
                  <Button variant="ghost">Flame</Button>
                </Tooltip>
                <Tooltip content="Lay a night mist" side="bottom">
                  <Button variant="ghost">Mist</Button>
                </Tooltip>
                <Tooltip content="Gather a dram of dew" side="left">
                  <Button variant="ghost">Dew</Button>
                </Tooltip>
                <Tooltip content="Press the warden's seal" side="right">
                  <Button variant="ghost">Seal</Button>
                </Tooltip>
              </div>
            </Panel>
            <Panel id="popover" title="Popover" meta="POP">
              <Popover
                trigger={<Button variant="ghost">South wing</Button>}
                title="South Conservatory"
              >
                The old family seat of the nightshades, wine drapes year-round. Belladonna
                is on duty tonight and blooms fullest around midnight.
              </Popover>
            </Panel>

            <Panel id="preview" title="Preview Card" meta="PVW" wide>
              <div className="nocturne-stack">
                <span className="nocturne-cap">Hover the keeper</span>
                <p className="nocturne-text">
                  Tonight's rounds are led by{" "}
                  <PreviewCard
                    trigger={
                      <a
                        href="#preview"
                        className="nocturne-link"
                        onClick={(e) => e.preventDefault()}
                      >
                        @lampkeeper
                      </a>
                    }
                  >
                    <div className="nocturne-preview__head">
                      <Avatar status="online">
                        <AvatarImage src="https://i.pravatar.cc/96?img=32" alt="" />
                        <AvatarFallback>L</AvatarFallback>
                      </Avatar>
                      <span className="nocturne-preview__ident">
                        <span className="nocturne-h3 nocturne-preview__title">
                          Lampkeeper
                        </span>
                        <span className="nocturne-preview__handle">@lampkeeper</span>
                      </span>
                    </div>
                    <p className="nocturne-text nocturne-preview__desc">
                      Carries a brass lamp and keeps the light for the flowers till dawn.
                      Fond of saying, "let the flower be a while."
                    </p>
                    <div className="nocturne-preview__footer">
                      <Badge tone="primary" dot>
                        Third watch
                      </Badge>
                      <Badge tone="neutral">South wing</Badge>
                    </div>
                  </PreviewCard>{" "}
                  bearing the lamp.
                </p>
              </div>
            </Panel>

            <Panel id="menu" title="Menu" meta="MNU">
              <Menu trigger="Garden warrant">
                <MenuItem icon={<CopyIcon />} shortcut="⌘D">
                  Copy a leaf
                </MenuItem>
                <MenuItem icon={<KeyIcon />} shortcut="⌘L">
                  Press the seal
                </MenuItem>
                <MenuItem icon={<BellIcon />} shortcut="⌘R">
                  Ring the bell
                </MenuItem>
                <MenuItem icon={<XIcon />} disabled>
                  Seal and file
                </MenuItem>
                <MenuItem icon={<FlameIcon />}>Raise the flame</MenuItem>
                <MenuItem icon={<LeafIcon />}>Gather the sprays</MenuItem>
                <MenuItem icon={<CopyIcon />}>Plant a mirror pair</MenuItem>
                <MenuItem icon={<MoonIcon />}>Turn to the moon</MenuItem>
                <MenuItem icon={<FlowerIcon />}>Snap to the vine</MenuItem>
                <MenuItem icon={<DropIcon />}>Gather a dram of dew</MenuItem>
                <MenuItem icon={<VialIcon />}>Set the still</MenuItem>
                <MenuSeparator />
                <MenuItem icon={<TrashIcon />} tone="danger">
                  Erase record
                </MenuItem>
              </Menu>
            </Panel>
            <Panel id="menubar" title="Menubar" meta="MBR">
              <Menubar>
                <MenubarMenu label="Bed">
                  <MenuItem>Light</MenuItem>
                  <MenuItem>Douse</MenuItem>
                  <MenuItem disabled>Transplant</MenuItem>
                  <MenuSeparator />
                  <MenuItem tone="danger">Uproot</MenuItem>
                </MenubarMenu>
                <MenubarMenu label="Order">
                  <MenuItem shortcut="⌘]">Bring forward</MenuItem>
                  <MenuItem shortcut="⌘[">Send backward</MenuItem>
                </MenubarMenu>
                <MenubarMenu label="Arrange">
                  <MenuItem>Align to left wall</MenuItem>
                  <MenuItem>Align to right wall</MenuItem>
                  <MenuSub label="Distribute">
                    <MenuItem>Top bed</MenuItem>
                    <MenuItem>Middle bed</MenuItem>
                    <MenuItem>Bottom bed</MenuItem>
                    <MenuSeparator />
                    <MenuItem>Reset</MenuItem>
                  </MenuSub>
                </MenubarMenu>
              </Menubar>
            </Panel>

            <Panel id="navmenu" title="Navigation Menu" meta="NAV">
              <NavigationMenu items={NAV} onLinkClick={(e) => e.preventDefault()} />
            </Panel>
            <Panel id="context" title="Context Menu" meta="CTX">
              <div className="nocturne-stack">
                <ContextMenu
                  trigger={
                    <div className="nocturne-context__zone">
                      <span className="nocturne-cap">
                        Right-click for the garden warrant
                      </span>
                    </div>
                  }
                >
                  <MenuItem shortcut="⌘I">Inspect specimen</MenuItem>
                  <MenuItem shortcut="⌘D">Copy a leaf</MenuItem>
                  <MenuItem disabled>Transplant</MenuItem>
                  <MenuSeparator />
                  <MenuItem tone="danger">Erase record</MenuItem>
                </ContextMenu>
              </div>
            </Panel>

            <Panel id="dialog" title="Dialog" meta="DLG">
              <Dialog
                trigger={<Button variant="secondary">Open the register</Button>}
                title="Tonight's Watch"
                description="Before you sign, check the two small tasks for tonight. A stroke files it; sign another night, the flowers won't rush you."
                actions={
                  <>
                    <DialogClose>Another night</DialogClose>
                    <DialogClose variant="secondary" data-combo="confirm">
                      Sign
                    </DialogClose>
                  </>
                }
              >
                <p className="nocturne-text">
                  On duty: 3 · Walk the lamps · Log three drams of dew
                </p>
              </Dialog>
            </Panel>
            <Panel id="alert" title="Alert Dialog" meta="ALT">
              <div className="nocturne-row">
                <AlertDialog
                  tone="danger"
                  trigger={<Button variant="ghost">Erase record</Button>}
                  title="Erase tonight's record?"
                  description="Everything grown tonight will be wiped from the register. This cannot be undone."
                  actions={
                    <>
                      <AlertDialogClose>Cancel</AlertDialogClose>
                      <AlertDialogClose variant="danger" data-combo="confirm">
                        Erase
                      </AlertDialogClose>
                    </>
                  }
                />
                <AlertDialog
                  tone="warning"
                  trigger={<Button variant="ghost">Reset beds</Button>}
                  title="Reset the bed layout?"
                  description="Every plant returns to its starting bed. Confirm to proceed."
                  actions={
                    <>
                      <AlertDialogClose>Cancel</AlertDialogClose>
                      <AlertDialogClose variant="primary" data-combo="confirm">
                        Reset
                      </AlertDialogClose>
                    </>
                  }
                />
                <AlertDialog
                  tone="primary"
                  trigger={<Button variant="ghost">Apply watch</Button>}
                  title="Apply this watch sheet?"
                  description="The current watch sheet is replaced by this new one."
                  actions={
                    <>
                      <AlertDialogClose>Cancel</AlertDialogClose>
                      <AlertDialogClose variant="primary" data-combo="confirm">
                        Apply
                      </AlertDialogClose>
                    </>
                  }
                />
              </div>
            </Panel>

            <Panel id="drawer" title="Drawer" meta="DRW">
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
                    title="Greenhouse controls"
                    description="Adjust this greenhouse's flame and mist."
                    actions={<DrawerClose variant="secondary">Close</DrawerClose>}
                  >
                    <label className="nocturne-row nocturne-row--between">
                      <span className="nocturne-cap">Keep lamp lit</span>
                      <Switch defaultChecked />
                    </label>
                    <label className="nocturne-row nocturne-row--between">
                      <span className="nocturne-cap">Night mist</span>
                      <Switch />
                    </label>
                    <Slider label="Lamp flame" defaultValue={50} />
                  </Drawer>
                ))}
              </div>
            </Panel>
            <Panel id="toast" title="Toast" meta="TST">
              <div className="nocturne-row">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    toast.add({
                      title: "Bell rung",
                      description: "Midnight; the flames burn as usual.",
                    })
                  }
                >
                  Bell
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    const id = toast.add({
                      title: "Dew gathered",
                      description: "Three drams tonight, sealed in a celadon vial.",
                      type: "success",
                      actionProps: {
                        children: "Received",
                        onClick: () => toast.close(id),
                      },
                    });
                  }}
                >
                  Dew
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    toast.add({
                      title: "Mist too thick",
                      description:
                        "The weeping arbor is damp; the ferns want to be left alone.",
                      type: "warning",
                    })
                  }
                >
                  Mist
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    toast.add({
                      title: "Poison warning",
                      description:
                        "The poison cabinet is unsealed; once logged, touch it no more.",
                      type: "danger",
                    })
                  }
                >
                  Poison
                </Button>
              </div>
            </Panel>
          </div>

          <GroupRule
            id="display"
            label="Display"
            sub="Plaques and marks, each in its place."
          />
          <div className="nocturne-grid">
            <Panel id="avatar" title="Avatar" meta="AVT">
              <div className="nocturne-row">
                <Avatar status="online">
                  <AvatarImage src="https://i.pravatar.cc/96?img=32" alt="" />
                  <AvatarFallback>L</AvatarFallback>
                </Avatar>
                <Avatar size="sm" status="busy">
                  <AvatarFallback>W</AvatarFallback>
                </Avatar>
                <Avatar status="away">
                  <AvatarFallback>D</AvatarFallback>
                </Avatar>
                <Avatar size="lg" status="offline">
                  <AvatarFallback>N</AvatarFallback>
                </Avatar>
              </div>
            </Panel>
            <Panel id="badge" title="Badge" meta="BDG">
              <div className="nocturne-row">
                <Badge tone="primary" dot>
                  On duty
                </Badge>
                <Badge tone="success">Filed</Badge>
                <Badge tone="warning">Mist</Badge>
                <Badge tone="danger" dot>
                  Toxic
                </Badge>
                <Badge tone="secondary">Drape</Badge>
                <Badge tone="neutral">Draft</Badge>
              </div>
            </Panel>

            <Panel id="toolbar" title="Toolbar" meta="TBR">
              <Toolbar aria-label="Night-round tools">
                <BaseToggleGroup
                  className="nocturne-toolbar__group"
                  defaultValue={["lamp"]}
                  aria-label="Flame"
                >
                  <ToolbarButton render={<BaseToggle />} value="lamp">
                    Light
                  </ToolbarButton>
                  <ToolbarButton render={<BaseToggle />} value="mist">
                    Mist
                  </ToolbarButton>
                  <ToolbarButton render={<BaseToggle />} value="dew">
                    Dew
                  </ToolbarButton>
                </BaseToggleGroup>
                <ToolbarSeparator />
                <ToolbarGroup aria-label="Tools">
                  <ToolbarButton aria-label="Write">
                    <FeatherIcon />
                  </ToolbarButton>
                  <ToolbarButton disabled aria-label="Trim flame">
                    <FlameIcon />
                  </ToolbarButton>
                </ToolbarGroup>
                <ToolbarSeparator />
                <ToolbarLink href="#toolbar">
                  <BellIcon />
                  Bell as usual
                </ToolbarLink>
              </Toolbar>
            </Panel>
            <Panel id="scroll" title="Scroll Area" meta="SCR">
              <ScrollArea>
                <ScrollAreaViewport>
                  <ScrollAreaContent>
                    <ol className="nocturne-scroll-list">
                      {[
                        ["21:00", "Lamp lit, rounds begin at the south wing"],
                        ["21:30", "Belladonna opens, berries brightening"],
                        ["23:00", "Night jasmine thick, serving as the watch-drum"],
                        ["00:00", "Three drams of dew logged, sealed in celadon"],
                        ["01:00", "Evening primrose fully open to the moon"],
                        ["01:30", "Weeping arbor too damp, arbor closed"],
                        ["03:00", "Set the still; moonlight condenses to a cup"],
                        ["03:30", "Poison cabinet counter-checked under seal"],
                        ["05:00", "Trim the flame low, leaf veins dimming"],
                        ["05:30", "Dew about to scatter, seal the last vial"],
                        ["07:00", "Spent blooms filed to the register"],
                        ["07:30", "First light; put out the lamp for the flowers"],
                      ].map(([time, msg]) => (
                        <li key={time} className="nocturne-text">
                          <span className="nocturne-cap">{time}</span> {msg}
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
            sub="One brass line draws the whole garden."
          />
          <div className="nocturne-grid">
            <Panel id="typography" title="Typography" meta="TYP" wide>
              <div className="nocturne-stack">
                <h2 className="nocturne-h1">The Night Garden</h2>
                <h3 className="nocturne-h2">
                  At midnight the brass lamps light one by one
                </h3>
                <span className="nocturne-h3">Section Sub-Label</span>
                <p className="nocturne-text">
                  Body text is Noto Serif. Values and codes are struck in a typewriter
                  face — the ledger hand of the night register.
                </p>
                <span className="nocturne-cap">Field Caption · 217</span>
              </div>
            </Panel>

            <Panel id="separator" title="Separator" meta="SEP">
              <div className="nocturne-stack">
                <span className="nocturne-cap">Plain rule</span>
                <Separator />
                <span className="nocturne-cap">Labelled</span>
                <Separator label="Second bed" />
                <span className="nocturne-cap">Vertical</span>
                <div className="nocturne-row">
                  <span className="nocturne-text">Lamp</span>
                  <Separator orientation="vertical" />
                  <span className="nocturne-text">Mist</span>
                  <Separator orientation="vertical" />
                  <span className="nocturne-text">Dew</span>
                </div>
              </div>
            </Panel>
            <Panel id="panel" title="Panel" meta="PNL">
              <p className="nocturne-text nocturne-panel-note">
                The brass frame that wraps every section: hairline edging, a wine plaque,
                corner sprays — nesting all the way down.
              </p>
              <Panel title="Nested Frame" meta="SUB">
                <span className="nocturne-cap">A frame within a frame</span>
              </Panel>
            </Panel>
          </div>

          <GroupRule
            id="signature"
            label="Signature"
            sub="One bead of light, kept till dawn."
          />
          <div className="nocturne-grid">
            <Panel id="loader" title="Loader" meta="LDR" wide>
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
      <span className="nocturne-marker nocturne-grouprule__marker">
        <FlowerIcon />
      </span>
      <h2 className="nocturne-h2 nocturne-grouprule__label">{label}</h2>
      <span className="nocturne-cap nocturne-grouprule__sub">{sub}</span>
      <span className="nocturne-grouprule__line" />
    </div>
  );
}
