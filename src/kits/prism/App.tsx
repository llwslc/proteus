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
  Arc,
  Circle,
  CircleFill,
  Clock as ClockIcon,
  Close,
  Concentric,
  Copy,
  Diamond,
  Dot,
  Grid,
  Search,
  Square,
  SquareFill,
  Triangle,
  TriangleFill,
} from "./components/icons";

const NAV = [
  {
    label: "Workshop",
    links: [
      { label: "Composition", href: "#inputs", description: "Controls & primaries" },
      { label: "Readouts", href: "#feedback", description: "Bars & meters" },
      { label: "Surfaces", href: "#overlays", description: "Menus & dialogs" },
      { label: "Plates", href: "#display", description: "Marks & fittings" },
    ],
  },
  {
    label: "Catalog",
    links: [
      { label: "Elements", href: "#inputs", description: "37 controls" },
      { label: "The Grid", href: "#foundations", description: "Type & rule" },
      { label: "Forms", href: "#forms", description: "Bound fields" },
      { label: "Stencils", href: "#foundations", description: "Moulds & marks" },
    ],
  },
  { label: "Manual", href: "#hero" },
  {
    label: "Vault",
    disabled: true,
    links: [
      { label: "Master plates", href: "#display", description: "Locked for print" },
    ],
  },
];

const WEIGHTS = [
  { label: "Hairline", value: "hair" },
  { label: "Regular", value: "regular" },
  { label: "Thin", value: "thin" },
  { label: "Extra Light", value: "extralight" },
  { label: "Light", value: "light" },
  { label: "Book", value: "book" },
  { label: "Medium", value: "medium" },
  { label: "Semibold", value: "semibold" },
  { label: "Bold", value: "bold" },
  { label: "Extra Bold", value: "extrabold" },
  { label: "Heavy", value: "heavy" },
  { label: "Black", value: "black", disabled: true },
];
const WEIGHTS_SHORT = WEIGHTS.slice(0, 3);

const FORMS = [
  "Circle",
  "Triangle",
  "Square",
  "Rectangle",
  "Diagonal",
  "Grid",
  "Plane",
  "Axis",
  "Module",
  "Stencil",
  "Rule",
  { label: "Chevron", disabled: true },
];

const PIGMENTS = [
  "Ultramarine",
  "Vermilion",
  "Cadmium Yellow",
  "Ivory Black",
  "Lead White",
  "Cobalt",
  "Cerulean",
  "Ochre",
  "Carmine",
  "Viridian",
  "Umber",
  { label: "Sienna", disabled: true },
];

function Clock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return <span className="prism-clock">{now.toLocaleTimeString("en-GB")}</span>;
}

function HeroArt() {
  return (
    <svg className="prism-art" viewBox="0 0 200 200" aria-hidden="true">
      <rect className="prism-art__sq" x="26" y="44" width="90" height="90" />
      <circle className="prism-art__ci" cx="130" cy="72" r="42" />
      <path className="prism-art__tri" d="M54 170 130 170 92 104Z" />
      <line className="prism-art__bar" x1="22" y1="160" x2="178" y2="34" />
      <rect className="prism-art__spin" x="142" y="138" width="22" height="22" />
    </svg>
  );
}

