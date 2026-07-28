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
  BloomIcon,
  BookIcon,
  DropIcon,
  FeatherIcon,
  KeyIcon,
  LampIcon,
  MoonIcon,
  QuatrefoilMark,
  ScissorsIcon,
  SearchIcon,
  SproutIcon,
  VialIcon,
  XIcon,
} from "./components/icons";

const NAV = [
  {
    label: "Garden",
    links: [
      { label: "夜巡控件", href: "#inputs", description: "园中令与拣选" },
      { label: "量具观测", href: "#feedback", description: "焰高与温针" },
      { label: "浮层唤起", href: "#overlays", description: "更铃与夜册" },
      { label: "铭签勋牌", href: "#display", description: "都上了铜" },
    ],
  },
  {
    label: "Archive",
    links: [
      { label: "全部图版", href: "#inputs", description: "37 页夜册" },
      { label: "排印基石", href: "#foundations", description: "发丝线与衬线" },
      { label: "登记表单", href: "#forms", description: "落笔即存档" },
      { label: "画框工房", href: "#foundations", description: "双线画框" },
    ],
  },
  { label: "Manual", href: "#hero" },
  {
    label: "禁园",
    disabled: true,
    links: [{ label: "看守人档案", href: "#display", description: "凭印方可启封" }],
  },
];

const FLOWERS = [
  { label: "颠茄", value: "belladonna" },
  { label: "夜来香", value: "cestrum" },
  { label: "月见草", value: "oenothera" },
  { label: "曼陀罗", value: "datura" },
  { label: "夜皇后", value: "regina" },
  { label: "晚香玉", value: "tuberose" },
  { label: "紫藤", value: "wisteria" },
  { label: "乌头", value: "aconitum" },
  { label: "毛地黄", value: "digitalis" },
  { label: "铃兰", value: "convallaria" },
  { label: "夜合欢", value: "albizia" },
  { label: "封存标本", value: "sealed", disabled: true },
];
const FLOWERS_SHORT = FLOWERS.slice(0, 3);

const CHORES = [
  "巡灯",
  "拨焰",
  "收露",
  "封瓶",
  "蒸馏",
  "剪枝",
  "扦插",
  "换盆",
  "捉虫",
  "记档",
  "洒雾",
  { label: "启封毒柜", disabled: true },
];

const KEEPERS = [
  "颠茄夫人",
  "乌头先生",
  "铃兰",
  "月见",
  "夜香",
  "藤娘",
  "地黄",
  "曼陀",
  "合欢",
  "晚玉",
  "紫杉",
  { label: "前任看守", disabled: true },
];

const WATCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

function watchOf(hour: number): string {
  return WATCHES[Math.floor(((hour + 1) % 24) / 2)];
}

function Clock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="nocturne-clock">
      <span className="nocturne-clock__time">
        {now.toLocaleTimeString("en-GB", { hour12: false })}
      </span>
      <span className="nocturne-clock__watch">{watchOf(now.getHours())}时</span>
    </span>
  );
}

function HeroLantern() {
  const [lit, setLit] = useState(false);
  useEffect(() => {
    const root = document.querySelector(".nocturne-app");
    if (root) root.classList.toggle("nocturne-app--lamp", lit);
  }, [lit]);
  return (
    <div className="nocturne-lantern">
      <button
        type="button"
        className={`nocturne-lantern__body${lit ? " nocturne-lantern__body--lit" : ""}`}
        onClick={() => setLit((v) => !v)}
        aria-pressed={lit}
        aria-label={lit ? "吹熄提灯" : "入园点灯"}
      >
        <svg viewBox="0 0 96 150" aria-hidden="true" focusable="false">
          <circle cx="48" cy="9" r="5" fill="none" stroke="#8a6b3a" strokeWidth="2" />
          <path d="M48 14v8" stroke="#8a6b3a" strokeWidth="2" />
          <path
            d="M30 26h36l4 10H26l4-10Z"
            fill="#2e1d3e"
            stroke="#c69a4e"
            strokeWidth="1.5"
          />
          <path
            d="M28 36h40l6 66H22l6-66Z"
            fill="rgba(18,10,24,0.55)"
            stroke="#c69a4e"
            strokeWidth="1.5"
          />
          <path d="M38 36l-3 66M58 36l3 66" stroke="rgba(198,154,78,0.4)" />
          <g className="nocturne-lantern__flame">
            <path
              d="M48 60c-6 9-8 15-8 20a8 8 0 0 0 16 0c0-5-2-11-8-20Z"
              fill="#e9cc8a"
            />
            <path
              d="M48 70c-3 5-4 8-4 10.5a4 4 0 0 0 8 0c0-2.5-1-5.5-4-10.5Z"
              fill="#e0873a"
            />
          </g>
          <path
            d="M24 102h48l-4 10H28l-4-10Z"
            fill="#2e1d3e"
            stroke="#c69a4e"
            strokeWidth="1.5"
          />
          <path
            d="M40 112h16l-2 22h-12l-2-22Z"
            fill="none"
            stroke="#8a6b3a"
            strokeWidth="1.5"
          />
          <path d="M34 140h28" stroke="#8a6b3a" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      <span className="nocturne-lantern__word" key={lit ? "lit" : "dark"}>
        {lit ? "花在夜里，替灯把光看住。" : "子夜零时，黄铜灯次第亮起。"}
      </span>
      <Button variant="secondary" size="sm" onClick={() => setLit((v) => !v)}>
        {lit ? "吹熄提灯" : "入园点灯"}
      </Button>
    </div>
  );
}

