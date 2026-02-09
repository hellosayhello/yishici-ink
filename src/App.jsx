import { useState, useRef, useEffect } from "react";

// ─── SVG ink wash decorative elements ───
const BrushStroke = ({ style }) => (
  <svg viewBox="0 0 200 12" style={{ width: "120px", height: "8px", ...style }}>
    <path d="M5 6 Q30 2, 60 5 T120 4 T180 6 T195 5" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.5" />
  </svg>
);

const InkCircle = ({ size = 200, style }) => (
  <svg viewBox="0 0 200 200" style={{ width: size, height: size, ...style }}>
    <circle cx="100" cy="100" r="85" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.06" strokeDasharray="4 8" />
    <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.04" strokeDasharray="2 12" />
  </svg>
);

const MountainSilhouette = ({ style }) => (
  <svg viewBox="0 0 800 200" preserveAspectRatio="none" style={{ width: "100%", height: "120px", ...style }}>
    <path d="M0 200 L80 80 L130 130 L200 40 L260 100 L320 20 L400 90 L460 50 L520 110 L600 30 L680 100 L740 60 L800 120 L800 200 Z" fill="currentColor" opacity="0.03" />
    <path d="M0 200 L100 120 L180 160 L280 80 L360 140 L440 70 L540 130 L620 90 L700 150 L800 100 L800 200 Z" fill="currentColor" opacity="0.02" />
  </svg>
);

const BambooDecoration = ({ style }) => (
  <svg viewBox="0 0 60 300" style={{ width: "40px", height: "200px", ...style }}>
    <line x1="30" y1="10" x2="30" y2="290" stroke="currentColor" strokeWidth="1.5" opacity="0.06" />
    <line x1="30" y1="60" x2="12" y2="30" stroke="currentColor" strokeWidth="0.8" opacity="0.05" />
    <line x1="30" y1="120" x2="48" y2="85" stroke="currentColor" strokeWidth="0.8" opacity="0.05" />
    <line x1="30" y1="180" x2="10" y2="150" stroke="currentColor" strokeWidth="0.8" opacity="0.05" />
    <line x1="30" y1="240" x2="50" y2="210" stroke="currentColor" strokeWidth="0.8" opacity="0.05" />
    {[60, 120, 180, 240].map((y) => <ellipse key={y} cx="30" cy={y} rx="4" ry="1.5" fill="currentColor" opacity="0.04" />)}
  </svg>
);

const POETS = [
  {
    id: "libai",
    name: { en: "Li Bai", zh: "李白" },
    era: { en: "Tang Dynasty (701–762)", zh: "唐朝 (701–762)" },
    title: { en: "The Immortal Poet", zh: "詩仙" },
    desc: {
      en: "Bold, romantic, Daoist wanderer. Wine, moonlight, and boundless imagination.",
      zh: "豪放浪漫，道家行者。酒、月、無盡想象。",
    },
  },
  {
    id: "dufu",
    name: { en: "Du Fu", zh: "杜甫" },
    era: { en: "Tang Dynasty (712–770)", zh: "唐朝 (712–770)" },
    title: { en: "The Sage of Poetry", zh: "詩聖" },
    desc: {
      en: "Compassionate realist. Social conscience, meticulous craft, and deep sorrow.",
      zh: "悲天憫人，憂國憂民，精雕細琢。",
    },
  },
  {
    id: "sushi",
    name: { en: "Su Shi", zh: "蘇軾" },
    era: { en: "Song Dynasty (1037–1101)", zh: "宋朝 (1037–1101)" },
    title: { en: "Su Dongpo", zh: "東坡居士" },
    desc: {
      en: "Versatile genius. Wit, philosophy, and resilience through hardship.",
      zh: "曠世奇才。詼諧、哲思、逆境中達觀。",
    },
  },
  {
    id: "liqingzhao",
    name: { en: "Li Qingzhao", zh: "李清照" },
    era: { en: "Song Dynasty (1084–1155)", zh: "宋朝 (1084–1155)" },
    title: { en: "Master of Ci Poetry", zh: "詞國皇后" },
    desc: {
      en: "Exquisite emotion. Longing, loss, and feminine elegance in every word.",
      zh: "至情至性。思念、哀愁、女性之優雅。",
    },
  },
  {
    id: "wangwei",
    name: { en: "Wang Wei", zh: "王維" },
    era: { en: "Tang Dynasty (701–761)", zh: "唐朝 (701–761)" },
    title: { en: "The Buddha of Poetry", zh: "詩佛" },
    desc: {
      en: "Serene landscapes. Chan Buddhism, nature, and painterly stillness.",
      zh: "山水空靈。禪意、自然、畫中有詩。",
    },
  },
  {
    id: "baijiuyi",
    name: { en: "Bai Juyi", zh: "白居易" },
    era: { en: "Tang Dynasty (772–846)", zh: "唐朝 (772–846)" },
    title: { en: "The People's Poet", zh: "詩魔" },
    desc: {
      en: "Accessible and musical. Narrative power, clarity, and popular appeal.",
      zh: "通俗曉暢，敘事傳神，婦孺能解。",
    },
  },
];

