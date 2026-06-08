import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import {
  Accordion,
  AlertDialog,
  AlertDialogClose,
  Autocomplete,
  Avatar,
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
  ToolbarSeparator,
  Tooltip,
  useToast,
  type NavMenuItem,
} from "./components";
import {
  BoltIcon,
  CheckIcon,
  CopyIcon,
  SearchIcon,
  SignalIcon,
  TrashIcon,
  XIcon,
} from "./components/icons";
import "./App.css";

/* ---- Sidebar index config (lists every control) ---- */
const SECTIONS: { group: string; items: [string, string, string][] }[] = [
  {
    group: "Input",
    items: [
      ["buttons", "Button", "BTN"],
      ["switch", "Switch", "SWT"],
      ["checkbox", "Checkbox", "CHK"],
      ["checkbox-group", "Checkbox Group", "CHG"],
      ["radio", "Radio Group", "RDO"],
      ["toggle", "Toggle Group", "TGL"],
      ["slider", "Slider", "SLD"],
      ["number", "Number Field", "NUM"],
      ["input", "Text Field", "TXT"],
      ["otp", "OTP Field", "OTP"],
      ["select", "Select", "SEL"],
      ["combobox", "Combobox", "CBX"],
      ["autocomplete", "Autocomplete", "ACP"],
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
    group: "Overlay",
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
      ["panel", "Panel", "PNL"],
      ["separator", "Separator", "SEP"],
    ],
  },
];

const SELECT_ITEMS = [
  { label: "R'lyeh — Fathom 001", value: "rlyeh" },
  { label: "Y'ha-nthlei", value: "yhanthlei" },
  { label: "Innsmouth Shoal", value: "innsmouth" },
  { label: "The Drowned Spire", value: "spire" },
  { label: "Carcosa [sealed]", value: "carcosa", disabled: true },
];

const COMBOBOX_ITEMS = [
  "Y'ha-nthlei",
  "Innsmouth Shoal",
  "The Drowned Spire",
  "Pnakotus",
  "Sarnath",
  "The Black Reef",
  "Leng Plateau",
  "Unknown Kadath",
  "The Sunless Sea",
  "Dagon's Trench",
  "Hydra Deep",
  "The Weeping Gate",
];

const AUTOCOMPLETE_ITEMS = [
  "Speak the Name",
  "Open the Way",
  "Light the Pharos",
  "Sound the Conch",
  "Raise the Wards",
  "Loose the Tide",
  "Mark the Sigil",
  "Don the Veil",
];

const CHECKGROUP_ITEMS = [
  { value: "relay", label: "Echo the deep" },
  { value: "encrypt", label: "Cipher the rite" },
  { value: "beacon", label: "Tide beacon" },
];

const NAVMENU_ITEMS: NavMenuItem[] = [
  {
    label: "Depths",
    links: [
      { label: "Drowned Cities", description: "Sunken capitals & spires" },
      { label: "The Trenches", description: "Lightless abyssal cuts" },
      { label: "Black Reefs", description: "Coral cathedrals" },
      { label: "Tide Wells", description: "Springs of the deep" },
    ],
  },
  {
    label: "Rites",
    links: [
      { label: "Invocation", description: "Calling the dreaming" },
      { label: "Wards", description: "Sigils against the dark" },
      { label: "Auguries", description: "Reading the tides" },
      { label: "Communion", description: "Voices beneath the water" },
    ],
  },
  { label: "Codex", href: "#navmenu" },
];

const preventDemoNavigation = (event: MouseEvent<HTMLAnchorElement>) => {
  event.preventDefault();
};