function HeroVine() {
  return (
    <svg
      className="nocturne-hero__vine"
      viewBox="0 0 110 430"
      aria-hidden="true"
      focusable="false"
    >
      <path
        className="nocturne-hero__vine-stem"
        pathLength={1}
        d="M66 430C40 388 30 358 44 326 58 294 84 280 78 248 72 216 38 206 32 176 26 146 58 130 64 104 69 82 54 60 42 30"
      />
      <path
        className="nocturne-hero__vine-twig"
        pathLength={1}
        style={{ animationDelay: "0.8s" }}
        d="M44 326c16 6 32 7 46 0"
      />
      <path
        className="nocturne-hero__vine-twig"
        pathLength={1}
        style={{ animationDelay: "1.2s" }}
        d="M32 176c-4-6-8-13-10-20"
      />
      <g className="nocturne-hero__vine-leaf" style={{ animationDelay: "0.7s" }}>
        <path d="M40 356c4-6 13-7 19-2-5 6-14 7-19 2Z" transform="rotate(-30 49 354)" />
      </g>
      <g className="nocturne-hero__vine-leaf" style={{ animationDelay: "1s" }}>
        <path d="M74 262c4-6 13-7 19-2-5 6-14 7-19 2Z" transform="rotate(160 83 260)" />
      </g>
      <g className="nocturne-hero__vine-leaf" style={{ animationDelay: "1.4s" }}>
        <path d="M56 118c4-6 13-7 19-2-5 6-14 7-19 2Z" transform="rotate(20 65 116)" />
      </g>
      <g className="nocturne-hero__vine-bloom" style={{ animationDelay: "1.1s" }}>
        <g transform="translate(78 248)">
          {[0, 72, 144, 216, 288].map((a) => (
            <path
              key={a}
              className="nocturne-hero__vine-petal"
              transform={`rotate(${a})`}
              d="M0 0C-3.2-3.2-3.4-8 0-10.6 3.4-8 3.2-3.2 0 0Z"
            />
          ))}
          <circle className="nocturne-hero__vine-core" r="2.6" />
        </g>
      </g>
      <g className="nocturne-hero__vine-bloom" style={{ animationDelay: "1.6s" }}>
        <g transform="translate(42 30)">
          {[0, 72, 144, 216, 288].map((a) => (
            <path
              key={a}
              className="nocturne-hero__vine-petal"
              transform={`rotate(${a})`}
              d="M0 0C-2.6-2.6-2.8-6.6 0-8.8 2.8-6.6 2.6-2.6 0 0Z"
            />
          ))}
          <circle className="nocturne-hero__vine-core" r="2.2" />
        </g>
      </g>
    </svg>
  );
}

