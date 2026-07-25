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
    label: "夜园",
    links: [
      { label: "入园点灯", href: "#inputs", description: "园中令与手记" },
      { label: "观焰读温", href: "#feedback", description: "仪表与量器" },
      { label: "轻声一唤", href: "#overlays", description: "更铃与通信" },
      { label: "名牌勋记", href: "#display", description: "题签一览" },
    ],
  },
  {
    label: "夜册",
    links: [
      { label: "全部器物", href: "#inputs", description: "三十七株" },
      { label: "线与活字", href: "#foundations", description: "黄铜笔画" },
      { label: "登记书页", href: "#forms", description: "夜册册页" },
      { label: "台座画框", href: "#foundations", description: "铭牌之型" },
    ],
  },
  { label: "园规", href: "#hero" },
  {
    label: "毒草小间",
    disabled: true,
    links: [{ label: "封缄卷宗", href: "#display", description: "凭看守人印方启" }],
  },
];

const HOUSES = [
  { label: "南翼暖房", value: "south" },
  { label: "月光回廊", value: "corridor" },
  { label: "毒草小间", value: "poison" },
  { label: "垂枝亭", value: "pavilion" },
  { label: "北墙花圃", value: "north" },
  { label: "温室穹顶", value: "dome" },
  { label: "苔阶水房", value: "moss" },
  { label: "夜露井台", value: "well" },
  { label: "藤蔓长廊", value: "vine" },
  { label: "菌伞暗室", value: "fungus" },
  { label: "标本阁", value: "herbarium" },
  { label: "封缄花房", value: "sealed", disabled: true },
];
const HOUSES_SHORT = HOUSES.slice(0, 3);

const FLOWERS = [
  "颠茄",
  "夜来香",
  "月见草",
  "曼陀罗",
  "彼岸花",
  "夜合欢",
  "含羞草",
  "毒芹",
  "乌头",
  "铃兰",
  "月光菊",
  { label: "断肠草", disabled: true },
];

const KEEPERS = [
  "守灯人",
  "看守人",
  "拾露女",
  "夜巡者",
  "司花令",
  "更铃匠",
  "采药翁",
  "记册生",
  "温室匠",
  "垂枝客",
  "月下丞",
  { label: "封缄使", disabled: true },
];

function Clock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return <span className="nocturne-clock">{now.toLocaleTimeString("zh-CN")}</span>;
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
      <span className="nocturne-hand nocturne-lamp-stage__hand">
        花在夜里，替灯把光看住。
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
      <Progress label="月光蒸馏" value={val} />
      <Progress label="温针校读" value={67} />
      <Progress label="满釜封瓶" value={100} />
      <Progress label="静置中…" showValue={false} value={null} />
    </div>
  );
}