const TAB_ITEMS = [
  {
    value: "omens",
    label: "Omens",
    content: (
      <div className="demo-row">
        <Badge tone="success" dot>
          Tide Rising
        </Badge>
        <Badge tone="primary" dot>
          Wards Set
        </Badge>
        <Badge tone="warning" dot>
          Fathom 52
        </Badge>
        <Badge tone="danger" dot>
          Seal 34%
        </Badge>
      </div>
    ),
  },
  {
    value: "cult",
    label: "Cult",
    content: (
      <div className="demo-row">
        <Avatar fallback="DG" status="online" />
        <Avatar fallback="HY" status="busy" />
        <Avatar fallback="NL" status="away" />
        <Avatar fallback="—" status="offline" />
      </div>
    ),
  },
  {
    value: "dives",
    label: "Dives",
    content: (
      <p style={{ margin: 0, color: "var(--abyss-text-dim)", lineHeight: 1.7 }}>
        <code>04:12:07</code> · descent began at 99.4 fathoms
        <br />
        <code>04:12:31</code> · sigil answered — Y'ha-nthlei
        <br />
        <code>04:13:02</code> · the water holds its breath
      </p>
    ),
  },
];

const ACCORDION_ITEMS = [
  {
    value: "a1",
    title: "The Sunken Choir",
    content:
      "Voices carry through the black water in a key no living throat can hold. Listen past 0.42 fathoms and the song begins to answer back.",
  },
  {
    value: "a2",
    title: "Charts of the Deep",
    content:
      "Soundings taken against 1,204 drowned beacons. The trench drifts; corrections hold within 0.0003 leagues before the floor moves again.",
  },
  {
    value: "a3",
    title: "The Dreaming",
    content:
      "It does not sleep so much as wait. Pressure nominal, salt saturation rising, the dreamer's pulse measured once every long tide.",
  },
];

function Clock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const t = now.toTimeString().slice(0, 8);
  return <span className="abyss-clock">{t} TIDE</span>;
}

const SHIP_LOG = [
  { t: "08:42:01", m: "Pressure nominal at 412 fathoms" },
  { t: "08:41:55", m: "Ward sigils retuned to the third key" },
  { t: "08:40:12", m: "Movement in the trench — cleared, reef 7-G" },
  { t: "08:39:03", m: "Descent cycle initiated" },
  { t: "08:37:48", m: "Hull groan sealed, lower deck 4" },
  { t: "08:36:20", m: "Conch answered from the Black Reef" },
  { t: "08:35:01", m: "Air bells holding at 98% of the breath" },
  { t: "08:33:44", m: "Sigil lock acquired — Y'ha-nthlei" },
  { t: "08:32:10", m: "Pressure array woke and listened" },
  { t: "08:30:55", m: "Lantern oil rerouted to the forward bells" },
  { t: "08:29:31", m: "Roll called, 47 souls aboard" },
];

function AccessCodeField() {
  // Error clears once the code is valid (≥ 6 chars) — not a static red label.
  const [code, setCode] = useState("");
  const touched = code.length > 0;
  const valid = code.length >= 6;
  return (
    <Field
      label="Cipher Key"
      placeholder="Six syllables"
      value={code}
      onChange={(e) => setCode(e.currentTarget.value)}
      error={touched && !valid ? "The cipher is incomplete" : undefined}
    />
  );
}

function ToolbarDemo() {
  const [view, setView] = useState<"chart" | "reef" | "deep">("chart");
  const [live, setLive] = useState(true);
  return (
    <Toolbar aria-label="Rite toolbar">
      <ToolbarGroup>
        <ToolbarButton aria-label="Sound">
          <SearchIcon />
        </ToolbarButton>
        <ToolbarButton aria-label="Invoke">
          <BoltIcon />
        </ToolbarButton>
        <ToolbarButton aria-label="Echo">
          <CopyIcon />
        </ToolbarButton>
        <ToolbarButton aria-label="Banish">
          <TrashIcon />
        </ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup>
        {(["chart", "reef", "deep"] as const).map((v) => (
          <ToolbarButton key={v} active={view === v} onClick={() => setView(v)}>
            <span className="demo-toolbar__label">{v.toUpperCase()}</span>
          </ToolbarButton>
        ))}
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarButton active={live} onClick={() => setLive((b) => !b)}>
        <SignalIcon />
        <span className="demo-toolbar__label">TIDE</span>
      </ToolbarButton>
    </Toolbar>
  );
}