function ProgressBars() {
  const [val, setVal] = useState(24);
  useEffect(() => {
    const id = setInterval(() => setVal((v) => (v >= 100 ? 8 : v + 4)), 900);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="prism-stack">
      <Progress label="Laying the grid" value={val} />
      <Progress label="Aligning modules" value={67} />
      <Progress label="Composition set" value={100} />
      <Progress label="Measuring planes…" showValue={false} value={null} />
    </div>
  );
}

function AccessKeyField() {
  const [code, setCode] = useState("");
  const valid = code.length >= 6;
  const touched = code.length > 0;
  return (
    <Field
      label="Access key"
      placeholder="6+ characters…"
      value={code}
      onChange={(e) => setCode(e.target.value)}
      error={touched && !valid ? "Access key too short" : undefined}
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
        if (String(values.code ?? "").length < 6) {
          setErrors({ code: "The registry rejected this key." });
          return;
        }
        setErrors({});
        add({
          title: "Filed",
          description: "Composition filed.",
          type: "success",
        });
      }}
    >
      <Field label="Composition" name="op" placeholder="Title…" />
      <Field label="Key" name="code" type="password" placeholder="Access key…" />
      <Button type="submit">Submit</Button>
    </Form>
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
    document.querySelectorAll(".prism-grid").forEach((grid) => {
      grid.classList.add("prism-reveal");
      for (const el of grid.children) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <div className="prism-app">
      <header className="prism-header">
        <div className="prism-logo">
          <svg className="prism-logo__mark" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="1" y="6" width="12" height="12" />
            <circle cx="17" cy="8" r="5" />
            <path d="M13 21 23 21 18 13Z" />
          </svg>
          <span className="prism-logo__text">
            PRI<span className="prism-logo__accent">SM</span>
          </span>
          <span className="prism-logo__sub">Bauhaus UI Kit</span>
        </div>
        <nav className="prism-header__nav">
          <NavigationMenu items={NAV} />
        </nav>
        <div className="prism-header__status">
          <Badge tone="success" dot>
            Composed
          </Badge>
          <ClockIcon className="prism-header__status-icon" aria-hidden="true" />
          <Clock />
        </div>
      </header>

      <div className="prism-shell">
        <aside className="prism-sidebar">
          {SECTIONS.map((sec) => (
            <nav className="prism-sidebar__group" key={sec.group}>
              <span className="prism-cap prism-sidebar__group-title">{sec.group}</span>
              {sec.items.map(([id, name, code]) => (
                <a key={id} href={`#${id}`} className="prism-sidebar__link">
                  <span>{name}</span>
                  <span className="prism-sidebar__meta">{code}</span>
                </a>
              ))}
            </nav>
          ))}
        </aside>

        <main className="prism-shell__main">
          <section className="prism-hero" id="hero">
            <div className="prism-hero__text">
              <span className="prism-cap prism-hero__eyebrow">
                Form &amp; Function · 37 Elements
              </span>
              <h1 className="prism-h1 prism-hero__title">
                A <span className="prism-h1--accent">constructed</span> interface kit
                <br />
                built from primary forms
              </h1>
              <p className="prism-text prism-hero__desc">
                Flat fields of red, yellow and blue, hard black strokes, the
                circle-triangle-square and a modular grid — a Bauhaus workshop ruled to
                the grid.
              </p>
              <p className="prism-text prism-hero__desc">
                Every control is its own folder, themed entirely through portable{" "}
                <code className="prism-hero__code">--prism-*</code> tokens.
              </p>
              <div className="prism-hero__stats">
                {[
                  ["37", "Elements"],
                  ["1", "Token File"],
                  ["0", "Extra Deps"],
                  ["A11y", "Built In"],
                ].map(([n, l]) => (
                  <div key={l} className="prism-hero__stat">
                    <span className="prism-hero__stat-n">{n}</span>
                    <span className="prism-cap">{l}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="prism-hero__visual">
              <HeroArt />
            </div>
          </section>

          <GroupRule
            id="inputs"
            label="Inputs"
            sub="controls & primaries"
            marker={<CircleFill />}
          />
          <div className="prism-grid">
            <div className="prism-section prism-section--wide" id="button">
              <Panel title="Button">
                <div className="prism-stack">
                  <div className="prism-row">
                    <Button icon={<Triangle />}>Compose</Button>
                    <Button variant="secondary">Preview</Button>
                    <Button variant="danger">Clear</Button>
                    <Button variant="ghost">Cancel</Button>
                    <Button disabled>Locked</Button>
                  </div>
                  <Separator />
                  <div className="prism-row">
                    <Button size="sm">Trim</Button>
                    <Button size="md">Set</Button>
                    <Button size="lg">Build</Button>
                  </div>
                  <Separator />
                  <div className="prism-row">
                    <Button variant="icon" aria-label="Duplicate">
                      <Copy />
                    </Button>
                    <Button variant="icon" aria-label="Snap to grid">
                      <Grid />
                    </Button>
                    <Button variant="icon" disabled aria-label="Locked">
                      <Square />
                    </Button>
                    <Button variant="icon-ghost" aria-label="Add circle">
                      <Circle />
                    </Button>
                    <Button variant="icon-ghost" aria-label="Add triangle">
                      <Triangle />
                    </Button>
                  </div>
                </div>
              </Panel>
            </div>

            <div className="prism-section" id="switch">
              <Panel title="Switch">
                <div className="prism-stack">
                  <label className="prism-row prism-row--between">
                    <span className="prism-cap">Snap to grid</span>
                    <Switch defaultChecked />
                  </label>
                  <label className="prism-row prism-row--between">
                    <span className="prism-cap">Show baseline</span>
                    <Switch />
                  </label>
                  <label className="prism-row prism-row--between">
                    <span className="prism-cap">Lock composition</span>
                    <Switch disabled defaultChecked />
                  </label>
                  <label className="prism-row prism-row--between">
                    <span className="prism-cap">Sealed plane</span>
                    <Switch disabled />
                  </label>
                </div>
              </Panel>
            </div>
            <div className="prism-section" id="toggle">
              <Panel title="Toggle Group">
                <div className="prism-stack">
                  <ToggleGroup defaultValue={["left"]}>
                    <Toggle value="left">Left</Toggle>
                    <Toggle value="center">Center</Toggle>
                    <Toggle value="right" disabled>
                      Right
                    </Toggle>
                  </ToggleGroup>
                  <ToggleGroup multiple defaultValue={["fill", "stroke", "frame"]}>
                    <Toggle value="fill">Fill</Toggle>
                    <Toggle value="stroke">Stroke</Toggle>
                    <Toggle value="grid">Grid</Toggle>
                    <Toggle value="frame" disabled>
                      Frame
                    </Toggle>
                  </ToggleGroup>
                </div>
              </Panel>
            </div>

            <div className="prism-section" id="checkbox">
              <Panel title="Checkbox">
                <div className="prism-stack">
                  <Checkbox defaultChecked label="Snap to grid" />
                  <Checkbox label="Show rulers" />
                  <Checkbox disabled defaultChecked label="Lock layer" />
                  <Checkbox disabled label="Hide plane" />
                </div>
              </Panel>
            </div>
            <div className="prism-section" id="checkbox-group">
              <Panel title="Checkbox Group">
                <div className="prism-stack">
                  <CheckboxGroup
                    defaultValue={["grid"]}
                    parentLabel="All guides"
                    items={[
                      { label: "Grid", value: "grid" },
                      { label: "Baseline", value: "baseline" },
                      { label: "Margins", value: "margins" },
                    ]}
                  />
                  <CheckboxGroup
                    defaultValue={["diag"]}
                    parentLabel="Locked guides"
                    disabled
                    items={[
                      { label: "Diagonals", value: "diag" },
                      { label: "Curves", value: "curves" },
                    ]}
                  />
                </div>
              </Panel>
            </div>

            <div className="prism-section" id="radio">
              <Panel title="Radio Group">
                <div className="prism-stack">
                  <span className="prism-cap">Alignment</span>
                  <RadioGroup defaultValue="left">
                    <Radio value="left">Left align</Radio>
                    <Radio value="center">Center</Radio>
                    <Radio value="justify">Justify</Radio>
                    <Radio value="optical" disabled>
                      Optical (offline)
                    </Radio>
                  </RadioGroup>
                  <span className="prism-cap">Kerning (locked)</span>
                  <RadioGroup disabled defaultValue="metric">
                    <Radio value="manual">Manual kerning</Radio>
                    <Radio value="metric">Metric (locked)</Radio>
                  </RadioGroup>
                </div>
              </Panel>
            </div>
            <div className="prism-section" id="select">
              <Panel title="Select">
                <div className="prism-stack">
                  <label className="prism-cap" htmlFor="sel-1">
                    Type weight
                  </label>
                  <Select
                    items={WEIGHTS}
                    placeholder="Weight"
                    defaultValue="regular"
                    id="sel-1"
                  />
                  <label className="prism-cap" htmlFor="sel-2">
                    Display weight
                  </label>
                  <Select items={WEIGHTS_SHORT} placeholder="Grade" id="sel-2" />
                  <label className="prism-cap" htmlFor="sel-3">
                    Archive weight
                  </label>
                  <Select
                    items={WEIGHTS_SHORT}
                    defaultValue="regular"
                    disabled
                    id="sel-3"
                  />
                </div>
              </Panel>
            </div>

            <div className="prism-section" id="combobox">
              <Panel title="Combobox">
                <div className="prism-stack">
                  <span className="prism-cap">Filter forms</span>
                  <Combobox
                    items={FORMS}
                    placeholder="Search forms…"
                    label="Filter forms"
                  />
                </div>
              </Panel>
            </div>
            <div className="prism-section" id="autocomplete">
              <Panel title="Autocomplete">
                <div className="prism-stack">
                  <span className="prism-cap">Pick a pigment</span>
                  <Autocomplete
                    items={PIGMENTS}
                    placeholder="Pigment…"
                    label="Pick a pigment"
                  />
                </div>
              </Panel>
            </div>

            <div className="prism-section" id="slider">
              <Panel title="Slider">
                <div className="prism-stack">
                  <Slider label="Column width" defaultValue={62} />
                  <Slider label="Gutter" defaultValue={40} disabled />
                  <Slider label="Ink density" defaultValue={75} showValue={false} />
                </div>
              </Panel>
            </div>
            <div className="prism-section" id="number">
              <Panel title="Number Field">
                <div className="prism-stack">
                  <label className="prism-cap" htmlFor="num-1">
                    Grid columns
                  </label>
                  <NumberField defaultValue={7} min={0} max={12} step={1} id="num-1" />
                  <label className="prism-cap" htmlFor="num-2">
                    Max columns
                  </label>
                  <NumberField defaultValue={12} min={0} max={12} step={1} id="num-2" />
                </div>
              </Panel>
            </div>

            <div className="prism-section" id="input">
              <Panel title="Text Field">
                <div className="prism-stack">
                  <Field
                    label="Composition name"
                    placeholder="Red Blue Yellow"
                    defaultValue="Red Blue Yellow"
                    description="Printed on the catalogue plate."
                  />
                  <Input
                    icon={<Search />}
                    placeholder="Search elements…"
                    aria-label="Search elements"
                  />
                  <AccessKeyField />
                  <Field label="Locked layer" defaultValue="BAUHAUS-1919" disabled />
                  <Field
                    label="Plate code"
                    defaultValue="BH•19??"
                    error="Code breaks the plate grammar."
                  />
                </div>
              </Panel>
            </div>
            <div className="prism-section" id="otp">
              <Panel title="OTP Field">
                <div className="prism-stack">
                  <span className="prism-cap">Access code</span>
                  <OtpField
                    length={6}
                    splitAt={3}
                    defaultValue="919"
                    label="Access code"
                  />
                  <span className="prism-cap">Sealed code</span>
                  <OtpField
                    length={6}
                    splitAt={3}
                    defaultValue="919"
                    mask
                    label="Sealed code"
                  />
                  <span className="prism-cap">Retired code</span>
                  <OtpField
                    length={6}
                    splitAt={3}
                    defaultValue="919"
                    disabled
                    label="Retired code"
                  />
                </div>
              </Panel>
            </div>
          </div>

          <GroupRule
            id="forms"
            label="Forms"
            sub="bound fields"
            marker={<SquareFill />}
          />
          <div className="prism-grid">
            <div className="prism-section" id="fieldset">
              <Panel title="Fieldset">
                <Fieldset legend="Designer">
                  <Field label="Name" defaultValue="László" />
                  <Field label="Studio" defaultValue="Dessau" />
                </Fieldset>
              </Panel>
            </div>
            <div className="prism-section" id="form">
              <Panel title="Form">
                <FormDemo />
              </Panel>
            </div>
          </div>

          <GroupRule
            id="feedback"
            label="Feedback"
            sub="bars & readouts"
            marker={<TriangleFill />}
          />
          <div className="prism-grid">
            <div className="prism-section" id="progress">
              <Panel title="Progress">
                <ProgressBars />
              </Panel>
            </div>
            <div className="prism-section" id="meter">
              <Panel title="Meter">
                <div className="prism-stack">
                  <Meter label="Ink coverage" value={88} />
                  <Meter label="Registration" value={70} tone="success" />
                  <Meter label="Margin balance" value={52} tone="warning" />
                  <Meter label="Overflow" value={23} tone="danger" />
                </div>
              </Panel>
            </div>

            <div className="prism-section prism-section--wide" id="tabs">
              <Panel title="Tabs">
                <Tabs
                  defaultValue="form"
                  items={[
                    {
                      value: "form",
                      label: "Form",
                      content: (
                        <p className="prism-text">
                          Circle, triangle, square — the three basic forms, flat and
                          unshaded.
                        </p>
                      ),
                    },
                    {
                      value: "function",
                      label: "Function",
                      content: (
                        <p className="prism-text">
                          Every element earns its place on the grid; nothing decorative,
                          nothing wasted.
                        </p>
                      ),
                    },
                    {
                      value: "archive",
                      label: "Archive",
                      content: (
                        <p className="prism-text">
                          Dessau, 1925: the workshop catalogue, pressed in red, yellow and
                          blue.
                        </p>
                      ),
                      disabled: true,
                    },
                  ]}
                />
              </Panel>
            </div>

            <div className="prism-section" id="accordion">
              <Panel title="Accordion">
                <div className="prism-stack">
                  <span className="prism-cap">One at a time</span>
                  <Accordion
                    defaultValue={["grid"]}
                    items={[
                      {
                        value: "grid",
                        title: "Grid",
                        content: "A modular hard grid governs every margin and column.",
                      },
                      {
                        value: "color",
                        title: "Color",
                        content:
                          "Three primaries plus black on warm paper — no tints, no gradients.",
                      },
                      {
                        value: "type",
                        disabled: true,
                        title: "Type",
                        content:
                          "Geometric sans throughout, heavy display for the headline.",
                      },
                    ]}
                  />
                  <span className="prism-cap">Open together</span>
                  <Accordion
                    openMultiple
                    defaultValue={["paper", "ratio"]}
                    items={[
                      {
                        value: "paper",
                        title: "Paper",
                        content: "Warm stock, uncoated — ink sits matte and honest.",
                      },
                      {
                        value: "ratio",
                        disabled: true,
                        title: "Ratio",
                        content: "Golden-section plates anchor the poster diagonals.",
                      },
                    ]}
                  />
                </div>
              </Panel>
            </div>
            <div className="prism-section" id="collapsible">
              <Panel title="Collapsible">
                <div className="prism-stack">
                  <Collapsible title="Build notes" defaultOpen>
                    <p className="prism-text">
                      Composition locked to the 8-column grid. Last revision aligned the
                      baseline.
                    </p>
                  </Collapsible>
                  <Collapsible title="Material list">
                    <p className="prism-text">
                      Two stencils, one straightedge, three pots of primary ink and a ream
                      of paper.
                    </p>
                  </Collapsible>
                  <Collapsible title="Master plates" disabled>
                    <p className="prism-text">
                      Locked for print. Request access from the workshop lead.
                    </p>
                  </Collapsible>
                  <Collapsible title="House rules" defaultOpen disabled>
                    <p className="prism-text">
                      The grid is law. Exceptions go through the workshop lead.
                    </p>
                  </Collapsible>
                </div>
              </Panel>
            </div>
          </div>

          <GroupRule
            id="overlays"
            label="Overlays"
            sub="menus & dialogs"
            marker={<Concentric />}
          />
          <div className="prism-grid">
            <div className="prism-section" id="tooltip">
              <Panel title="Tooltip">
                <div className="prism-row">
                  <Tooltip content="Align left" side="top">
                    <Button variant="ghost">Align</Button>
                  </Tooltip>
                  <Tooltip content="Distribute evenly" side="bottom">
                    <Button variant="ghost">Distribute</Button>
                  </Tooltip>
                  <Tooltip content="Group selection" side="left">
                    <Button variant="ghost">Group</Button>
                  </Tooltip>
                  <Tooltip content="Lock layer" side="right">
                    <Button variant="ghost">Lock</Button>
                  </Tooltip>
                </div>
              </Panel>
            </div>
            <div className="prism-section" id="popover">
              <Panel title="Popover">
                <Popover
                  trigger={<Button variant="ghost">Details</Button>}
                  title="Module A"
                >
                  Three planes aligned to the grid; one flagged for review on the next
                  pass.
                </Popover>
              </Panel>
            </div>

            <div className="prism-section prism-section--wide" id="preview">
              <Panel title="Preview Card">
                <div className="prism-stack">
                  <span className="prism-cap">Hover the designer</span>
                  <p className="prism-text">
                    Workshop master{" "}
                    <PreviewCard
                      trigger={
                        <a
                          href="#preview"
                          className="prism-link"
                          onClick={(e) => e.preventDefault()}
                        >
                          @laszlo
                        </a>
                      }
                    >
                      <div className="prism-preview__head">
                        <Avatar status="online">
                          <AvatarImage src="https://i.pravatar.cc/96?img=12" alt="" />
                          <AvatarFallback>LM</AvatarFallback>
                        </Avatar>
                        <span className="prism-preview__ident">
                          <span className="prism-h3 prism-preview__title">
                            László Moholy-Nagy
                          </span>
                          <span className="prism-preview__handle">@laszlo</span>
                        </span>
                      </div>
                      <p className="prism-text prism-preview__desc">
                        Master of the metal workshop. Light, photography and the
                        conviction that form follows the grid.
                      </p>
                      <div className="prism-preview__footer">
                        <Badge tone="primary" dot>
                          Master
                        </Badge>
                        <Badge tone="neutral">Dessau</Badge>
                      </div>
                    </PreviewCard>{" "}
                    set the catalogue.
                  </p>
                </div>
              </Panel>
            </div>

            <div className="prism-section" id="menu">
              <Panel title="Menu">
                <Menu trigger="Actions">
                  <MenuItem icon={<Copy />} shortcut="⌘D">
                    Duplicate
                  </MenuItem>
                  <MenuItem icon={<Grid />} shortcut="⌘L">
                    Align to grid
                  </MenuItem>
                  <MenuItem icon={<Dot />} shortcut="⌘R">
                    Distribute
                  </MenuItem>
                  <MenuItem icon={<Square />} disabled>
                    Rasterize
                  </MenuItem>
                  <MenuItem icon={<Grid />}>Group</MenuItem>
                  <MenuItem icon={<Dot />}>Lock layer</MenuItem>
                  <MenuItem icon={<Copy />}>Flip horizontal</MenuItem>
                  <MenuItem icon={<Diamond />}>Rotate 90°</MenuItem>
                  <MenuItem icon={<Grid />}>Snap to guide</MenuItem>
                  <MenuItem icon={<Arc />}>Outline stroke</MenuItem>
                  <MenuItem icon={<Copy />}>Merge shapes</MenuItem>
                  <MenuSeparator />
                  <MenuItem icon={<Close />} tone="danger">
                    Delete
                  </MenuItem>
                </Menu>
              </Panel>
            </div>
            <div className="prism-section" id="menubar">
              <Panel title="Menubar">
                <Menubar>
                  <MenubarMenu label="Object">
                    <MenuItem>Group</MenuItem>
                    <MenuItem>Ungroup</MenuItem>
                    <MenuItem disabled>Merge</MenuItem>
                    <MenuSeparator />
                    <MenuItem tone="danger">Delete</MenuItem>
                  </MenubarMenu>
                  <MenubarMenu label="Arrange">
                    <MenuItem shortcut="⌘]">Bring front</MenuItem>
                    <MenuItem shortcut="⌘[">Send back</MenuItem>
                  </MenubarMenu>
                  <MenubarMenu label="Align">
                    <MenuItem>Left edge</MenuItem>
                    <MenuItem>Right edge</MenuItem>
                    <MenuSub label="Distribute">
                      <MenuItem>Top</MenuItem>
                      <MenuItem>Middle</MenuItem>
                      <MenuItem>Bottom</MenuItem>
                      <MenuSeparator />
                      <MenuItem>Reset</MenuItem>
                    </MenuSub>
                  </MenubarMenu>
                </Menubar>
              </Panel>
            </div>

            <div className="prism-section" id="navmenu">
              <Panel title="Navigation Menu">
                <NavigationMenu items={NAV} onLinkClick={(e) => e.preventDefault()} />
              </Panel>
            </div>
            <div className="prism-section" id="context">
              <Panel title="Context Menu">
                <div className="prism-stack">
                  <ContextMenu
                    trigger={
                      <div className="prism-context__zone">
                        <span className="prism-cap">
                          Right-click the plane to open actions
                        </span>
                      </div>
                    }
                  >
                    <MenuItem shortcut="⌘I">Inspect</MenuItem>
                    <MenuItem shortcut="⌘D">Duplicate</MenuItem>
                    <MenuItem disabled>Detach</MenuItem>
                    <MenuSeparator />
                    <MenuItem tone="danger">Delete</MenuItem>
                  </ContextMenu>
                </div>
              </Panel>
            </div>

            <div className="prism-section" id="dialog">
              <Panel title="Dialog">
                <Dialog
                  trigger={<Button variant="secondary">Reset grid</Button>}
                  title="Reset composition"
                  description="This returns every element to the grid origin. Continue?"
                  actions={
                    <>
                      <DialogClose>Cancel</DialogClose>
                      <DialogClose variant="secondary">Reset</DialogClose>
                    </>
                  }
                >
                  <p className="prism-text">Elements: 12 · Off-grid: 3</p>
                </Dialog>
              </Panel>
            </div>
            <div className="prism-section" id="alert">
              <Panel title="Alert Dialog">
                <div className="prism-row">
                  <AlertDialog
                    tone="danger"
                    trigger={<Button variant="ghost">Clear canvas</Button>}
                    title="Clear the canvas?"
                    description="This deletes every element and cannot be undone."
                    actions={
                      <>
                        <AlertDialogClose>Hold</AlertDialogClose>
                        <AlertDialogClose variant="danger">Clear</AlertDialogClose>
                      </>
                    }
                  />
                  <AlertDialog
                    tone="warning"
                    trigger={<Button variant="ghost">Reset grid</Button>}
                    title="Reset the grid?"
                    description="Every element snaps back to the module. Confirm to reset."
                    actions={
                      <>
                        <AlertDialogClose>Hold</AlertDialogClose>
                        <AlertDialogClose variant="primary">Reset</AlertDialogClose>
                      </>
                    }
                  />
                  <AlertDialog
                    tone="primary"
                    trigger={<Button variant="ghost">Apply layout</Button>}
                    title="Apply this layout?"
                    description="The new composition replaces the current one."
                    actions={
                      <>
                        <AlertDialogClose>Hold</AlertDialogClose>
                        <AlertDialogClose variant="primary">Apply</AlertDialogClose>
                      </>
                    }
                  />
                </div>
              </Panel>
            </div>

            <div className="prism-section" id="drawer">
              <Panel title="Drawer">
                <div className="prism-row">
                  {(["top", "bottom", "left", "right"] as const).map((side) => (
                    <Drawer
                      key={side}
                      side={side}
                      trigger={
                        <Button variant="ghost">
                          {side[0].toUpperCase() + side.slice(1)}
                        </Button>
                      }
                      title="Layer settings"
                      description="Adjust how this layer sits on the grid."
                      actions={<DrawerClose variant="secondary">Close</DrawerClose>}
                    >
                      <label className="prism-row prism-row--between">
                        <span className="prism-cap">Snap to grid</span>
                        <Switch defaultChecked />
                      </label>
                      <label className="prism-row prism-row--between">
                        <span className="prism-cap">Show outline</span>
                        <Switch />
                      </label>
                      <Slider label="Opacity" defaultValue={50} />
                    </Drawer>
                  ))}
                </div>
              </Panel>
            </div>
            <div className="prism-section" id="toast">
              <Panel title="Toast">
                <div className="prism-row">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() =>
                      toast.add({ title: "Saved", description: "Composition saved." })
                    }
                  >
                    Notify
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      const id = toast.add({
                        title: "Aligned",
                        description: "All elements on the grid.",
                        type: "success",
                        actionProps: {
                          children: "Revert",
                          onClick: () => toast.close(id),
                        },
                      });
                    }}
                  >
                    Confirm
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() =>
                      toast.add({
                        title: "Off grid",
                        description: "Three elements off the baseline.",
                        type: "warning",
                      })
                    }
                  >
                    Warn
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() =>
                      toast.add({
                        title: "Overflow",
                        description: "Composition exceeds the frame.",
                        type: "danger",
                      })
                    }
                  >
                    Alarm
                  </Button>
                </div>
              </Panel>
            </div>
          </div>

          <GroupRule
            id="display"
            label="Display"
            sub="marks & fittings"
            marker={<SquareFill />}
          />
          <div className="prism-grid">
            <div className="prism-section" id="avatar">
              <Panel title="Avatar">
                <div className="prism-row">
                  <Avatar status="online">
                    <AvatarImage src="https://i.pravatar.cc/96?img=12" alt="" />
                    <AvatarFallback>LM</AvatarFallback>
                  </Avatar>
                  <Avatar size="sm" status="busy">
                    <AvatarFallback>TV</AvatarFallback>
                  </Avatar>
                  <Avatar status="away">
                    <AvatarFallback>JA</AvatarFallback>
                  </Avatar>
                  <Avatar size="lg" status="offline">
                    <AvatarFallback>WK</AvatarFallback>
                  </Avatar>
                </div>
              </Panel>
            </div>
            <div className="prism-section" id="badge">
              <Panel title="Badge">
                <div className="prism-row">
                  <Badge tone="primary" dot>
                    Primary
                  </Badge>
                  <Badge tone="success">Aligned</Badge>
                  <Badge tone="warning">Off grid</Badge>
                  <Badge tone="danger" dot>
                    Overflow
                  </Badge>
                  <Badge tone="secondary">Ink</Badge>
                  <Badge tone="neutral">Draft</Badge>
                </div>
              </Panel>
            </div>

            <div className="prism-section" id="toolbar">
              <Panel title="Toolbar">
                <Toolbar aria-label="Tools">
                  <BaseToggleGroup
                    className="prism-toolbar__group"
                    defaultValue={["fill"]}
                    aria-label="Layers"
                  >
                    <ToolbarButton render={<BaseToggle />} value="fill">
                      Fill
                    </ToolbarButton>
                    <ToolbarButton render={<BaseToggle />} value="stroke">
                      Stroke
                    </ToolbarButton>
                    <ToolbarButton render={<BaseToggle />} value="grid">
                      Grid
                    </ToolbarButton>
                  </BaseToggleGroup>
                  <ToolbarSeparator />
                  <ToolbarGroup aria-label="Forms">
                    <ToolbarButton aria-label="Square">
                      <Square />
                    </ToolbarButton>
                    <ToolbarButton disabled aria-label="Circle">
                      <Circle />
                    </ToolbarButton>
                  </ToolbarGroup>
                  <ToolbarSeparator />
                  <ToolbarLink href="#toolbar">
                    <Dot />
                    Saved
                  </ToolbarLink>
                </Toolbar>
              </Panel>
            </div>
            <div className="prism-section" id="scroll">
              <Panel title="Scroll Area">
                <ScrollArea>
                  <ScrollAreaViewport>
                    <ScrollAreaContent>
                      <ol className="prism-scroll-list">
                        {[
                          ["09:00", "Ruled the grid"],
                          ["09:20", "Placed the square"],
                          ["09:35", "Set the circle"],
                          ["09:50", "Cut the triangle"],
                          ["10:10", "Aligned the baseline"],
                          ["10:30", "Pressed primary blue"],
                          ["10:55", "Pressed vermilion"],
                          ["11:20", "Pressed cadmium"],
                          ["11:45", "Inked the rules"],
                          ["12:10", "Checked the margins"],
                          ["12:35", "Pulled a proof"],
                          ["13:00", "Filed the plate"],
                        ].map(([time, msg]) => (
                          <li key={time} className="prism-text">
                            <span className="prism-cap">{time}</span> {msg}
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
          </div>

          <GroupRule
            id="foundations"
            label="Foundations"
            sub="type & rule"
            marker={<TriangleFill />}
          />
          <div className="prism-grid">
            <div className="prism-section prism-section--wide" id="typography">
              <Panel title="Typography">
                <div className="prism-stack">
                  <h2 className="prism-h1">Built from primary forms</h2>
                  <h3 className="prism-h2">Workshop headings</h3>
                  <span className="prism-h3">Section sub-label</span>
                  <p className="prism-text">
                    Body copy is set in a geometric sans, with monospace numerals for
                    every measurement and grid reference across the catalogue.
                  </p>
                  <span className="prism-cap">Field caption · 8-column grid</span>
                </div>
              </Panel>
            </div>

            <div className="prism-section" id="separator">
              <Panel title="Separator">
                <div className="prism-stack">
                  <span className="prism-cap">Plain</span>
                  <Separator />
                  <span className="prism-cap">Labelled</span>
                  <Separator label="Module II" align="start" />
                  <Separator label="Module II" />
                  <Separator label="Module II" align="end" />
                  <span className="prism-cap">Vertical</span>
                  <div className="prism-row">
                    <span className="prism-text">Red</span>
                    <Separator orientation="vertical" />
                    <span className="prism-text">Yellow</span>
                    <Separator orientation="vertical" />
                    <span className="prism-text">Blue</span>
                  </div>
                </div>
              </Panel>
            </div>
            <div className="prism-section" id="panel">
              <Panel title="Panel">
                <p className="prism-text prism-panel-note">
                  The bordered plate wrapping every section — a single flat field, a hard
                  black rule and a geometric mark. Composable to any depth.
                </p>
                <Panel title="Nested plate">
                  <span className="prism-cap">A plate within a plate</span>
                </Panel>
              </Panel>
            </div>
          </div>

          <GroupRule
            id="signature"
            label="Signature"
            sub="the build sequence"
            marker={<CircleFill />}
          />
          <div className="prism-grid">
            <div className="prism-section prism-section--wide" id="loader">
              <Panel title="Loader">
                <div className="demo-loader-stage">
                  <Loader />
                </div>
              </Panel>
            </div>
          </div>

          <footer className="prism-footer">
            <span className="prism-cap">
              PRISM · built on @base-ui/react · themed via --prism-* tokens ·{" "}
              {new Date().getFullYear()}
            </span>
          </footer>
        </main>
      </div>
    </div>
  );
}

function GroupRule({
  id,
  label,
  sub,
  marker,
}: {
  id: string;
  label: string;
  sub: string;
  marker: React.ReactNode;
}) {
  return (
    <div className="prism-grouprule" id={id}>
      <span className="prism-marker prism-grouprule__marker">{marker}</span>
      <h2 className="prism-h2 prism-grouprule__label">{label}</h2>
      <span className="prism-cap prism-grouprule__sub">{sub}</span>
      <span className="prism-grouprule__line" />
    </div>
  );
}