const TEXTS = {
  en: {
    title: "Echoes of the Ancients",
    subtitle: "Converse in verse with China's greatest poets",
    chooseLang: "Choose Your Language",
    choosePoet: "Choose a Poet",
    inputPlaceholder: "Write a line of poetry...",
    send: "Send",
    back: "← Back",
    thinking: "Composing verse...",
    intro: (name) => `You are now in the presence of ${name}. Share a line of poetry — your own creation, or a classic verse — and the poet shall respond.`,
    you: "You",
  },
  zh: {
    title: "古韻迴響",
    subtitle: "與千古詩人，以詩對話",
    chooseLang: "請選擇語言",
    choosePoet: "請選擇詩人",
    inputPlaceholder: "請寫一句詩⋯⋯",
    send: "送出",
    back: "← 返回",
    thinking: "吟詩中⋯⋯",
    intro: (name) => `${name}已至。請贈詩一句——無論是閣下新作，還是古人名句——詩人將以詩相和。`,
    you: "汝",
  },
};

function buildSystemPrompt(poet, lang) {
  const nameZh = poet.name.zh;
  const nameFull = lang === "zh" ? nameZh : `${poet.name.en} (${nameZh})`;

  if (lang === "zh") {
    return `你是${nameZh}，${poet.era.zh}的偉大詩人，${poet.title.zh}。你已穿越時空，與今人對話。

規則：
1. 用戶會給你一句詩。你需要判斷這是已有的名句還是原創。
2. 如果是已有名句（比如你自己或其他詩人的作品），請回覆該詩的下一句。如果是一首詩的最後一句，回覆下一聯或說明這是該詩的結尾並賞析。
3. 如果是用戶原創的詩句，你要以${nameZh}的風格創作一句詩來回應。要體現你的性格、意象偏好和詩風。
4. 回覆格式：先給出你的詩句，然後用「——」另起一行簡短說明（是接續名作還是即興和詩，如是名作請註明出處）。
5. 始終用文言或近文言風格寫詩。說明部分可用現代中文，但必須使用繁體中文。
6. 保持${nameZh}的人格：${poet.desc.zh}
7. 每次只回覆一句詩（七言或五言為佳），加上簡短說明。不要過於冗長。
8. 所有回覆必須使用繁體中文，不可使用簡體中文。`;
  }

  return `You are ${nameFull}, the great poet of the ${poet.era.en}, known as "${poet.title.en}". You have transcended time to converse with a modern person through poetry.

Rules:
1. The user will give you a line of poetry. Determine whether it is an existing famous line or an original creation.
2. If it is a known line (from your own works or another poet's), respond with the correct next line of that poem. If it's the last line, respond with the next couplet or note it's the ending and briefly appreciate it.
3. If it is the user's original creation, compose a responding line in YOUR style as ${poet.name.en}. Reflect your personality, preferred imagery, and poetic voice.
4. Format: First give your line of poetry, then on a new line starting with "—" add a brief note (whether you're continuing a known work or composing a response, cite the source if known).
5. Write your poetry lines in classical/traditional Chinese (with English translation in parentheses after). Always use Traditional Chinese characters, never Simplified.
6. Maintain ${poet.name.en}'s persona: ${poet.desc.en}
7. Keep responses concise: one line of poetry + brief note. Do not be overly verbose.`;
}