function SpecNameField() {
  const [code, setCode] = useState("");
  const valid = code.length >= 6;
  const touched = code.length > 0;
  return (
    <Field
      label="标本名"
      placeholder="六字以上…"
      value={code}
      onChange={(e) => setCode(e.target.value)}
      error={touched && !valid ? "标本名太短，记不进夜册。" : undefined}
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
    <div className="nocturne-app" lang="zh-CN">
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

          <GroupRule id="inputs" label="Inputs" sub="一钮一诺，落笔即存。" />
          <div className="nocturne-grid">
            <Panel id="button" title="Button" meta="BTN" wide>
              <div className="nocturne-stack">
                <div className="nocturne-row">
                  <Button icon={<SproutIcon />}>登记新芽</Button>
                  <Button variant="secondary">翻阅图版</Button>
                  <Button variant="danger">销去记录</Button>
                  <Button variant="ghost">悄声离开</Button>
                  <Button disabled>天未黑 · 不可开园</Button>
                </div>
                <Separator />
                <div className="nocturne-row">
                  <Button size="sm">短押</Button>
                  <Button size="md">标准</Button>
                  <Button size="lg">点灯</Button>
                </div>
                <Separator />
                <div className="nocturne-row">
                  <Button variant="icon" aria-label="誊抄">
                    <CopyIcon />
                  </Button>
                  <Button variant="icon" aria-label="钤印">
                    <KeyIcon />
                  </Button>
                  <Button variant="icon" disabled aria-label="封缄">
                    <XIcon />
                  </Button>
                  <Button variant="icon-ghost" aria-label="拾花">
                    <FlowerIcon />
                  </Button>
                  <Button variant="icon-ghost" aria-label="收露">
                    <DropIcon />
                  </Button>
                </div>
              </div>
            </Panel>

            <Panel id="switch" title="Switch" meta="SWT">
              <div className="nocturne-stack">
                <label className="nocturne-row nocturne-row--between">
                  <span className="nocturne-cap">暖灯长供</span>
                  <Switch defaultChecked />
                </label>
                <label className="nocturne-row nocturne-row--between">
                  <span className="nocturne-cap">夜雾轻洒</span>
                  <Switch />
                </label>
                <label className="nocturne-row nocturne-row--between">
                  <span className="nocturne-cap">露水自封</span>
                  <Switch disabled defaultChecked />
                </label>
                <label className="nocturne-row nocturne-row--between">
                  <span className="nocturne-cap">毒草上锁</span>
                  <Switch disabled />
                </label>
              </div>
            </Panel>
            <Panel id="toggle" title="Toggle Group" meta="TGL">
              <div className="nocturne-stack">
                <ToggleGroup defaultValue={["night"]}>
                  <Toggle value="night">夜巡</Toggle>
                  <Toggle value="dawn">晨收</Toggle>
                  <Toggle value="rest" disabled>
                    歇园
                  </Toggle>
                </ToggleGroup>
                <ToggleGroup multiple defaultValue={["lamp", "mist", "seal"]}>
                  <Toggle value="lamp">灯</Toggle>
                  <Toggle value="mist">雾</Toggle>
                  <Toggle value="dew">露</Toggle>
                  <Toggle value="seal" disabled>
                    印
                  </Toggle>
                </ToggleGroup>
              </div>
            </Panel>

            <Panel id="checkbox" title="Checkbox" meta="CHK">
              <div className="nocturne-stack">
                <Checkbox defaultChecked label="花期" />
                <Checkbox label="香气" />
                <Checkbox disabled defaultChecked label="毒性已录" />
                <Checkbox disabled label="封缄" />
              </div>
            </Panel>
            <Panel id="checkbox-group" title="Checkbox Group" meta="CHG">
              <div className="nocturne-stack">
                <CheckboxGroup
                  defaultValue={["bloom"]}
                  parentLabel="全项入册"
                  items={[
                    { label: "花期", value: "bloom" },
                    { label: "香气", value: "scent" },
                    { label: "毒性", value: "toxin" },
                  ]}
                />
                <CheckboxGroup
                  defaultValue={["orbit"]}
                  parentLabel="封缄项"
                  disabled
                  items={[
                    { label: "月相记录", value: "orbit" },
                    { label: "夜露采量", value: "dew" },
                  ]}
                />
              </div>
            </Panel>

            <Panel id="radio" title="Radio Group" meta="RDO">
              <div className="nocturne-stack">
                <span className="nocturne-cap">今夜当值花种</span>
                <RadioGroup defaultValue="belladonna">
                  <Radio value="belladonna">颠茄</Radio>
                  <Radio value="cestrum">夜来香</Radio>
                  <Radio value="oenothera">月见草</Radio>
                  <Radio value="sealed" disabled>
                    断肠草（未开放）
                  </Radio>
                </RadioGroup>
                <span className="nocturne-cap">灯焰模式（封缄）</span>
                <RadioGroup disabled defaultValue="steady">
                  <Radio value="flicker">随风摇曳</Radio>
                  <Radio value="steady">长明固定</Radio>
                </RadioGroup>
              </div>
            </Panel>
            <Panel id="select" title="Select" meta="SEL">
              <div className="nocturne-stack">
                <label className="nocturne-cap" htmlFor="sel-1">
                  今夜巡至
                </label>
                <Select
                  items={HOUSES}
                  placeholder="择一暖房…"
                  defaultValue="corridor"
                  id="sel-1"
                />
                <label className="nocturne-cap" htmlFor="sel-2">
                  次巡
                </label>
                <Select items={HOUSES_SHORT} placeholder="未择" id="sel-2" />
                <label className="nocturne-cap" htmlFor="sel-3">
                  封缄暖房
                </label>
                <Select
                  items={HOUSES_SHORT}
                  defaultValue="corridor"
                  disabled
                  id="sel-3"
                />
              </div>
            </Panel>

            <Panel id="combobox" title="Combobox" meta="CBX">
              <div className="nocturne-stack">
                <span className="nocturne-cap">检索花种</span>
                <Combobox
                  items={FLOWERS}
                  placeholder="花名…"
                  emptyText="园中无此株"
                  label="检索花种"
                />
              </div>
            </Panel>
            <Panel id="autocomplete" title="Autocomplete" meta="ACP">
              <div className="nocturne-stack">
                <span className="nocturne-cap">唤一位守园人</span>
                <Autocomplete
                  items={KEEPERS}
                  placeholder="名号…"
                  emptyText="园中无此人"
                  label="唤一位守园人"
                />
              </div>
            </Panel>

            <Panel id="slider" title="Slider" meta="SLD">
              <div className="nocturne-stack">
                <Slider label="灯焰高低" defaultValue={62} />
                <Slider label="夜雾浓度" defaultValue={40} disabled />
                <Slider label="露水收量" defaultValue={75} showValue={false} />
              </div>
            </Panel>
            <Panel id="number" title="Number Field" meta="NUM">
              <div className="nocturne-stack">
                <label className="nocturne-cap" htmlFor="num-1">
                  当值人数
                </label>
                <NumberField defaultValue={7} min={0} max={12} step={1} id="num-1" />
                <label className="nocturne-cap" htmlFor="num-2">
                  当值上限
                </label>
                <NumberField defaultValue={12} min={0} max={12} step={1} id="num-2" />
              </div>
            </Panel>

            <Panel id="input" title="Text Field" meta="TXT">
              <div className="nocturne-stack">
                <Field
                  label="园圃名"
                  placeholder="颠茄夜园"
                  defaultValue="颠茄夜园"
                  description="夜册以此名登记入档。"
                />
                <Input
                  icon={<SearchIcon />}
                  placeholder="检索标本…"
                  aria-label="检索标本"
                />
                <SpecNameField />
                <Field label="已封缄" defaultValue="夜册 217" disabled />
                <Field
                  label="标本编号"
                  defaultValue="夜册 2１7"
                  error="含不可入册的字符。"
                />
              </div>
            </Panel>
            <Panel id="otp" title="OTP Field" meta="OTP">
              <div className="nocturne-stack">
                <span className="nocturne-cap">入园暗记</span>
                <OtpField length={6} splitAt={3} defaultValue="217" label="入园暗记" />
                <span className="nocturne-cap">幽缄暗记</span>
                <OtpField
                  length={6}
                  splitAt={3}
                  defaultValue="217"
                  mask
                  label="幽缄暗记"
                />
                <span className="nocturne-cap">失效暗记</span>
                <OtpField
                  length={6}
                  splitAt={3}
                  defaultValue="217"
                  disabled
                  label="失效暗记"
                />
              </div>
            </Panel>
          </div>

          <GroupRule id="forms" label="Forms" sub="夜册登记，笔笔在案。" />
          <div className="nocturne-grid">
            <Panel id="fieldset" title="Fieldset" meta="FLD">
              <Fieldset legend="守园人">
                <Field label="名号" defaultValue="守灯人" />
                <Field label="当值" defaultValue="南翼暖房" />
              </Fieldset>
            </Panel>
            <Panel id="form" title="Form" meta="FRM">
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  toast.add({
                    title: "已入册",
                    description: "夜册收讫，标本已归档。",
                    type: "success",
                  });
                }}
              >
                <Field label="标本名" placeholder="如：颠茄 · 亥时初绽" />
                <Field label="入园暗记" type="password" placeholder="暗记…" />
                <Button type="submit" variant="primary">
                  登记入册
                </Button>
              </Form>
            </Panel>
          </div>

          <GroupRule id="feedback" label="Feedback" sub="焰高焰低，一望便知。" />
          <div className="nocturne-grid">
            <Panel id="progress" title="Progress" meta="PRG">
              <DistillBars />
            </Panel>
            <Panel id="meter" title="Meter" meta="MTR">
              <div className="nocturne-stack">
                <Meter label="暖房温度" value={88} />
                <Meter label="花开进度" value={70} tone="success" />
                <Meter label="夜露损耗" value={52} tone="warning" />
                <Meter label="毒性浓度" value={23} tone="danger" />
              </div>
            </Panel>

            <Panel id="tabs" title="Tabs" meta="TAB" wide>
              <Tabs
                defaultValue="belladonna"
                items={[
                  {
                    value: "belladonna",
                    label: "颠茄",
                    content: (
                      <p className="nocturne-text">
                        本园以它命名。紫黑花冠垂如小钟，浆果亮得不怀好意；美人与毒物同名，是茄科给夜里人的第一课。
                      </p>
                    ),
                  },
                  {
                    value: "cestrum",
                    label: "夜来香",
                    content: (
                      <p className="nocturne-text">
                        白日装作寻常灌木，入夜香气便漫过半座园子。看守人拿它当更鼓：香到浓时，是子时。
                      </p>
                    ),
                  },
                  {
                    value: "oenothera",
                    label: "月见草",
                    content: (
                      <p className="nocturne-text">
                        只肯对月亮开花的性子，园里数它脾气最好。月圆前后开得最勤，记录页也写得最满。
                      </p>
                    ),
                    disabled: true,
                  },
                ]}
              />
            </Panel>

            <Panel id="accordion" title="Accordion" meta="ACC">
              <div className="nocturne-stack">
                <span className="nocturne-cap">一次只开一册</span>
                <Accordion
                  defaultValue={["duty"]}
                  items={[
                    {
                      value: "duty",
                      title: "当值",
                      content: "子夜零时点灯，从南翼巡到垂枝亭，一盏不落。",
                    },
                    {
                      value: "register",
                      title: "入册",
                      content: "落笔即存档，编入《夜册》卷七，标本号顺次往下。",
                    },
                    {
                      value: "seal",
                      disabled: true,
                      title: "封缄",
                      content: "毒草小间凭看守人印方可入，记了就别再用手碰。",
                    },
                  ]}
                />
                <span className="nocturne-cap">可同时展开</span>
                <Accordion
                  openMultiple
                  defaultValue={["lamp", "vow"]}
                  items={[
                    {
                      value: "lamp",
                      title: "灯房",
                      content: "整夜供一豆铜色的火，焰拨高一分，温针便挪一寸。",
                    },
                    {
                      value: "vow",
                      disabled: true,
                      title: "园誓",
                      content: "天将明，请替花把灯熄了。这是夜园的头一条。",
                    },
                  ]}
                />
              </div>
            </Panel>
            <Panel id="collapsible" title="Collapsible" meta="CLP">
              <div className="nocturne-stack">
                <Collapsible title="夜巡手记" defaultOpen>
                  <p className="nocturne-text">
                    连夜巡园的记录，寅时前封瓶，迟了露水就散。
                  </p>
                </Collapsible>
                <Collapsible title="灯焰记录">
                  <p className="nocturne-text">
                    灯芯拨到三分，足够看清叶脉，不惊动收拢的花。
                  </p>
                </Collapsible>
                <Collapsible title="封缄卷宗" disabled>
                  <p className="nocturne-text">凭看守人印方启，进门先屏一口气。</p>
                </Collapsible>
                <Collapsible title="园规" defaultOpen disabled>
                  <p className="nocturne-text">天将明，请替花把灯熄了，封缄掲示中。</p>
                </Collapsible>
              </div>
            </Panel>
          </div>

          <GroupRule id="overlays" label="Overlays" sub="轻声一唤，支应即来。" />
          <div className="nocturne-grid">
            <Panel id="tooltip" title="Tooltip" meta="TIP">
              <div className="nocturne-row">
                <Tooltip content="拨高灯焰" side="top">
                  <Button variant="ghost">拨焰</Button>
                </Tooltip>
                <Tooltip content="洒一层夜雾" side="bottom">
                  <Button variant="ghost">夜雾</Button>
                </Tooltip>
                <Tooltip content="收一盏露水" side="left">
                  <Button variant="ghost">收露</Button>
                </Tooltip>
                <Tooltip content="钤看守人印" side="right">
                  <Button variant="ghost">钤印</Button>
                </Tooltip>
              </div>
            </Panel>
            <Panel id="popover" title="Popover" meta="POP">
              <Popover
                trigger={<Button variant="ghost">南翼近况</Button>}
                title="南翼暖房"
              >
                茄属旧族的祖宅，常年酒红帷幔。今夜颠茄当值，子时前后开得最盛。
              </Popover>
            </Panel>

            <Panel id="preview" title="Preview Card" meta="PVW" wide>
              <div className="nocturne-stack">
                <span className="nocturne-cap">悬停守灯人</span>
                <p className="nocturne-text">
                  今夜夜巡由{" "}
                  <PreviewCard
                    trigger={
                      <a
                        href="#preview"
                        className="nocturne-link"
                        onClick={(e) => e.preventDefault()}
                      >
                        @守灯人
                      </a>
                    }
                  >
                    <div className="nocturne-preview__head">
                      <Avatar status="online">
                        <AvatarImage src="https://i.pravatar.cc/96?img=32" alt="" />
                        <AvatarFallback>守</AvatarFallback>
                      </Avatar>
                      <span className="nocturne-preview__ident">
                        <span className="nocturne-h3 nocturne-preview__title">
                          守灯人
                        </span>
                        <span className="nocturne-preview__handle">@keeper</span>
                      </span>
                    </div>
                    <p className="nocturne-text nocturne-preview__desc">
                      提一盏铜灯，替花把光看到天明。口癖是「让花自己待一会儿」。
                    </p>
                    <div className="nocturne-preview__footer">
                      <Badge tone="primary" dot>
                        亥时三刻
                      </Badge>
                      <Badge tone="neutral">南翼暖房</Badge>
                    </div>
                  </PreviewCard>{" "}
                  执灯。
                </p>
              </div>
            </Panel>

            <Panel id="menu" title="Menu" meta="MNU">
              <Menu trigger="园中令">
                <MenuItem icon={<CopyIcon />} shortcut="⌘D">
                  誊抄一份
                </MenuItem>
                <MenuItem icon={<KeyIcon />} shortcut="⌘L">
                  钤看守人印
                </MenuItem>
                <MenuItem icon={<BellIcon />} shortcut="⌘R">
                  摇一记更铃
                </MenuItem>
                <MenuItem icon={<XIcon />} disabled>
                  封缄归档
                </MenuItem>
                <MenuItem icon={<FlameIcon />}>拨高灯焰</MenuItem>
                <MenuItem icon={<LeafIcon />}>拢一拢枝叶</MenuItem>
                <MenuItem icon={<CopyIcon />}>左右对植</MenuItem>
                <MenuItem icon={<MoonIcon />}>对月转向</MenuItem>
                <MenuItem icon={<FlowerIcon />}>吸附花藤</MenuItem>
                <MenuItem icon={<DropIcon />}>收一盏露</MenuItem>
                <MenuItem icon={<VialIcon />}>起釜蒸馏</MenuItem>
                <MenuSeparator />
                <MenuItem icon={<TrashIcon />} tone="danger">
                  销去记录
                </MenuItem>
              </Menu>
            </Panel>
            <Panel id="menubar" title="Menubar" meta="MBR">
              <Menubar>
                <MenubarMenu label="花圃">
                  <MenuItem>点灯</MenuItem>
                  <MenuItem>熄灯</MenuItem>
                  <MenuItem disabled>移栽</MenuItem>
                  <MenuSeparator />
                  <MenuItem tone="danger">拔除</MenuItem>
                </MenubarMenu>
                <MenubarMenu label="次第">
                  <MenuItem shortcut="⌘]">提到前排</MenuItem>
                  <MenuItem shortcut="⌘[">退到后排</MenuItem>
                </MenubarMenu>
                <MenubarMenu label="排布">
                  <MenuItem>齐左墙</MenuItem>
                  <MenuItem>齐右墙</MenuItem>
                  <MenuSub label="分栽">
                    <MenuItem>上畦</MenuItem>
                    <MenuItem>中畦</MenuItem>
                    <MenuItem>下畦</MenuItem>
                    <MenuSeparator />
                    <MenuItem>复位</MenuItem>
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
                      <span className="nocturne-cap">右键唤起园中令</span>
                    </div>
                  }
                >
                  <MenuItem shortcut="⌘I">查看标本</MenuItem>
                  <MenuItem shortcut="⌘D">誊抄一份</MenuItem>
                  <MenuItem disabled>移栽别处</MenuItem>
                  <MenuSeparator />
                  <MenuItem tone="danger">销去记录</MenuItem>
                </ContextMenu>
              </div>
            </Panel>

            <Panel id="dialog" title="Dialog" meta="DLG">
              <Dialog
                trigger={<Button variant="secondary">启开夜册</Button>}
                title="今夜值守单"
                description="签押之前，请核对今夜要做的两件小事。落笔即入册，改夜再签，花不催人。"
                actions={
                  <>
                    <DialogClose>改夜再说</DialogClose>
                    <DialogClose variant="secondary" data-combo="confirm">
                      签押
                    </DialogClose>
                  </>
                }
              >
                <p className="nocturne-text">当值：3 人 · 巡灯一遍 · 记露水三钱</p>
              </Dialog>
            </Panel>
            <Panel id="alert" title="Alert Dialog" meta="ALT">
              <div className="nocturne-row">
                <AlertDialog
                  tone="danger"
                  trigger={<Button variant="ghost">销去记录</Button>}
                  title="销去今夜记录？"
                  description="夜册中今夜的一切生长都将抹去，此举无法挽回。"
                  actions={
                    <>
                      <AlertDialogClose>中止</AlertDialogClose>
                      <AlertDialogClose variant="danger" data-combo="confirm">
                        销去
                      </AlertDialogClose>
                    </>
                  }
                />
                <AlertDialog
                  tone="warning"
                  trigger={<Button variant="ghost">复位花圃</Button>}
                  title="复位花圃排布？"
                  description="所有花株回到初始畦位，确认后执行。"
                  actions={
                    <>
                      <AlertDialogClose>中止</AlertDialogClose>
                      <AlertDialogClose variant="primary" data-combo="confirm">
                        复位
                      </AlertDialogClose>
                    </>
                  }
                />
                <AlertDialog
                  tone="primary"
                  trigger={<Button variant="ghost">采用此单</Button>}
                  title="采用这份值守单？"
                  description="当前值守单将被这份新单替换。"
                  actions={
                    <>
                      <AlertDialogClose>中止</AlertDialogClose>
                      <AlertDialogClose variant="primary" data-combo="confirm">
                        采用
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
                    ["top", "上"],
                    ["bottom", "下"],
                    ["left", "左"],
                    ["right", "右"],
                  ] as const
                ).map(([side, label]) => (
                  <Drawer
                    key={side}
                    side={side}
                    trigger={<Button variant="ghost">{label}</Button>}
                    title="暖房调度"
                    description="调这间暖房的灯焰与夜雾。"
                    actions={<DrawerClose variant="secondary">合上</DrawerClose>}
                  >
                    <label className="nocturne-row nocturne-row--between">
                      <span className="nocturne-cap">暖灯长供</span>
                      <Switch defaultChecked />
                    </label>
                    <label className="nocturne-row nocturne-row--between">
                      <span className="nocturne-cap">夜雾轻洒</span>
                      <Switch />
                    </label>
                    <Slider label="灯焰高低" defaultValue={50} />
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
                    toast.add({ title: "更铃一声", description: "子时已到，灯焰如常。" })
                  }
                >
                  更铃
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    const id = toast.add({
                      title: "露水收讫",
                      description: "今夜得露三钱，封入青瓷小瓶。",
                      type: "success",
                      actionProps: {
                        children: "收讫",
                        onClick: () => toast.close(id),
                      },
                    });
                  }}
                >
                  收露
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    toast.add({
                      title: "夜雾偏浓",
                      description: "垂枝亭湿气过重，蕨类要独处。",
                      type: "warning",
                    })
                  }
                >
                  夜雾
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    toast.add({
                      title: "毒草警示",
                      description: "毒草小间已开缄，记了就别再用手碰。",
                      type: "danger",
                    })
                  }
                >
                  毒草
                </Button>
              </div>
            </Panel>
          </div>

          <GroupRule id="display" label="Display" sub="名牌与勋记，各安其位。" />
          <div className="nocturne-grid">
            <Panel id="avatar" title="Avatar" meta="AVT">
              <div className="nocturne-row">
                <Avatar status="online">
                  <AvatarImage src="https://i.pravatar.cc/96?img=32" alt="" />
                  <AvatarFallback>守</AvatarFallback>
                </Avatar>
                <Avatar size="sm" status="busy">
                  <AvatarFallback>看</AvatarFallback>
                </Avatar>
                <Avatar status="away">
                  <AvatarFallback>拾</AvatarFallback>
                </Avatar>
                <Avatar size="lg" status="offline">
                  <AvatarFallback>巡</AvatarFallback>
                </Avatar>
              </div>
            </Panel>
            <Panel id="badge" title="Badge" meta="BDG">
              <div className="nocturne-row">
                <Badge tone="primary" dot>
                  当值
                </Badge>
                <Badge tone="success">已入册</Badge>
                <Badge tone="warning">夜雾</Badge>
                <Badge tone="danger" dot>
                  毒性
                </Badge>
                <Badge tone="secondary">帷幔</Badge>
                <Badge tone="neutral">草稿</Badge>
              </div>
            </Panel>

            <Panel id="toolbar" title="Toolbar" meta="TBR">
              <Toolbar aria-label="夜巡工具">
                <BaseToggleGroup
                  className="nocturne-toolbar__group"
                  defaultValue={["lamp"]}
                  aria-label="灯焰"
                >
                  <ToolbarButton render={<BaseToggle />} value="lamp">
                    点灯
                  </ToolbarButton>
                  <ToolbarButton render={<BaseToggle />} value="mist">
                    洒雾
                  </ToolbarButton>
                  <ToolbarButton render={<BaseToggle />} value="dew">
                    收露
                  </ToolbarButton>
                </BaseToggleGroup>
                <ToolbarSeparator />
                <ToolbarGroup aria-label="工具">
                  <ToolbarButton aria-label="落笔">
                    <FeatherIcon />
                  </ToolbarButton>
                  <ToolbarButton disabled aria-label="拨焰">
                    <FlameIcon />
                  </ToolbarButton>
                </ToolbarGroup>
                <ToolbarSeparator />
                <ToolbarLink href="#toolbar">
                  <BellIcon />
                  更铃如常
                </ToolbarLink>
              </Toolbar>
            </Panel>
            <Panel id="scroll" title="Scroll Area" meta="SCR">
              <ScrollArea>
                <ScrollAreaViewport>
                  <ScrollAreaContent>
                    <ol className="nocturne-scroll-list">
                      {[
                        ["亥初", "点灯入园，自南翼起巡"],
                        ["亥正", "颠茄初绽，浆果转亮"],
                        ["子初", "夜来香浓，权当更鼓"],
                        ["子正", "记露水三钱，封青瓷瓶"],
                        ["丑初", "月见草对月尽开"],
                        ["丑正", "垂枝亭夜雾偏浓，闭亭"],
                        ["寅初", "起釜蒸馏，月光凝盏"],
                        ["寅正", "毒草小间钤印复核"],
                        ["卯初", "拨低灯焰，叶脉转暗"],
                        ["卯正", "露水将散，赶封末瓶"],
                        ["辰初", "残花登记入册"],
                        ["辰正", "天将明，替花熄灯"],
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

          <GroupRule id="foundations" label="Foundations" sub="一线黄铜，画尽满园。" />
          <div className="nocturne-grid">
            <Panel id="typography" title="Typography" meta="TYP" wide>
              <div className="nocturne-stack">
                <h2 className="nocturne-h1">暗夜花园</h2>
                <h3 className="nocturne-h2">子夜零时，铜灯次第亮起</h3>
                <span className="nocturne-h3">Section Sub-Label</span>
                <p className="nocturne-text">
                  正文用 Noto Serif SC。数值与码位以打字机体刻录——那是夜册的记账笔迹。
                </p>
                <span className="nocturne-cap">Field Caption · 217</span>
              </div>
            </Panel>

            <Panel id="separator" title="Separator" meta="SEP">
              <div className="nocturne-stack">
                <span className="nocturne-cap">素线</span>
                <Separator />
                <span className="nocturne-cap">带题</span>
                <Separator label="第二畦" />
                <span className="nocturne-cap">竖线</span>
                <div className="nocturne-row">
                  <span className="nocturne-text">灯</span>
                  <Separator orientation="vertical" />
                  <span className="nocturne-text">雾</span>
                  <Separator orientation="vertical" />
                  <span className="nocturne-text">露</span>
                </div>
              </div>
            </Panel>
            <Panel id="panel" title="Panel" meta="PNL">
              <p className="nocturne-text nocturne-panel-note">
                包住每一区的黄铜画框：细线压边、酒红铭牌、四角缠枝——层层都能嵌套。
              </p>
              <Panel title="嵌套画框" meta="SUB">
                <span className="nocturne-cap">框中之框</span>
              </Panel>
            </Panel>
          </div>

          <GroupRule id="signature" label="Signature" sub="幽光一豆，替你看到天明。" />
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