function ProgressDemo() {
  const [val, setVal] = useState(24);
  useEffect(() => {
    const id = setInterval(() => {
      setVal((v) => (v >= 100 ? 8 : v + 4));
    }, 900);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="demo-stack">
      <Progress label="Descent" value={val} />
      <Progress label="Tide Pull" value={67} />
      <Progress label="Ward Sync" value={100} />
      <Progress label="Sounding…" showValue={false} value={null} />
    </div>
  );
}

function FormDemo() {
  const { add } = useToast();
  return (
    <Form
      onFormSubmit={() =>
        add({
          title: "Sent Down",
          description: "The words sank to the deep.",
          type: "success",
        })
      }
    >
      <Field label="Acolyte Mark" name="op" defaultValue="DG-7" />
      <Field label="Cipher Key" name="code" placeholder="••••••" />
      <div className="abyss-form__row">
        <Button type="submit">Send Down</Button>
      </div>
    </Form>
  );
}

function ToastDemo() {
  const { add } = useToast();
  return (
    <div className="demo-row">
      <Button
        size="sm"
        variant="ghost"
        onClick={() =>
          add({
            title: "A Whisper",
            description: "Something answered from the Black Reef.",
          })
        }
      >
        Info
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() =>
          add({
            title: "Surfaced",
            description: "Returned from Y'ha-nthlei with the tide.",
            type: "success",
          })
        }
      >
        Success
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() =>
          add({
            title: "Hull Groan",
            description: "Pressure fractures along the lower deck.",
            type: "warning",
          })
        }
      >
        Warning
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() =>
          add({
            title: "Breach",
            description: "Black water in the hold — the seal is failing.",
            type: "danger",
          })
        }
      >
        Alert
      </Button>
    </div>
  );
}