function DistillProgress() {
  const [val, setVal] = useState(24);
  useEffect(() => {
    const id = setInterval(() => setVal((v) => (v >= 100 ? 8 : v + 4)), 900);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="nocturne-stack">
      <Progress label="月光蒸馏" value={val} />
      <Progress label="凝露" value={67} />
      <Progress label="满釜" value={100} />
      <Progress label="守夜中…" showValue={false} value={null} />
    </div>
  );
}

function SealField() {
  const [code, setCode] = useState("");
  const valid = code.length >= 6;
  const touched = code.length > 0;
  return (
    <Field
      label="封瓶口令"
      placeholder="至少六字…"
      value={code}
      onChange={(e) => setCode(e.target.value)}
      error={touched && !valid ? "口令太短，封不住瓶。" : undefined}
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
      <div className="nocturne-lamp-halo" aria-hidden="true" />
      <header className="nocturne-header">
        <div className="nocturne-logo">
          <span className="nocturne-logo__moon" aria-hidden="true" />
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
            <HeroVine />
            <div className="nocturne-hero__text">
              <span className="nocturne-hero__eyebrow">
                <span className="nocturne-hero__script">Hortus Nocturnus</span>
                <span className="nocturne-cap">· 37 Blooms</span>
              </span>
              <h1 className="nocturne-h1 nocturne-hero__title">
                A <span className="nocturne-h1--accent">night-blooming</span> interface
                kit
                <br />
                kept in wine, brass &amp; bone till dawn
              </h1>
              <p className="nocturne-text nocturne-hero__desc">
                Deep-violet velvet, wine-red blooms, brass hairline frames — a Victorian
                night garden that only opens after dark.
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
            <div className="nocturne-hero__visual" lang="zh-CN">
              <HeroLantern />
            </div>
          </section>

          <GroupRule
            id="inputs"
            label="Inputs"
            sub="园中令，一钮一诺。"
            marker={<QuatrefoilMark />}
          />
          <div className="nocturne-grid">
            <Panel id="button" title="Button" meta="BTN" wide>
              <div className="nocturne-stack">
                <div className="nocturne-row">
                  <Button icon={<LampIcon />}>入园点灯</Button>
                  <Button variant="secondary">翻阅图版</Button>
                  <Button variant="danger">拔除毒株</Button>
                  <Button variant="ghost">改夜再说</Button>
                  <Button disabled>天未黑</Button>
                </div>
                <Separator />
                <div className="nocturne-row">
                  <Button size="sm">小声</Button>
                  <Button size="md">如常</Button>
                  <Button size="lg">唤醒全园</Button>
                </div>
                <Separator />
                <div className="nocturne-row">
                  <Button variant="icon" aria-label="登记">
                    <FeatherIcon />
                  </Button>
                  <Button variant="icon" aria-label="巡灯">
                    <LampIcon />
                  </Button>
                  <Button variant="icon" disabled aria-label="封印">
                    <XIcon />
                  </Button>
                  <Button variant="icon-ghost" aria-label="摘花">
                    <BloomIcon />
                  </Button>
                  <Button variant="icon-ghost" aria-label="看月">
                    <MoonIcon />
                  </Button>
                </div>
              </div>
            </Panel>

            <Panel id="switch" title="Switch" meta="SWT">
              <div className="nocturne-stack">
                <label className="nocturne-row nocturne-row--between">
                  <span className="nocturne-cap">暖灯</span>
                  <Switch defaultChecked />
                </label>
                <label className="nocturne-row nocturne-row--between">
                  <span className="nocturne-cap">夜雾</span>
                  <Switch />
                </label>
                <label className="nocturne-row nocturne-row--between">
                  <span className="nocturne-cap">守夜灯</span>
                  <Switch disabled defaultChecked />
                </label>
                <label className="nocturne-row nocturne-row--between">
                  <span className="nocturne-cap">白日闸</span>
                  <Switch disabled />
                </label>
              </div>
            </Panel>
            <Panel id="toggle" title="Toggle Group" meta="TGL">
              <div className="nocturne-stack">
                <ToggleGroup defaultValue={["first"]}>
                  <Toggle value="first">上半夜</Toggle>
                  <Toggle value="second">下半夜</Toggle>
                  <Toggle value="dawn" disabled>
                    守晨
                  </Toggle>
                </ToggleGroup>
                <ToggleGroup multiple defaultValue={["lamp", "mist", "bell"]}>
                  <Toggle value="lamp">灯</Toggle>
                  <Toggle value="mist">雾</Toggle>
                  <Toggle value="scent">香</Toggle>
                  <Toggle value="bell" disabled>
                    铃
                  </Toggle>
                </ToggleGroup>
              </div>
            </Panel>

            <Panel id="checkbox" title="Checkbox" meta="CHK">
              <div className="nocturne-stack">
                <Checkbox defaultChecked label="巡灯一遍" />
                <Checkbox label="记露水三钱" />
                <Checkbox disabled defaultChecked label="封瓶入册" />
                <Checkbox disabled label="白日事" />
              </div>
            </Panel>
            <Panel id="checkbox-group" title="Checkbox Group" meta="CHG">
              <div className="nocturne-stack">
                <CheckboxGroup
                  defaultValue={["south"]}
                  parentLabel="全园巡查"
                  items={[
                    { label: "南翼暖房", value: "south" },
                    { label: "月光回廊", value: "gallery" },
                    { label: "垂枝亭", value: "pavilion" },
                  ]}
                />
                <CheckboxGroup
                  defaultValue={["poison"]}
                  parentLabel="封存区"
                  disabled
                  items={[
                    { label: "毒草小间", value: "poison" },
                    { label: "旧温室", value: "old" },
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
                  <Radio value="datura" disabled>
                    曼陀罗（隔栏中）
                  </Radio>
                </RadioGroup>
                <span className="nocturne-cap">封存的班表</span>
                <RadioGroup disabled defaultValue="second">
                  <Radio value="first">前半夜</Radio>
                  <Radio value="second">后半夜（固定）</Radio>
                </RadioGroup>
              </div>
            </Panel>
            <Panel id="select" title="Select" meta="SEL">
              <div className="nocturne-stack">
                <label className="nocturne-cap" htmlFor="sel-1">
                  当值花种
                </label>
                <Select
                  items={FLOWERS}
                  placeholder="择花…"
                  defaultValue="cestrum"
                  id="sel-1"
                />
                <label className="nocturne-cap" htmlFor="sel-2">
                  候补花种
                </label>
                <Select items={FLOWERS_SHORT} placeholder="未择" id="sel-2" />
                <label className="nocturne-cap" htmlFor="sel-3">
                  封存花种
                </label>
                <Select
                  items={FLOWERS_SHORT}
                  defaultValue="cestrum"
                  disabled
                  id="sel-3"
                />
              </div>
            </Panel>

            <Panel id="combobox" title="Combobox" meta="CBX">
              <div className="nocturne-stack">
                <span className="nocturne-cap">园务检索</span>
                <Combobox
                  items={CHORES}
                  placeholder="找一件园务…"
                  emptyText="园中无此花"
                  label="园务检索"
                />
              </div>
            </Panel>
            <Panel id="autocomplete" title="Autocomplete" meta="ACP">
              <div className="nocturne-stack">
                <span className="nocturne-cap">唤看守人</span>
                <Autocomplete
                  items={KEEPERS}
                  placeholder="名字…"
                  emptyText="园中无此花"
                  label="唤看守人"
                />
              </div>
            </Panel>

            <Panel id="slider" title="Slider" meta="SLD">
              <div className="nocturne-stack">
                <Slider label="灯焰高低" defaultValue={62} />
                <Slider label="夜雾浓度" defaultValue={40} disabled />
                <Slider label="香气外溢" defaultValue={75} showValue={false} />
              </div>
            </Panel>
            <Panel id="number" title="Number Field" meta="NUM">
              <div className="nocturne-stack">
                <label className="nocturne-cap" htmlFor="num-1">
                  巡灯盏数
                </label>
                <NumberField defaultValue={7} min={0} max={12} step={1} id="num-1" />
                <label className="nocturne-cap" htmlFor="num-2">
                  巡灯上限
                </label>
                <NumberField defaultValue={12} min={0} max={12} step={1} id="num-2" />
              </div>
            </Panel>

            <Panel id="input" title="Text Field" meta="TXT">
              <div className="nocturne-stack">
                <Field
                  label="标本名"
                  placeholder="如：颠茄 · 亥时初绽"
                  defaultValue="颠茄 · 亥时初绽"
                  description="以此名录入《夜册》卷七。"
                />
                <Input
                  icon={<SearchIcon />}
                  placeholder="检索标本…"
                  aria-label="检索标本"
                />
                <SealField />
                <Field label="锁定条目" defaultValue="BELLADONNA-217" disabled />
                <Field label="标本号" defaultValue="BLD-2１7" error="含不可用字符。" />
              </div>
            </Panel>
            <Panel id="otp" title="OTP Field" meta="OTP">
              <div className="nocturne-stack">
                <span className="nocturne-cap">夜门密码</span>
                <OtpField length={6} splitAt={3} defaultValue="217" label="夜门密码" />
                <span className="nocturne-cap">秘匿密码</span>
                <OtpField
                  length={6}
                  splitAt={3}
                  defaultValue="217"
                  mask
                  label="秘匿密码"
                />
                <span className="nocturne-cap">失效密码</span>
                <OtpField
                  length={6}
                  splitAt={3}
                  defaultValue="217"
                  disabled
                  label="失效密码"
                />
              </div>
            </Panel>
          </div>

          <GroupRule
            id="forms"
            label="Forms"
            sub="夜册登记，落笔即存档。"
            marker={<MoonIcon />}
          />
          <div className="nocturne-grid">
            <Panel id="fieldset" title="Fieldset" meta="FLD">
              <Fieldset legend="看守人">
                <Field label="名号" defaultValue="颠茄夫人" />
                <Field label="辖区" defaultValue="南翼暖房" />
              </Fieldset>
            </Panel>
            <Panel id="form" title="Form" meta="FRM">
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  toast.add({
                    title: "已存档",
                    description: "一页并入《夜册》卷七。",
                    type: "success",
                  });
                }}
              >
                <Field label="登记名目" placeholder="今夜要记的事…" />
                <Field label="封瓶口令" type="password" placeholder="口令…" />
                <div className="nocturne-row nocturne-row--end">
                  <Button type="submit" variant="primary">
                    落笔存档
                  </Button>
                </div>
              </Form>
            </Panel>
          </div>

          <GroupRule
            id="feedback"
            label="Feedback"
            sub="焰拨高一分，针挪一寸。"
            marker={<QuatrefoilMark />}
          />
          <div className="nocturne-grid">
            <Panel id="progress" title="Progress" meta="PRG">
              <DistillProgress />
            </Panel>
            <Panel id="meter" title="Meter" meta="MTR">
              <div className="nocturne-stack">
                <Meter label="灯油" value={88} />
                <Meter label="土壤润度" value={70} tone="success" />
                <Meter label="香气浓度" value={52} tone="warning" />
                <Meter label="毒性沉积" value={23} tone="danger" />
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
                        白日装作寻常灌木，入夜香气便漫过半座园子。看守人拿它当更鼓：香到浓时是子时，香散了天也就快亮。
                      </p>
                    ),
                  },
                  {
                    value: "sealed",
                    label: "封存卷",
                    content: <p className="nocturne-text">此卷凭看守人印方可翻阅。</p>,
                    disabled: true,
                  },
                ]}
              />
            </Panel>

            <Panel id="accordion" title="Accordion" meta="ACC">
              <div className="nocturne-stack">
                <span className="nocturne-cap">一次翻一页</span>
                <Accordion
                  defaultValue={["lamp"]}
                  items={[
                    {
                      value: "lamp",
                      title: "巡灯",
                      content: "从南翼到垂枝亭，不落一盏；灯芯拨到三分即可。",
                    },
                    {
                      value: "dew",
                      title: "记露",
                      content: "寅时前封瓶，迟了就散；瓶签写清更次。",
                    },
                    {
                      value: "seal",
                      disabled: true,
                      title: "封柜",
                      content: "毒柜钥匙在看守人腰上，夜里不外借。",
                    },
                  ]}
                />
                <span className="nocturne-cap">同时摊开</span>
                <Accordion
                  openMultiple
                  defaultValue={["kit", "rule"]}
                  items={[
                    {
                      value: "kit",
                      title: "随身物",
                      content: "一盏提灯、一支笔、三只青瓷小瓶。",
                    },
                    {
                      value: "rule",
                      disabled: true,
                      title: "园规",
                      content: "天亮前替花把灯熄了——这是第一条。",
                    },
                  ]}
                />
              </div>
            </Panel>
            <Panel id="collapsible" title="Collapsible" meta="CLP">
              <div className="nocturne-stack">
                <Collapsible title="夜巡便签" defaultOpen>
                  <p className="nocturne-text">
                    颠茄今夜开了七朵，比昨夜多两朵；香气沉在离地三寸处。
                  </p>
                </Collapsible>
                <Collapsible title="修枝记录">
                  <p className="nocturne-text">垂枝亭西侧剪去枯枝三根，创口敷了灰。</p>
                </Collapsible>
                <Collapsible title="毒草名录" disabled>
                  <p className="nocturne-text">凭看守人印方可翻阅。</p>
                </Collapsible>
                <Collapsible title="园规" defaultOpen disabled>
                  <p className="nocturne-text">天亮前替花把灯熄了；这一页常年摊开。</p>
                </Collapsible>
              </div>
            </Panel>
          </div>

          <GroupRule
            id="overlays"
            label="Overlays"
            sub="有事请轻声，浮层自会来。"
            marker={<MoonIcon />}
          />
          <div className="nocturne-grid">
            <Panel id="tooltip" title="Tooltip" meta="TIP">
              <div className="nocturne-row">
                <Tooltip content="铜灯芯拨到三分" side="top">
                  <Button variant="ghost">点灯</Button>
                </Tooltip>
                <Tooltip content="寅时前封瓶" side="bottom">
                  <Button variant="ghost">收露</Button>
                </Tooltip>
                <Tooltip content="子时报一声平安" side="left">
                  <Button variant="ghost">摇铃</Button>
                </Tooltip>
                <Tooltip content="亥时三刻钤讫" side="right">
                  <Button variant="ghost">钤印</Button>
                </Tooltip>
              </div>
            </Panel>
            <Panel id="popover" title="Popover" meta="POP">
              <Popover trigger={<Button variant="ghost">详情</Button>} title="南翼暖房">
                茄属旧族的祖宅，常年酒红帷幔；今夜颠茄当值，灯焰如常。
              </Popover>
            </Panel>

            <Panel id="preview" title="Preview Card" meta="PVW" wide>
              <div className="nocturne-stack">
                <span className="nocturne-cap">悬停看守人</span>
                <p className="nocturne-text">
                  夜册的批注多半出自{" "}
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
                        <AvatarFallback>茄</AvatarFallback>
                      </Avatar>
                      <span className="nocturne-preview__ident">
                        <span className="nocturne-h3 nocturne-preview__title">
                          颠茄夫人
                        </span>
                        <span className="nocturne-preview__handle">@belladonna</span>
                      </span>
                    </div>
                    <p className="nocturne-text nocturne-preview__desc">
                      夜园看守人。凭一盏幽光看管整座温室到天明，落款总是亥时三刻。
                    </p>
                    <div className="nocturne-preview__footer">
                      <Badge tone="primary" dot>
                        守园人
                      </Badge>
                      <Badge tone="neutral">南翼</Badge>
                    </div>
                  </PreviewCard>{" "}
                  之手。
                </p>
              </div>
            </Panel>

            <Panel id="menu" title="Menu" meta="MNU">
              <Menu trigger="园务">
                <MenuItem icon={<LampIcon />} shortcut="⌘L">
                  点灯
                </MenuItem>
                <MenuItem icon={<FeatherIcon />} shortcut="⌘D">
                  登记
                </MenuItem>
                <MenuItem icon={<DropIcon />} shortcut="⌘R">
                  收露
                </MenuItem>
                <MenuItem icon={<XIcon />} disabled>
                  增援
                </MenuItem>
                <MenuItem icon={<BellIcon />}>摇铃</MenuItem>
                <MenuItem icon={<VialIcon />}>封瓶</MenuItem>
                <MenuItem icon={<ScissorsIcon />}>剪枝</MenuItem>
                <MenuItem icon={<SproutIcon />}>育芽</MenuItem>
                <MenuItem icon={<MoonIcon />}>看月</MenuItem>
                <MenuItem icon={<KeyIcon />}>上锁</MenuItem>
                <MenuItem icon={<BookIcon />}>并入夜册</MenuItem>
                <MenuSeparator />
                <MenuItem icon={<ScissorsIcon />} tone="danger">
                  拔除毒株
                </MenuItem>
              </Menu>
            </Panel>
            <Panel id="menubar" title="Menubar" meta="MBR">
              <Menubar>
                <MenubarMenu label="园务">
                  <MenuItem>开园</MenuItem>
                  <MenuItem>闭园</MenuItem>
                  <MenuItem disabled>重开</MenuItem>
                  <MenuSeparator />
                  <MenuItem tone="danger">焚毁枯册</MenuItem>
                </MenubarMenu>
                <MenubarMenu label="灯房">
                  <MenuItem shortcut="⌘]">拨亮</MenuItem>
                  <MenuItem shortcut="⌘[">调暗</MenuItem>
                </MenubarMenu>
                <MenubarMenu label="花册">
                  <MenuItem>按花期排</MenuItem>
                  <MenuItem>按毒性排</MenuItem>
                  <MenuSub label="分卷">
                    <MenuItem>上卷</MenuItem>
                    <MenuItem>中卷</MenuItem>
                    <MenuItem>下卷</MenuItem>
                    <MenuSeparator />
                    <MenuItem>重排</MenuItem>
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
                      <span className="nocturne-context__hint">在此右键，唤看守人</span>
                    </div>
                  }
                >
                  <MenuItem shortcut="⌘I">巡视</MenuItem>
                  <MenuItem shortcut="⌘D">登记</MenuItem>
                  <MenuItem disabled>增援</MenuItem>
                  <MenuSeparator />
                  <MenuItem tone="danger">拔除毒株</MenuItem>
                </ContextMenu>
              </div>
            </Panel>

            <Panel id="dialog" title="Dialog" meta="DLG">
              <Dialog
                trigger={<Button variant="secondary">启开夜册</Button>}
                title="今夜值守单"
                description="签押之前，请核对今夜要做的两件小事。"
                actions={
                  <>
                    <DialogClose>改夜再说</DialogClose>
                    <DialogClose variant="secondary">签押</DialogClose>
                  </>
                }
              >
                <p className="nocturne-text">巡灯一遍 · 记露水三钱</p>
              </Dialog>
            </Panel>
            <Panel id="alert" title="Alert Dialog" meta="ALT">
              <div className="nocturne-row">
                <AlertDialog
                  tone="danger"
                  trigger={<Button variant="ghost">焚毁枯册</Button>}
                  title="焚毁这本枯册？"
                  description="卷上的批注会一并化灰，这一步没有回头路。"
                  actions={
                    <>
                      <AlertDialogClose>且慢</AlertDialogClose>
                      <AlertDialogClose variant="danger">焚毁</AlertDialogClose>
                    </>
                  }
                />
                <AlertDialog
                  tone="warning"
                  trigger={<Button variant="ghost">整枝归位</Button>}
                  title="把攀出的枝都收回来？"
                  description="缠上画框的蔓叶会被剪短，来年才再爬回。"
                  actions={
                    <>
                      <AlertDialogClose>且慢</AlertDialogClose>
                      <AlertDialogClose variant="primary">归位</AlertDialogClose>
                    </>
                  }
                />
                <AlertDialog
                  tone="primary"
                  trigger={<Button variant="ghost">换换灯油</Button>}
                  title="现在换灯油？"
                  description="换油要熄灯一刻，园子会暗上片刻。"
                  actions={
                    <>
                      <AlertDialogClose>且慢</AlertDialogClose>
                      <AlertDialogClose variant="primary">换油</AlertDialogClose>
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
                    title="灯房调度"
                    description="这一间暖房的灯与雾，由此调度。"
                    actions={<DrawerClose variant="secondary">合上</DrawerClose>}
                  >
                    <label className="nocturne-row nocturne-row--between">
                      <span className="nocturne-cap">暖灯</span>
                      <Switch defaultChecked />
                    </label>
                    <label className="nocturne-row nocturne-row--between">
                      <span className="nocturne-cap">夜雾</span>
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
                    toast.add({
                      title: "已记一笔",
                      description: "墨迹未干，先放着晾。",
                    })
                  }
                >
                  记档
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
                        children: "封瓶收存",
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
                      title: "焰苗偏高",
                      description: "西窗第三盏灯，请去看一眼。",
                      type: "warning",
                    })
                  }
                >
                  警讯
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    toast.add({
                      title: "毒株越界",
                      description: "曼陀罗爬出了隔栏。",
                      type: "danger",
                    })
                  }
                >
                  警报
                </Button>
              </div>
            </Panel>
          </div>

          <GroupRule
            id="display"
            label="Display"
            sub="勋牌铭签，都上了铜。"
            marker={<QuatrefoilMark />}
          />
          <div className="nocturne-grid">
            <Panel id="avatar" title="Avatar" meta="AVT">
              <div className="nocturne-row">
                <Avatar status="online">
                  <AvatarImage src="https://i.pravatar.cc/96?img=47" alt="" />
                  <AvatarFallback>茄</AvatarFallback>
                </Avatar>
                <Avatar size="sm" status="busy">
                  <AvatarFallback>乌</AvatarFallback>
                </Avatar>
                <Avatar status="away">
                  <AvatarFallback>月</AvatarFallback>
                </Avatar>
                <Avatar size="lg" status="offline">
                  <AvatarFallback>灯</AvatarFallback>
                </Avatar>
              </div>
            </Panel>
            <Panel id="badge" title="Badge" meta="BDG">
              <div className="nocturne-row">
                <Badge tone="primary" dot>
                  守园人
                </Badge>
                <Badge tone="success">花期至</Badge>
                <Badge tone="warning">焰偏高</Badge>
                <Badge tone="danger" dot>
                  有毒
                </Badge>
                <Badge tone="secondary">客卿</Badge>
                <Badge tone="neutral">草稿</Badge>
              </div>
            </Panel>

            <Panel id="toolbar" title="Toolbar" meta="TBR">
              <Toolbar aria-label="夜册工具">
                <BaseToggleGroup
                  className="nocturne-toolbar__group"
                  defaultValue={["ink"]}
                  aria-label="笔法"
                >
                  <ToolbarButton render={<BaseToggle />} value="ink">
                    白描
                  </ToolbarButton>
                  <ToolbarButton render={<BaseToggle />} value="wash">
                    上色
                  </ToolbarButton>
                  <ToolbarButton render={<BaseToggle />} value="gild">
                    描金
                  </ToolbarButton>
                </BaseToggleGroup>
                <ToolbarSeparator />
                <ToolbarGroup aria-label="园具">
                  <ToolbarButton aria-label="剪枝">
                    <ScissorsIcon />
                  </ToolbarButton>
                  <ToolbarButton disabled aria-label="上锁">
                    <KeyIcon />
                  </ToolbarButton>
                </ToolbarGroup>
                <ToolbarSeparator />
                <ToolbarLink href="#toolbar">
                  <LampIcon />
                  灯火通明
                </ToolbarLink>
              </Toolbar>
            </Panel>
            <Panel id="scroll" title="Scroll Area" meta="SCR">
              <ScrollArea>
                <ScrollAreaViewport>
                  <ScrollAreaContent>
                    <ol className="nocturne-scroll-list">
                      {[
                        ["亥时初", "掌灯，巡南翼"],
                        ["亥时三刻", "颠茄初绽，记档 217"],
                        ["子时初", "收露三钱"],
                        ["子时正", "月见草齐放"],
                        ["丑时初", "夜雾起，润蕨"],
                        ["丑时三刻", "铃响一记，无事"],
                        ["寅时初", "封瓶，蜡未干"],
                        ["寅时正", "曼陀罗越界，已归位"],
                        ["卯时初", "香气渐散"],
                        ["卯时正", "温针回落"],
                        ["辰时初", "晨光入园，熄灯"],
                        ["辰时正", "看守人交更"],
                      ].map(([time, msg]) => (
                        <li key={time} className="nocturne-text">
                          <span className="nocturne-scroll-list__time">{time}</span>{" "}
                          {msg}
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
            sub="从一根发丝线起造夜。"
            marker={<MoonIcon />}
          />
          <div className="nocturne-grid">
            <Panel id="typography" title="Typography" meta="TYP" wide>
              <div className="nocturne-stack">
                <h2 className="nocturne-h1">夜里开着的花园</h2>
                <h3 className="nocturne-h2">衬线押着宽字距</h3>
                <span className="nocturne-h3">Section Sub-Label</span>
                <p className="nocturne-text">
                  正文是 Cormorant Garamond 与思源宋体；数值、缩码与更次，交给打字机体来敲。
                </p>
                <span className="nocturne-cap">Field Caption · 217</span>
              </div>
            </Panel>

            <Panel id="separator" title="Separator" meta="SEP">
              <div className="nocturne-stack">
                <span className="nocturne-cap">素的线</span>
                <Separator />
                <span className="nocturne-cap">带题签</span>
                <Separator label="第二夜" />
                <span className="nocturne-cap">竖的线</span>
                <div className="nocturne-row">
                  <span className="nocturne-text">酒红</span>
                  <Separator orientation="vertical" />
                  <span className="nocturne-text">黄铜</span>
                  <Separator orientation="vertical" />
                  <span className="nocturne-text">骨白</span>
                </div>
              </div>
            </Panel>
            <Panel id="panel" title="Panel" meta="PNL">
              <p className="nocturne-text nocturne-panel-note">
                承着全部区块的丝绒图版：黄铜双线画框，酒红题匾，四角蔓叶——可一层层嵌进去。
              </p>
              <Panel title="嵌套图版" meta="SUB">
                <span className="nocturne-cap">图版中的图版</span>
              </Panel>
            </Panel>
          </div>

          <GroupRule
            id="signature"
            label="Signature"
            sub="花在夜里，替灯把光看住。"
            marker={<QuatrefoilMark />}
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
    <div className="nocturne-grouprule" id={id}>
      <span className="nocturne-marker nocturne-grouprule__marker">{marker}</span>
      <h2 className="nocturne-h2 nocturne-grouprule__label">{label}</h2>
      <span className="nocturne-grouprule__sub">{sub}</span>
      <span className="nocturne-hairline nocturne-grouprule__line" />
    </div>
  );
}