const ScrollContainer = ({ children }) => {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  });
  return (
    <div ref={ref} style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
      {children}
    </div>
  );
};



export default function AncientPoets() {
  const [lang, setLang] = useState(null);
  const [poet, setPoet] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [screen, setScreen] = useState("lang");
  const [fadeIn, setFadeIn] = useState(true);

  const t = lang ? TEXTS[lang] : TEXTS.en;

  const transition = (next) => {
    setFadeIn(false);
    setTimeout(() => { next(); setFadeIn(true); }, 300);
  };

  const selectLang = (l) => transition(() => { setLang(l); setScreen("poets"); });
  const selectPoet = (p) => transition(() => { setPoet(p); setMessages([]); setScreen("chat"); });
  const goBack = () => {
    if (screen === "chat") transition(() => { setPoet(null); setScreen("poets"); });
    else if (screen === "poets") transition(() => { setLang(null); setScreen("lang"); });
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setLoading(true);
    try {
      const history = messages.map((m) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.text,
      }));
      history.push({ role: "user", content: userMsg });
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: buildSystemPrompt(poet, lang),
          messages: history,
        }),
      });
      const data = await res.json();
      const reply = data.content?.map((c) => c.text || "").join("") || "...";
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch (e) {
      setMessages((prev) => [...prev, { role: "assistant", text: lang === "zh" ? "（詩興暫歇，請再試一次）" : "(The muse is momentarily silent. Please try again.)" }]);
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  // ─── Ink wash aesthetic ───
  const fontDisplay = "'Noto Serif TC', Georgia, serif";
  const fontBody = "'Noto Serif TC', Georgia, serif";
  const inkBlack = "#1a1a18";
  const inkMid = "#5a5850";
  const inkLight = "#8a8878";
  const paperWhite = "#f5f0e8";
  const paperCream = "#ede6d8";
  const paperDark = "#e0d8c8";

  const paperTexture = `
    radial-gradient(ellipse at 20% 50%, #f8f3eb 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, #f0ead8 0%, transparent 40%),
    radial-gradient(ellipse at 50% 80%, #f5efe5 0%, transparent 45%),
    linear-gradient(180deg, ${paperWhite} 0%, ${paperCream} 50%, ${paperDark} 100%)
  `;

  const containerStyle = {
    width: "100%", minHeight: "100vh",
    background: paperTexture,
    fontFamily: fontBody, color: inkBlack,
    display: "flex", flexDirection: "column", alignItems: "center",
    justifyContent: screen === "chat" ? "flex-start" : "center",
    transition: "background 0.8s ease",
    position: "relative", overflow: "hidden",
  };

  const fadeStyle = {
    opacity: fadeIn ? 1 : 0,
    transform: fadeIn ? "translateY(0)" : "translateY(12px)",
    transition: "opacity 0.4s ease, transform 0.4s ease",
    width: "100%", display: "flex", flexDirection: "column", alignItems: "center",
    flex: screen === "chat" ? 1 : undefined,
  };

  const globalStyles = `
    @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-6px); } }
    @keyframes pulse { 0%,100% { opacity: 0.3; } 50% { opacity: 0.8; } }
    ::selection { background: ${inkBlack}20; color: ${inkBlack}; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { margin: 0; background: ${paperWhite}; }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: ${inkBlack}20; border-radius: 2px; }
    textarea::placeholder { color: ${inkLight}; }
  `;

  const fontLink = (
    <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;600;700;900&display=swap" rel="stylesheet" />
  );

  // ─── LANGUAGE SCREEN ───
  if (screen === "lang") {
    return (
      <div style={containerStyle}>
        {fontLink}
        <style>{globalStyles}</style>

        <MountainSilhouette style={{ position: "absolute", bottom: 0, left: 0, color: inkBlack }} />
        <BambooDecoration style={{ position: "absolute", top: "5%", left: "5%", color: inkBlack }} />
        <BambooDecoration style={{ position: "absolute", top: "10%", right: "6%", color: inkBlack, transform: "scaleX(-1)" }} />

        <div style={{ position: "absolute", top: "12%", left: "4%", writingMode: "vertical-rl", fontFamily: fontDisplay, fontSize: "22px", color: inkBlack, opacity: 0.12, letterSpacing: "14px", lineHeight: 2 }}>
          且將新火試新茶
        </div>
        <div style={{ position: "absolute", top: "15%", right: "4%", writingMode: "vertical-rl", fontFamily: fontDisplay, fontSize: "22px", color: inkBlack, opacity: 0.12, letterSpacing: "14px", lineHeight: 2 }}>
          詩酒趁年華
        </div>

        <div style={fadeStyle}>
          <div style={{ textAlign: "center", padding: "40px 20px", position: "relative", zIndex: 1 }}>
            <div style={{ fontFamily: fontDisplay, fontSize: "clamp(48px, 10vw, 80px)", color: inkBlack, lineHeight: 1.1, marginBottom: "8px", letterSpacing: "8px" }}>
              古韻迴響
            </div>
            <div style={{ fontSize: "14px", letterSpacing: "4px", textTransform: "uppercase", color: inkMid, marginBottom: "8px", fontWeight: 400 }}>
              Echoes of the Ancients
            </div>

            <div style={{ display: "flex", justifyContent: "center", margin: "28px 0 36px" }}>
              <BrushStroke style={{ color: inkBlack }} />
            </div>

            <p style={{ fontSize: "15px", color: inkMid, marginBottom: "48px", fontWeight: 400, letterSpacing: "2px" }}>
              Choose Your Language · 請選擇語言
            </p>

            <div style={{ display: "flex", gap: "28px", justifyContent: "center", flexWrap: "wrap" }}>
              {[
                { code: "en", label: "English", sub: "英文" },
                { code: "zh", label: "中文", sub: "Chinese" },
              ].map((l) => (
                <button
                  key={l.code}
                  onClick={() => selectLang(l.code)}
                  style={{
                    background: "transparent",
                    border: `1.5px solid ${inkBlack}20`,
                    borderRadius: "2px",
                    padding: "28px 44px",
                    color: inkBlack,
                    cursor: "pointer",
                    fontFamily: fontDisplay,
                    fontSize: "22px",
                    fontWeight: 700,
                    transition: "all 0.3s ease",
                    minWidth: "180px",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = inkBlack;
                    e.currentTarget.style.background = `${inkBlack}08`;
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = `0 8px 24px ${inkBlack}10`;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = `${inkBlack}20`;
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {l.label}
                  <div style={{ fontSize: "12px", fontWeight: 400, color: inkLight, marginTop: "8px", letterSpacing: "1px" }}>{l.sub}</div>
                </button>
              ))}
            </div>

          </div>
        </div>
      </div>
    );
  }

  // ─── POET SELECTION SCREEN ───
  if (screen === "poets") {
    return (
      <div style={containerStyle}>
        {fontLink}
        <style>{globalStyles}</style>

        <MountainSilhouette style={{ position: "absolute", bottom: 0, left: 0, color: inkBlack }} />
        <InkCircle size={400} style={{ position: "absolute", top: "10%", right: "5%", color: inkBlack }} />

        <div style={fadeStyle}>
          <div style={{ width: "100%", maxWidth: "940px", padding: "36px 24px" }}>
            <button onClick={goBack} style={{
              background: "none", border: "none", color: inkLight, fontFamily: fontBody,
              fontSize: "14px", cursor: "pointer", marginBottom: "28px", padding: "4px 0", letterSpacing: "2px",
            }}
              onMouseOver={(e) => e.currentTarget.style.color = inkBlack}
              onMouseOut={(e) => e.currentTarget.style.color = inkLight}>
              {t.back}
            </button>

            <div style={{ textAlign: "center", marginBottom: "44px" }}>
              <div style={{ fontFamily: fontDisplay, fontSize: "clamp(32px, 7vw, 52px)", color: inkBlack, letterSpacing: "6px", marginBottom: "8px" }}>
                {lang === "zh" ? "請選擇詩人" : "Choose a Poet"}
              </div>
              {lang === "en" && (
                <div style={{ fontSize: "13px", color: inkLight, letterSpacing: "3px", fontFamily: fontDisplay }}>請選擇詩人</div>
              )}
              <div style={{ display: "flex", justifyContent: "center", margin: "20px 0 0" }}>
                <BrushStroke style={{ color: inkBlack }} />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: "20px" }}>
              {POETS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => selectPoet(p)}
                  style={{
                    background: `linear-gradient(135deg, ${paperWhite} 0%, ${paperCream} 100%)`,
                    border: `1px solid ${inkBlack}12`,
                    borderRadius: "2px",
                    padding: "28px 24px",
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "all 0.35s ease",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = `${inkBlack}40`;
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = `0 12px 32px ${inkBlack}10`;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = `${inkBlack}12`;
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div style={{ fontFamily: fontDisplay, fontSize: "26px", color: inkBlack, marginBottom: "2px", letterSpacing: "3px" }}>
                    {p.name.zh}
                  </div>
                  {lang === "en" && (
                    <div style={{ fontSize: "14px", color: inkMid, marginBottom: "4px", fontWeight: 600 }}>
                      {p.name.en}
                    </div>
                  )}
                  <div style={{ fontSize: "12px", color: inkMid, letterSpacing: "2px", marginBottom: "2px", opacity: 0.8 }}>
                    {p.title[lang]}
                  </div>
                  <div style={{ fontSize: "11px", color: inkLight, marginBottom: "14px", letterSpacing: "1px" }}>
                    {p.era[lang]}
                  </div>

                  <div style={{ width: "40px", height: "1px", background: `${inkBlack}15`, marginBottom: "12px" }} />

                  <div style={{ fontSize: "13px", color: inkMid, lineHeight: 1.8, fontWeight: 400 }}>
                    {p.desc[lang]}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── CHAT SCREEN ───
  return (
    <div style={{ ...containerStyle, justifyContent: "flex-start" }}>
      {fontLink}
      <style>{globalStyles}</style>

      <MountainSilhouette style={{ position: "absolute", bottom: 0, left: 0, color: inkBlack, zIndex: 0 }} />
      <BambooDecoration style={{ position: "absolute", top: "8%", right: "3%", color: inkBlack, zIndex: 0 }} />

      <div style={fadeStyle}>
        {/* Header */}
        <div style={{
          width: "100%", maxWidth: "720px",
          padding: "20px 24px 16px",
          display: "flex", alignItems: "center", gap: "16px",
          borderBottom: `1px solid ${inkBlack}0a`,
          position: "relative", zIndex: 1,
        }}>
          <button onClick={goBack} style={{
            background: "none", border: "none", color: inkLight, fontFamily: fontBody,
            fontSize: "14px", cursor: "pointer", padding: "4px 0", letterSpacing: "1px", whiteSpace: "nowrap",
          }}
            onMouseOver={(e) => e.currentTarget.style.color = inkBlack}
            onMouseOut={(e) => e.currentTarget.style.color = inkLight}>
            {t.back}
          </button>
          <div style={{ flex: 1, textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
            <span style={{ fontFamily: fontDisplay, fontSize: "24px", color: inkBlack, letterSpacing: "3px" }}>
              {poet.name.zh}
            </span>
            {lang === "en" && (
              <span style={{ fontSize: "14px", color: inkMid }}>
                {poet.name.en}
              </span>
            )}
            <span style={{ fontSize: "12px", color: inkMid, opacity: 0.7, letterSpacing: "1px" }}>
              {poet.title[lang]}
            </span>
          </div>
          <div style={{ width: "50px" }} />
        </div>

        {/* Messages */}
        <ScrollContainer>
          <div style={{ maxWidth: "720px", margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
            {/* Intro */}
            <div style={{
              textAlign: "center", padding: "32px 20px", marginBottom: "24px",
              borderBottom: `1px solid ${inkBlack}08`,
            }}>
              <div style={{ fontFamily: fontDisplay, fontSize: "28px", color: inkBlack, marginBottom: "12px", letterSpacing: "4px" }}>
                {poet.name.zh}
              </div>
              <p style={{ fontSize: "14px", color: inkMid, lineHeight: 2, maxWidth: "480px", margin: "0 auto", fontWeight: 400 }}>
                {t.intro(poet.name[lang])}
              </p>
              <div style={{ display: "flex", justifyContent: "center", margin: "20px 0 0" }}>
                <BrushStroke style={{ color: inkBlack }} />
              </div>
            </div>

            {messages.map((msg, i) => {
              const isUser = msg.role === "user";
              return (
                <div key={i} style={{
                  display: "flex", justifyContent: isUser ? "flex-end" : "flex-start",
                  marginBottom: "20px", alignItems: "flex-start", gap: "10px",
                }}>
                  <div style={{
                    maxWidth: "80%", padding: "16px 20px",
                    borderRadius: "2px",
                    background: isUser
                      ? `linear-gradient(135deg, ${paperCream} 0%, ${paperDark} 100%)`
                      : `linear-gradient(135deg, ${paperWhite} 0%, ${paperCream} 100%)`,
                    border: `1px solid ${inkBlack}${isUser ? "10" : "08"}`,
                    boxShadow: `0 2px 8px ${inkBlack}06`,
                  }}>
                    <div style={{
                      fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase",
                      color: isUser ? inkMid : inkMid,
                      marginBottom: "8px", fontWeight: 600, opacity: isUser ? 0.7 : 0.8,
                    }}>
                      {isUser ? t.you : poet.name[lang]}
                    </div>
                    <div style={{
                      fontFamily: fontDisplay, fontSize: "15px", lineHeight: 2,
                      color: inkBlack, whiteSpace: "pre-wrap",
                    }}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              );
            })}

            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "20px", alignItems: "flex-start", gap: "10px" }}>
                <div style={{
                  padding: "16px 20px", borderRadius: "2px",
                  background: `linear-gradient(135deg, ${paperWhite} 0%, ${paperCream} 100%)`,
                  border: `1px solid ${inkBlack}08`,
                }}>
                  <div style={{ fontSize: "10px", letterSpacing: "3px", color: inkMid, marginBottom: "8px", fontWeight: 600, opacity: 0.8 }}>
                    {poet.name[lang]}
                  </div>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    {[0, 1, 2].map((j) => (
                      <div key={j} style={{
                        width: "5px", height: "5px", borderRadius: "50%",
                        background: inkBlack, animation: "pulse 1.4s ease-in-out infinite",
                        animationDelay: `${j * 0.25}s`,
                      }} />
                    ))}
                    <span style={{ fontSize: "13px", color: inkLight, marginLeft: "6px", fontStyle: "italic" }}>
                      {t.thinking}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollContainer>

        {/* Input */}
        <div style={{
          width: "100%", maxWidth: "720px",
          padding: "16px 24px 24px",
          borderTop: `1px solid ${inkBlack}08`,
          position: "relative", zIndex: 1,
        }}>
          <div style={{
            display: "flex", gap: "12px", alignItems: "flex-end",
            background: paperWhite,
            border: `1px solid ${inkBlack}15`,
            borderRadius: "2px",
            padding: "12px 16px",
            transition: "border-color 0.3s ease",
          }}
            onFocus={(e) => e.currentTarget.style.borderColor = `${inkBlack}40`}
            onBlur={(e) => e.currentTarget.style.borderColor = `${inkBlack}15`}
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t.inputPlaceholder}
              rows={1}
              style={{
                flex: 1, background: "transparent", border: "none", outline: "none",
                color: inkBlack, fontFamily: fontDisplay, fontSize: "15px",
                lineHeight: 1.8, resize: "none", minHeight: "24px", maxHeight: "120px",
              }}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              style={{
                background: input.trim() && !loading ? inkBlack : `${inkBlack}15`,
                border: "none", borderRadius: "2px",
                padding: "8px 20px",
                color: input.trim() && !loading ? paperWhite : inkLight,
                fontFamily: fontBody, fontSize: "13px", fontWeight: 600,
                cursor: input.trim() && !loading ? "pointer" : "default",
                transition: "all 0.3s ease",
                letterSpacing: "2px", whiteSpace: "nowrap",
              }}
            >
              {t.send}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