function Demo() {
  // Staggered scroll-reveal for showcase panels. Gated by adding .abyss-reveal
  // so the page still renders fully if JS/IntersectionObserver is unavailable.
  useEffect(() => {
    const grid = document.querySelector(".abyss-grid");
    if (!grid || typeof IntersectionObserver === "undefined") return;
    grid.classList.add("abyss-reveal");
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
    grid.querySelectorAll(".abyss-section").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="abyss-app">
      <header className="abyss-header">
        <div className="abyss-logo">
          <span className="abyss-logo__mark">
            <BoltIcon />
          </span>
          <div>
            <div className="abyss-logo__text">
              AB<b>YSS</b>
            </div>
            <div className="abyss-logo__sub">克苏鲁 · 溺城 · BASE UI</div>
          </div>
        </div>
        <NavigationMenu items={NAVMENU_ITEMS} />
        <div className="abyss-header__status">
          <Badge tone="success" dot>
            Awake
          </Badge>
          <Badge tone="primary">v0.1.0</Badge>
          <Clock />
        </div>
      </header>

      <div className="abyss-shell">
        <aside className="abyss-sidebar">
          {SECTIONS.map((sec) => (
            <nav className="abyss-sidebar__group" key={sec.group}>
              <p className="abyss-sidebar__group-title">{sec.group}</p>
              {sec.items.map(([id, name, code]) => (
                <a className="abyss-sidebar__link" href={`#${id}`} key={id}>
                  {name}
                  <span>{code}</span>
                </a>
              ))}
            </nav>
          ))}
        </aside>

        <main className="abyss-main">
          <section className="abyss-hero">
            <div className="abyss-hero__eyebrow">
              <BoltIcon /> Drowned Archive · 37 Controls
            </div>
            <h1>
              A <b>drowned</b> interface kit
              <br />
              raised from Base UI
            </h1>
            <p>
              Accessible, unstyled Base UI primitives sunk into a deep-sea aesthetic —
              eroded seal-frames, bioluminescent glow, and slow tidal motion. Every
              control lives in its own folder and rides on portable
              <code> --abyss-* </code> CSS variables.
            </p>
            <div className="abyss-hero__stats">
              <div className="abyss-hero__stat">
                <b>37</b>
                <span>Controls</span>
              </div>
              <div className="abyss-hero__stat">
                <b>1</b>
                <span>Sigil File</span>
              </div>
              <div className="abyss-hero__stat">
                <b>0</b>
                <span>Runtime Deps</span>
              </div>
              <div className="abyss-hero__stat">
                <b>A11y</b>
                <span>Base UI Core</span>
              </div>
            </div>
            <div className="abyss-hero__reticle" aria-hidden="true">
              <span className="abyss-hero__ring abyss-hero__ring--1" />
              <span className="abyss-hero__ring abyss-hero__ring--2" />
              <span className="abyss-hero__ring abyss-hero__ring--3" />
            </div>
          </section>

          <div className="abyss-grid">
            <div className="abyss-grid__group">
              <span className="abyss-grid__group-title">Input</span>
            </div>
            <div className="abyss-section span-2" id="buttons">
              <Panel title="Button" meta="BTN" scan>
                <div className="demo-stack">
                  <div className="demo-row">
                    <Button icon={<BoltIcon />}>Invoke</Button>
                    <Button variant="secondary">Bind</Button>
                    <Button variant="danger">Banish</Button>
                    <Button variant="ghost">Dormant</Button>
                    <Button disabled>Sealed</Button>
                  </div>
                  <Separator />
                  <div className="demo-row">
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                  </div>
                  <Separator />
                  <div className="demo-row">
                    <Button variant="icon" aria-label="Copy">
                      <CopyIcon />
                    </Button>
                    <Button variant="icon" aria-label="Delete">
                      <TrashIcon />
                    </Button>
                    <Button variant="icon" disabled aria-label="Locked">
                      <CheckIcon />
                    </Button>
                    <Button variant="icon-ghost" aria-label="Search">
                      <SearchIcon />
                    </Button>
                    <Button variant="icon-ghost" aria-label="Close">
                      <XIcon />
                    </Button>
                  </div>
                </div>
              </Panel>
            </div>

            <div className="abyss-section" id="switch">
              <Panel title="Switch" meta="SWT">
                <div className="demo-stack">
                  <div className="demo-spread">
                    <span className="demo-rowlabel">Ward Sigil</span>
                    <Switch defaultChecked aria-label="Ward Sigil" />
                  </div>
                  <div className="demo-spread">
                    <span className="demo-rowlabel">Deep Trance</span>
                    <Switch aria-label="Deep Trance" />
                  </div>
                  <div className="demo-spread">
                    <span className="demo-rowlabel">Sealed</span>
                    <Switch disabled defaultChecked aria-label="Sealed" />
                  </div>
                </div>
              </Panel>
            </div>

            <div className="abyss-section" id="checkbox">
              <Panel title="Checkbox" meta="CHK">
                <div className="demo-stack">
                  <Checkbox defaultChecked label="Cipher the rite" />
                  <Checkbox label="Walk unseen" />
                  <Checkbox disabled defaultChecked label="Beacon (sealed on)" />
                  <Checkbox disabled label="Warded (sealed off)" />
                </div>
              </Panel>
            </div>

            <div className="abyss-section" id="checkbox-group">
              <Panel title="Checkbox Group" meta="CHG">
                <div className="demo-stack">
                  <CheckboxGroup
                    parentLabel="All currents"
                    defaultValue={["relay"]}
                    items={CHECKGROUP_ITEMS}
                  />
                </div>
              </Panel>
            </div>

            <div className="abyss-section" id="radio">
              <Panel title="Radio Group" meta="RDO">
                <RadioGroup defaultValue="impulse">
                  <Radio value="impulse">Tidewalk</Radio>
                  <Radio value="warp">Deep Current</Radio>
                  <Radio value="jump">The Weeping Gate</Radio>
                  <Radio value="tow" disabled>
                    Drowned Path (sealed)
                  </Radio>
                </RadioGroup>
              </Panel>
            </div>

            <div className="abyss-section" id="toggle">
              <Panel title="Toggle Group" meta="TGL">
                <div className="demo-stack">
                  <ToggleGroup defaultValue={["map"]}>
                    <Toggle value="map">Chart</Toggle>
                    <Toggle value="grid">Reef</Toggle>
                    <Toggle value="scan">Deep</Toggle>
                  </ToggleGroup>
                  <ToggleGroup defaultValue={["shields", "weapons"]} multiple>
                    <Toggle value="shields">Wards</Toggle>
                    <Toggle value="weapons">Sigils</Toggle>
                    <Toggle value="sensors">Omens</Toggle>
                  </ToggleGroup>
                </div>
              </Panel>
            </div>

            <div className="abyss-section" id="slider">
              <Panel title="Slider" meta="SLD">
                <div className="demo-stack">
                  <Slider label="Descent" defaultValue={64} />
                  <Slider
                    label="Resonance"
                    defaultValue={40}
                    min={0}
                    max={100}
                    step={5}
                  />
                </div>
              </Panel>
            </div>

            <div className="abyss-section" id="number">
              <Panel title="Number Field" meta="NUM">
                <div className="demo-stack">
                  <span className="demo-tag">Fathom Mark</span>
                  <div className="demo-row">
                    <NumberField defaultValue={42} min={0} max={999} />
                    <NumberField defaultValue={7} min={0} max={12} step={1} />
                  </div>
                </div>
              </Panel>
            </div>

            <div className="abyss-section" id="input">
              <Panel title="Text Field" meta="TXT">
                <div className="demo-stack">
                  <Field
                    label="Sea-Name"
                    defaultValue="Drowned Lark"
                    placeholder="Speak your name"
                  />
                  <Input icon={<SearchIcon />} placeholder="Search the codex…" />
                  <AccessCodeField />
                  <Field label="Sealed Verse" defaultValue="VERSE-SEALED" disabled />
                </div>
              </Panel>
            </div>

            <div className="abyss-section" id="otp">
              <Panel title="OTP Field" meta="OTP">
                <div className="demo-stack">
                  <span className="demo-tag">Litany code</span>
                  <OtpField length={6} splitAt={3} defaultValue="427" />
                </div>
              </Panel>
            </div>

            <div className="abyss-section" id="select">
              <Panel title="Select" meta="SEL">
                <div className="demo-stack">
                  <span className="demo-tag">Bearing</span>
                  <Select items={SELECT_ITEMS} defaultValue="yhanthlei" />
                </div>
              </Panel>
            </div>

            <div className="abyss-section" id="combobox">
              <Panel title="Combobox" meta="CBX">
                <div className="demo-stack">
                  <span className="demo-tag">Sound the depths</span>
                  <Combobox items={COMBOBOX_ITEMS} placeholder="Type to filter…" />
                </div>
              </Panel>
            </div>

            <div className="abyss-section" id="autocomplete">
              <Panel title="Autocomplete" meta="ACP">
                <div className="demo-stack">
                  <span className="demo-tag">Speak a rite</span>
                  <Autocomplete
                    items={AUTOCOMPLETE_ITEMS}
                    placeholder="Speak a rite…"
                  />
                </div>
              </Panel>
            </div>

            <div className="abyss-grid__group">
              <span className="abyss-grid__group-title">Forms</span>
            </div>
            <div className="abyss-section" id="fieldset">
              <Panel title="Fieldset" meta="FLD">
                <Fieldset legend="Acolyte Rites">
                  <Field label="Sea-Name" defaultValue="Drowned Lark" />
                  <Field label="Order" defaultValue="Esoteric-7" />
                </Fieldset>
              </Panel>
            </div>

            <div className="abyss-section" id="form">
              <Panel title="Form" meta="FRM">
                <FormDemo />
              </Panel>
            </div>

            <div className="abyss-grid__group">
              <span className="abyss-grid__group-title">Feedback</span>
            </div>
            <div className="abyss-section" id="progress">
              <Panel title="Progress" meta="PRG">
                <ProgressDemo />
              </Panel>
            </div>

            <div className="abyss-section" id="meter">
              <Panel title="Meter" meta="MTR">
                <div className="demo-stack">
                  <Meter label="Power Output" value={88} />
                  <Meter label="Coolant" value={52} tone="warning" />
                  <Meter label="Damage" value={23} tone="danger" />
                </div>
              </Panel>
            </div>

            <div className="abyss-section span-2" id="tabs">
              <Panel title="Tabs" meta="TAB">
                <Tabs items={TAB_ITEMS} />
              </Panel>
            </div>

            <div className="abyss-section span-2" id="accordion">
              <Panel title="Accordion" meta="ACC">
                <Accordion items={ACCORDION_ITEMS} defaultValue={["a1"]} />
              </Panel>
            </div>

            <div className="abyss-section span-2" id="collapsible">
              <Panel title="Collapsible" meta="CLP">
                <div className="demo-stack">
                  <Collapsible title="The Tide Log" defaultOpen>
                    All currents reading true. The last omen passed fourteen tides ago and
                    the water has been quiet since.
                  </Collapsible>
                  <Collapsible title="The Hold">
                    6 reliquaries · 2 sealed · 1 marked for rites at the next low tide.
                  </Collapsible>
                </div>
              </Panel>
            </div>

            <div className="abyss-grid__group">
              <span className="abyss-grid__group-title">Overlay</span>
            </div>
            <div className="abyss-section" id="tooltip">
              <Panel title="Tooltip" meta="TIP">
                <div className="demo-row">
                  <Tooltip content="Points down" side="top">
                    <Button variant="ghost">Top</Button>
                  </Tooltip>
                  <Tooltip content="Points up" side="bottom">
                    <Button variant="ghost">Bottom</Button>
                  </Tooltip>
                  <Tooltip content="Points right" side="left">
                    <Button variant="ghost">Left</Button>
                  </Tooltip>
                  <Tooltip content="Points left" side="right">
                    <Button variant="ghost">Right</Button>
                  </Tooltip>
                </div>
              </Panel>
            </div>

            <div className="abyss-section" id="popover">
              <Panel title="Popover" meta="POP">
                <Popover
                  trigger={<Button variant="ghost">The Conch</Button>}
                  title="Third Key"
                >
                  Press it to your ear and the deep answers — a voice 94 fathoms down,
                  two long tides late. Click outside or ✕ to silence it.
                </Popover>
              </Panel>
            </div>

            <div className="abyss-section" id="preview">
              <Panel title="Preview Card" meta="PVW">
                <div className="demo-stack">
                  <span className="demo-tag">Hover the sea-name</span>
                  <div>
                    Reef warden{" "}
                    <PreviewCard
                      trigger={
                        <a
                          className="demo-link"
                          href="#preview"
                          onClick={(e) => e.preventDefault()}
                        >
                          @drowned_keeper
                        </a>
                      }
                    >
                      <div className="demo-pcard__head">
                        <Avatar
                          src="https://i.pravatar.cc/96?img=15"
                          alt="The Keeper"
                          status="online"
                        />
                        <div>
                          <div className="demo-pcard__name">The Keeper</div>
                          <div className="demo-pcard__handle">
                            Warden of the Reef · Fathom 7
                          </div>
                        </div>
                      </div>
                      <p className="demo-pcard__bio">
                        Tends the wards at the trench mouth. 1,204 descents logged, and
                        every one came back up.
                      </p>
                      <div className="demo-pcard__stats">
                        <Badge tone="primary" dot>
                          Keeping Watch
                        </Badge>
                        <Badge tone="neutral">Rite A</Badge>
                      </div>
                    </PreviewCard>{" "}
                    keeps the watch.
                  </div>
                </div>
              </Panel>
            </div>

            <div className="abyss-section" id="menu">
              <Panel title="Menu" meta="MNU">
                <Menu trigger={<Button variant="ghost">Rites ▾</Button>}>
                  <MenuItem icon={<SearchIcon />} shortcut="⌘S">
                    Sound the Deep
                  </MenuItem>
                  <MenuItem icon={<BoltIcon />} shortcut="⌘P">
                    Mark a Bearing
                  </MenuItem>
                  <MenuItem icon={<CopyIcon />} shortcut="⌘D">
                    Echo
                  </MenuItem>
                  <MenuItem icon={<SignalIcon />} disabled>
                    Hail the Dark
                  </MenuItem>
                  <MenuSeparator />
                  <MenuItem icon={<TrashIcon />} shortcut="⌫" tone="danger">
                    Cast Overboard
                  </MenuItem>
                </Menu>
              </Panel>
            </div>

            <div className="abyss-section span-2" id="menubar">
              <Panel title="Menubar" meta="MBR">
                <Menubar>
                  <MenubarMenu label="File">
                    <MenuItem icon={<BoltIcon />} shortcut="⌘N">
                      New Rite
                    </MenuItem>
                    <MenuItem icon={<CopyIcon />} shortcut="⌘O">
                      Open Codex
                    </MenuItem>
                    <MenuSeparator />
                    <MenuItem icon={<TrashIcon />} tone="danger">
                      Cast Out
                    </MenuItem>
                  </MenubarMenu>
                  <MenubarMenu label="Edit">
                    <MenuItem shortcut="⌘Z">Undo</MenuItem>
                    <MenuItem shortcut="⇧⌘Z">Redo</MenuItem>
                  </MenubarMenu>
                  <MenubarMenu label="View">
                    <MenuItem icon={<SearchIcon />}>Chart</MenuItem>
                    <MenuItem icon={<CopyIcon />}>Reef View</MenuItem>
                    <MenuSub icon={<SignalIcon />} label="Soundings">
                      <MenuItem>Shallows</MenuItem>
                      <MenuItem>The Deeps</MenuItem>
                      <MenuItem>Pressure</MenuItem>
                      <MenuSeparator />
                      <MenuItem icon={<BoltIcon />}>Attune</MenuItem>
                    </MenuSub>
                  </MenubarMenu>
                </Menubar>
              </Panel>
            </div>

            <div className="abyss-section span-2" id="navmenu">
              <Panel title="Navigation Menu" meta="NAV">
                <NavigationMenu
                  items={NAVMENU_ITEMS}
                  onLinkClick={preventDemoNavigation}
                />
              </Panel>
            </div>

            <div className="abyss-section" id="context">
              <Panel title="Context Menu" meta="CTX">
                <ContextMenu
                  trigger={
                    <>
                      Right-click anywhere in these depths <kbd>⌃ click</kbd>
                    </>
                  }
                >
                  <MenuItem icon={<CopyIcon />} shortcut="⌘C">
                    Mark Bearing
                  </MenuItem>
                  <MenuItem icon={<SignalIcon />} shortcut="⌘B">
                    Sound Beacon
                  </MenuItem>
                  <MenuSeparator />
                  <MenuItem icon={<TrashIcon />} shortcut="⌫" tone="danger">
                    Banish Node
                  </MenuItem>
                </ContextMenu>
              </Panel>
            </div>

            <div className="abyss-section" id="dialog">
              <Panel title="Dialog" meta="DLG">
                <Dialog
                  trigger={<Button variant="secondary">Begin Descent</Button>}
                  title="Descend?"
                  description="Plotting a descent to Y'ha-nthlei. Once the tide takes you, there is no turning back."
                  footer={
                    <>
                      <DialogClose>Cancel</DialogClose>
                      <DialogClose variant="secondary">Descend</DialogClose>
                    </>
                  }
                >
                  <p style={{ margin: 0 }}>
                    Estimated descent: <b>14.2 fathoms</b>. All hands to the
                    bells.
                  </p>
                </Dialog>
              </Panel>
            </div>

            <div className="abyss-section" id="alert">
              <Panel title="Alert Dialog" meta="ALT">
                <AlertDialog
                  trigger={<Button variant="danger">Break the Seal</Button>}
                  title="Break the Seal?"
                  description="This looses what the seal has held since the first tide, and cannot be undone. Brace for the dark."
                  actions={
                    <>
                      <AlertDialogClose>Cancel</AlertDialogClose>
                      <AlertDialogClose variant="danger">Break</AlertDialogClose>
                    </>
                  }
                />
              </Panel>
            </div>

            <div className="abyss-section" id="drawer">
              <Panel title="Drawer" meta="DRW">
                <Drawer
                  side="right"
                  trigger={<Button variant="ghost">Open the Rites</Button>}
                  title="Ward Settings"
                  description="An edge-anchored panel sliding in from the deep — a Base UI Dialog positioned at the screen edge."
                  footer={<DialogClose variant="secondary">Bind</DialogClose>}
                >
                  <div className="demo-spread">
                    <span className="demo-rowlabel">Ward Sigil</span>
                    <Switch defaultChecked aria-label="Ward Sigil" />
                  </div>
                  <div className="demo-spread">
                    <span className="demo-rowlabel">Walk Unseen</span>
                    <Switch aria-label="Walk Unseen" />
                  </div>
                  <Slider label="Lantern Gain" defaultValue={72} />
                </Drawer>
              </Panel>
            </div>

            <div className="abyss-section" id="toast">
              <Panel title="Toast" meta="TST">
                <ToastDemo />
              </Panel>
            </div>

            <div className="abyss-grid__group">
              <span className="abyss-grid__group-title">Display</span>
            </div>
            <div className="abyss-section" id="avatar">
              <Panel title="Avatar" meta="AVT">
                <div className="demo-row">
                  <Avatar
                    src="https://i.pravatar.cc/96?img=12"
                    alt="Acolyte"
                    status="online"
                  />
                  <Avatar fallback="VK" status="busy" />
                  <Avatar fallback="R7" status="away" />
                  <Avatar fallback="ZX" size={56} status="online" />
                </div>
              </Panel>
            </div>

            <div className="abyss-section" id="badge">
              <Panel title="Badge" meta="BDG">
                <div className="demo-row">
                  <Badge tone="primary" dot>
                    Awake
                  </Badge>
                  <Badge tone="success">Holding</Badge>
                  <Badge tone="warning">Stirring</Badge>
                  <Badge tone="danger" dot>
                    Breach
                  </Badge>
                  <Badge tone="secondary">Ciphered</Badge>
                  <Badge tone="neutral">Dormant</Badge>
                </div>
              </Panel>
            </div>

            <div className="abyss-section" id="toolbar">
              <Panel title="Toolbar" meta="TBR">
                <ToolbarDemo />
              </Panel>
            </div>

            <div className="abyss-section" id="scroll">
              <Panel title="Scroll Area" meta="SCR">
                <ScrollArea maxHeight={200}>
                  <ol className="demo-log">
                    {SHIP_LOG.map((entry, i) => (
                      <li key={i}>
                        <span className="demo-log__t">{entry.t}</span>
                        <span className="demo-log__m">{entry.m}</span>
                      </li>
                    ))}
                  </ol>
                </ScrollArea>
              </Panel>
            </div>

            <div className="abyss-grid__group">
              <span className="abyss-grid__group-title">Foundations</span>
            </div>
            <div className="abyss-section" id="typography">
              <Panel title="Typography" meta="TYP">
                <div className="demo-col">
                  <p className="abyss-h1">R'lyeh Rises</p>
                  <p className="abyss-h2">The Drowned Choir</p>
                  <p className="abyss-h3">Soundings</p>
                  <p className="abyss-text">
                    The water holds — pressure steady at 98.4 fathoms across the lower
                    reach, and 1,204 lights drift in the dark below.
                  </p>
                  <span className="demo-tag">
                    .abyss-h1 / h2 / h3 · .abyss-text — style-only, any tag
                  </span>
                </div>
              </Panel>
            </div>

            <div className="abyss-section" id="panel">
              <Panel title="Panel" meta="PNL" scan>
                <p style={{ marginTop: 0, color: "var(--abyss-text-dim)" }}>
                  The seal-frame wrapping every section: an eroded octagonal border with
                  an optional bioluminescent tide-sweep.
                </p>
                <Panel title="Nested Seal" meta="SUB">
                  <span className="demo-tag">Composable to any depth</span>
                </Panel>
              </Panel>
            </div>

            <div className="abyss-section" id="separator">
              <Panel title="Separator" meta="SEP">
                <div className="demo-stack">
                  <span className="demo-tag">Plain</span>
                  <Separator />
                  <span className="demo-tag">Labelled</span>
                  <Separator label="Rite 7G" />
                  <span className="demo-tag">Vertical</span>
                  <div className="demo-row">
                    <span className="abyss-text">Reef A</span>
                    <Separator orientation="vertical" />
                    <span className="abyss-text">Reef B</span>
                    <Separator orientation="vertical" />
                    <span className="abyss-text">Reef C</span>
                  </div>
                </div>
              </Panel>
            </div>
          </div>

          <footer className="abyss-footer">
            ABYSS · built on @base-ui/react · theme via --abyss-* tokens ·{" "}
            {new Date().getFullYear()}
          </footer>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <Demo />
    </ToastProvider>
  );
}
