"use client";

import { useState, useEffect, useRef } from "react";

const COLORS = {
  bg: "#0B0B0B",
  elevated: "#111111",
  surface: "#1A1A1A",
  accent: "#D4AF37",
  accentHover: "#E5C349",
  accentMuted: "rgba(212,175,55,0.15)",
  textPrimary: "#FFFFFF",
  textSecondary: "#B3B3B3",
  textTertiary: "#666666",
  border: "#222222",
  borderAccent: "rgba(212,175,55,0.3)",
};

const HERO_IMG = "/hero.jpg";
const PROFILE2_IMG = "/profile2.jpg";
const SGRIT_LOGO = "/sgrit-logo.png";

const MUSIC_LINKS = [
  { name: "Spotify", url: "#", color: "#1DB954" },
  { name: "Apple Music", url: "#", color: "#FA2D48" },
  { name: "YouTube Music", url: "#", color: "#FF0000" },
  { name: "LINE MUSIC", url: "#", color: "#06C755" },
];

const NEWS_LIST = [
  { id: 1, date: "2026.03.20", category: "LIVE", title: "爆撃竜馬 LIVE TOUR 2026 追加公演決定" },
  { id: 2, date: "2026.03.15", category: "RELEASE", title: "新曲「夜明け前」配信スタート" },
  { id: 3, date: "2026.03.01", category: "MEDIA", title: "雑誌「SWITCH」4月号に爆撃竜馬インタビュー掲載" },
  { id: 4, date: "2026.02.20", category: "LIVE", title: "爆撃竜馬 LIVE TOUR 2026 全公演SOLD OUT" },
  { id: 5, date: "2026.02.10", category: "OTHER", title: "公式サイトリニューアルのお知らせ" },
];

const FAQ_LIST = [
  { q: "爆撃竜馬の音楽はどこで聴けますか？", a: "Spotify、Apple Music、YouTube Musicなど主要配信サイトで配信中です。トップページの「LISTEN NOW」からアクセスできます。" },
  { q: "出演依頼はどのようにすればよいですか？", a: "お問い合わせフォームからご連絡ください。内容を確認のうえ、担当よりご返信いたします。" },
  { q: "SNSのアカウントを教えてください。", a: "X: @ryo_ma_official / Instagram: @bakugeki_ryoma_official / TikTok: ryo.ma.official" },
  { q: "ファンレターやプレゼントは受け付けていますか？", a: "現在準備中です。受付開始時にSNSおよびNEWSにてお知らせいたします。" },
  { q: "ライブやイベントの情報はどこで確認できますか？", a: "NEWSページおよび各SNSアカウントにて最新情報を配信しています。" },
  { q: "グッズの販売予定はありますか？", a: "今後の展開にご期待ください。販売開始時はSNS・NEWSで告知します。" },
  { q: "このサイトの情報は最新ですか？", a: "定期的に更新しています。最新情報はNEWSセクションをご確認ください。" },
  { q: "お問い合わせへの返信にはどのくらいかかりますか？", a: "通常3〜5営業日以内にご返信いたします。" },
];

/* ===== Utilities ===== */

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(function () {
    var el = ref.current;
    if (!el) return;
    var obs = new IntersectionObserver(
      function (entries) { if (entries[0].isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return function () { obs.disconnect(); };
  }, []);
  return [ref, visible] as const;
}

function FadeIn(props: { children: React.ReactNode; delay?: number }) {
  const [ref, visible] = useInView();
  var d = props.delay || 0;
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)", transition: "opacity 0.7s ease " + d + "s, transform 0.7s ease " + d + "s" }}>
      {props.children}
    </div>
  );
}

function GoldLine(props: { width?: string }) {
  return <div style={{ width: props.width || "60px", height: "2px", background: COLORS.accent, margin: "16px 0" }} />;
}

function SectionTitle(props: { children: React.ReactNode; sub?: string }) {
  return (
    <div style={{ marginBottom: "48px" }}>
      <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(28px, 5vw, 48px)", color: COLORS.textPrimary, letterSpacing: "0.08em", margin: 0 }}>{props.children}</h2>
      <GoldLine />
      {props.sub && <p style={{ fontFamily: "'Noto Serif JP', serif", fontSize: "14px", color: COLORS.textSecondary, margin: 0 }}>{props.sub}</p>}
    </div>
  );
}

/* ===== Icons ===== */

function XIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>; }
function InstagramIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>; }
function TikTokIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13a8.27 8.27 0 005.58 2.16V11.7a4.83 4.83 0 01-3.77-1.24V6.69h3.77z"/></svg>; }

function SNSBar(props: { size?: string }) {
  var s = props.size === "lg" ? 48 : 40;
  var items = [
    { icon: <XIcon />, url: "https://x.com/ryo_ma_official", label: "X" },
    { icon: <InstagramIcon />, url: "https://instagram.com/bakugeki_ryoma_official", label: "Instagram" },
    { icon: <TikTokIcon />, url: "https://tiktok.com/@ryo.ma.official", label: "TikTok" },
  ];
  return (
    <div style={{ display: "flex", gap: "16px" }}>
      {items.map(function (item) {
        return (
          <a key={item.label} href={item.url} target="_blank" rel="noopener noreferrer" aria-label={item.label}
            style={{ width: s, height: s, borderRadius: "50%", border: "1px solid " + COLORS.border, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.textSecondary, textDecoration: "none", transition: "all 0.3s" }}
            onMouseEnter={function (e) { e.currentTarget.style.color = COLORS.accent; e.currentTarget.style.borderColor = COLORS.accent; e.currentTarget.style.transform = "scale(1.1)"; }}
            onMouseLeave={function (e) { e.currentTarget.style.color = COLORS.textSecondary; e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.transform = "scale(1)"; }}>
            {item.icon}
          </a>
        );
      })}
    </div>
  );
}

/* ===== Header ===== */

function Header(props: { onNav: (id: string) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(function () {
    function handleScroll() { setScrolled(window.scrollY > 50); }
    window.addEventListener("scroll", handleScroll);
    return function () { window.removeEventListener("scroll", handleScroll); };
  }, []);

  var navItems = [
    { label: "HOME", id: "hero" }, { label: "PROFILE", id: "profile" },
    { label: "NEWS", id: "news" }, { label: "ABOUT", id: "about" }, { label: "CONTACT", id: "contact" },
  ];

  return (
    <>
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 clamp(20px, 5vw, 80px)", height: "72px", display: "flex", alignItems: "center", justifyContent: "space-between", background: scrolled ? "rgba(11,11,11,0.95)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", borderBottom: scrolled ? "1px solid " + COLORS.border : "1px solid transparent", transition: "all 0.3s" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }} onClick={function () { props.onNav("hero"); }}>
          <img src={SGRIT_LOGO} alt="SGRIT" style={{ height: "50px", width: "auto" }} />
        </div>
        <nav className="desktop-nav" style={{ display: "flex", gap: "28px", alignItems: "center" }}>
          {navItems.map(function (n) {
            return (
              <button key={n.id} onClick={function () { props.onNav(n.id); }}
                style={{ background: "none", border: "none", fontFamily: "'Cinzel', serif", fontSize: "11px", letterSpacing: "0.15em", color: COLORS.textSecondary, cursor: "pointer", padding: "8px 0", transition: "color 0.3s" }}
                onMouseEnter={function (e) { e.currentTarget.style.color = COLORS.accent; }}
                onMouseLeave={function (e) { e.currentTarget.style.color = COLORS.textSecondary; }}>
                {n.label}
              </button>
            );
          })}
        </nav>
        <button className="mobile-menu-btn" onClick={function () { setMenuOpen(!menuOpen); }}
          style={{ background: "none", border: "none", color: COLORS.textPrimary, cursor: "pointer", padding: "8px", display: "none" }} aria-label="Menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {menuOpen ? <path d="M6 6l12 12M6 18L18 6" /> : <><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" /></>}
          </svg>
        </button>
      </header>
      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 99, background: "rgba(11,11,11,0.97)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "36px", animation: "fadeIn 0.3s ease" }}>
          {navItems.map(function (n, i) {
            return (
              <button key={n.id} onClick={function () { props.onNav(n.id); setMenuOpen(false); }}
                style={{ background: "none", border: "none", fontFamily: "'Noto Serif JP', serif", fontSize: "22px", color: COLORS.textPrimary, cursor: "pointer", letterSpacing: "0.1em", opacity: 0, animation: "slideUp 0.4s ease " + i * 0.07 + "s forwards" }}>
                {n.label}
              </button>
            );
          })}
          <div style={{ marginTop: "20px", opacity: 0, animation: "slideUp 0.4s ease 0.4s forwards" }}><SNSBar /></div>
        </div>
      )}
    </>
  );
}

/* ===== Hero ===== */

function Hero(props: { onNav: (id: string) => void }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(function () { var t = setTimeout(function () { setLoaded(true); }, 100); return function () { clearTimeout(t); }; }, []);

  function makeStyle(delayVal: number) {
    return { opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(24px)", transition: "all 0.8s ease " + delayVal + "s" };
  }

  return (
    <section id="hero" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <img src={HERO_IMG} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 15%" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(11,11,11,0.25) 0%, rgba(11,11,11,0.5) 40%, rgba(11,11,11,0.92) 75%, #0B0B0B 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(11,11,11,0.65) 0%, transparent 40%, transparent 60%, rgba(11,11,11,0.65) 100%)" }} />
      </div>
      <div style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", textAlign: "center", padding: "120px clamp(20px, 5vw, 80px) clamp(60px, 10vw, 100px)" }}>
        <p style={{ fontFamily: "'Cinzel', serif", fontSize: "11px", letterSpacing: "0.35em", color: COLORS.accent, marginBottom: "24px", ...makeStyle(0.3) }}>SGRIT OFFICIAL</p>
        <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(32px, 7vw, 72px)", color: COLORS.textPrimary, letterSpacing: "-0.01em", lineHeight: 1.05, margin: "0 0 20px", textShadow: "0 2px 40px rgba(0,0,0,0.5)", ...makeStyle(0.5) }}>声が、空気を変える。</h1>
        <p style={{ fontFamily: "'Noto Serif JP', serif", fontSize: "clamp(13px, 1.8vw, 17px)", color: "rgba(255,255,255,0.75)", maxWidth: "480px", lineHeight: 1.8, margin: "0 0 40px", ...makeStyle(0.7) }}>アーティスト爆撃竜馬。唯一無二の表現で、<br />音楽シーンに新たな衝撃を。</p>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center", ...makeStyle(0.9) }}>
          <button onClick={function () { props.onNav("music"); }}
            style={{ fontFamily: "'Cinzel', serif", fontSize: "12px", letterSpacing: "0.18em", padding: "15px 36px", background: COLORS.accent, color: "#0B0B0B", border: "none", cursor: "pointer", transition: "all 0.3s", fontWeight: 600 }}
            onMouseEnter={function (e) { e.currentTarget.style.background = COLORS.accentHover; e.currentTarget.style.boxShadow = "0 0 30px rgba(212,175,55,0.3)"; }}
            onMouseLeave={function (e) { e.currentTarget.style.background = COLORS.accent; e.currentTarget.style.boxShadow = "none"; }}>LISTEN NOW</button>
          <button onClick={function () { props.onNav("profile"); }}
            style={{ fontFamily: "'Cinzel', serif", fontSize: "12px", letterSpacing: "0.18em", padding: "15px 36px", background: "rgba(255,255,255,0.06)", color: COLORS.textPrimary, border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer", transition: "all 0.3s", backdropFilter: "blur(4px)" }}
            onMouseEnter={function (e) { e.currentTarget.style.borderColor = COLORS.accent; e.currentTarget.style.color = COLORS.accent; }}
            onMouseLeave={function (e) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = COLORS.textPrimary; }}>PROFILE</button>
        </div>
      </div>
    </section>
  );
}

/* ===== Profile ===== */

function Profile(props: { showDetail: boolean; setShowDetail: (v: boolean) => void }) {
  var showDetail = props.showDetail;
  return (
    <section id="profile" style={{ padding: "clamp(60px, 10vw, 120px) clamp(20px, 5vw, 80px)", background: COLORS.elevated }}>
      <FadeIn><SectionTitle sub="アーティスト情報">PROFILE</SectionTitle></FadeIn>
      <div className="profile-grid" style={{ display: "grid", gridTemplateColumns: "320px minmax(0, 1fr)", gap: "clamp(32px, 5vw, 64px)", maxWidth: "1100px", margin: "0 auto", alignItems: "start" }}>
        <FadeIn delay={0.1}>
          <div style={{ position: "relative", maxWidth: "320px" }}>
            <div style={{ position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: COLORS.accent, zIndex: 2 }} />
              <img src={HERO_IMG} alt="爆撃竜馬" style={{ width: "100%", display: "block", aspectRatio: "3/4", objectFit: "cover", objectPosition: "center 10%" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(transparent, rgba(17,17,17,0.4))" }} />
            </div>
            {showDetail && (
              <div style={{ position: "absolute", bottom: "-30px", right: "-20px", width: "45%", boxShadow: "0 8px 40px rgba(0,0,0,0.6)", border: "1px solid " + COLORS.border, animation: "fadeIn 0.6s ease", zIndex: 3 }}>
                <img src={PROFILE2_IMG} alt="爆撃竜馬" style={{ width: "100%", display: "block", aspectRatio: "3/4", objectFit: "cover", objectPosition: "center 15%" }} />
              </div>
            )}
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div style={{ paddingTop: "8px" }}>
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: "11px", letterSpacing: "0.35em", color: COLORS.accent, margin: "0 0 12px" }}>ARTIST</p>
            <h3 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: "clamp(28px, 5vw, 48px)", color: COLORS.textPrimary, margin: "0 0 4px", lineHeight: 1.15, fontWeight: 700 }}>爆撃竜馬</h3>
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: "14px", color: COLORS.textTertiary, margin: "0 0 12px", letterSpacing: "0.15em" }}>BAKUGEKI RYOMA</p>
            <p style={{ fontFamily: "'Noto Serif JP', serif", fontSize: "12px", color: COLORS.textTertiary, margin: "0 0 32px" }}>所属：株式会社SGRIT</p>
            {!showDetail ? (
              <>
                <p style={{ fontFamily: "'Noto Serif JP', serif", fontSize: "15px", color: COLORS.textSecondary, lineHeight: 2.0, margin: "0 0 32px" }}>既存のカテゴリに縛られない音楽性と、圧倒的なステージパフォーマンスで注目を集めるアーティスト。SNSを中心にデジタルネイティブ世代から圧倒的な支持を獲得。</p>
                <button onClick={function () { props.setShowDetail(true); }}
                  style={{ fontFamily: "'Cinzel', serif", fontSize: "12px", letterSpacing: "0.15em", padding: "14px 32px", background: "transparent", color: COLORS.accent, border: "1px solid " + COLORS.borderAccent, cursor: "pointer", transition: "all 0.3s" }}
                  onMouseEnter={function (e) { e.currentTarget.style.borderColor = COLORS.accent; e.currentTarget.style.background = COLORS.accentMuted; }}
                  onMouseLeave={function (e) { e.currentTarget.style.borderColor = COLORS.borderAccent; e.currentTarget.style.background = "transparent"; }}>VIEW PROFILE</button>
              </>
            ) : (
              <div style={{ animation: "fadeIn 0.5s ease" }}>
                <p style={{ fontFamily: "'Noto Serif JP', serif", fontSize: "15px", color: COLORS.textSecondary, lineHeight: 2.0, margin: "0 0 24px" }}>既存のカテゴリに縛られない音楽性と、圧倒的なステージパフォーマンスで注目を集めるアーティスト。SNSを中心にデジタルネイティブ世代から圧倒的な支持を獲得。唯一無二の世界観で、音楽シーンに新たな風を吹き込み続けている。</p>
                <div style={{ padding: "24px", background: COLORS.surface, border: "1px solid " + COLORS.border, marginBottom: "28px" }}>
                  <p style={{ fontFamily: "'Cinzel', serif", fontSize: "10px", letterSpacing: "0.25em", color: COLORS.accent, margin: "0 0 16px" }}>FOLLOW</p>
                  <SNSBar size="lg" />
                </div>
                <div>
                  <p style={{ fontFamily: "'Cinzel', serif", fontSize: "10px", letterSpacing: "0.25em", color: COLORS.accent, margin: "0 0 16px" }}>MUSIC</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                    {MUSIC_LINKS.map(function (m) {
                      return (
                        <a key={m.name} href={m.url} target="_blank" rel="noopener noreferrer"
                          style={{ fontFamily: "'Noto Serif JP', serif", fontSize: "13px", padding: "10px 20px", border: "1px solid " + COLORS.border, color: COLORS.textSecondary, textDecoration: "none", transition: "all 0.3s", display: "flex", alignItems: "center", gap: "8px" }}
                          onMouseEnter={function (e) { e.currentTarget.style.borderColor = m.color; e.currentTarget.style.color = m.color; }}
                          onMouseLeave={function (e) { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.color = COLORS.textSecondary; }}>
                          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: m.color }} />{m.name}
                        </a>
                      );
                    })}
                  </div>
                </div>
                <button onClick={function () { props.setShowDetail(false); }} style={{ marginTop: "32px", fontFamily: "'Noto Serif JP', serif", fontSize: "13px", background: "none", border: "none", color: COLORS.textTertiary, cursor: "pointer", padding: 0 }}>閉じる</button>
              </div>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ===== Features ===== */

function Features() {
  var items = [
    { num: "01", title: "圧倒的な存在感", desc: "ステージに立った瞬間、空間を支配する。爆撃竜馬の表現は一度見たら忘れられない。" },
    { num: "02", title: "ジャンルを超える音楽性", desc: "既存のカテゴリに縛られない。爆撃竜馬の楽曲は常に予想の先を行く。" },
    { num: "03", title: "SNSで話題沸騰", desc: "TikTok・Instagram・Xで多くのファンが熱狂。デジタルネイティブ世代を中心に拡散中。" },
  ];
  return (
    <section style={{ padding: "clamp(60px, 10vw, 120px) clamp(20px, 5vw, 80px)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "clamp(24px, 3vw, 48px)" }}>
        {items.map(function (item, i) {
          return (
            <FadeIn key={item.num} delay={i * 0.1}>
              <div style={{ padding: "40px 32px", border: "1px solid " + COLORS.border, position: "relative", transition: "all 0.3s" }}
                onMouseEnter={function (e) { e.currentTarget.style.borderColor = COLORS.borderAccent; }}
                onMouseLeave={function (e) { e.currentTarget.style.borderColor = COLORS.border; }}>
                <span style={{ fontFamily: "'Cinzel', serif", fontSize: "36px", color: COLORS.accentMuted, position: "absolute", top: "16px", right: "20px" }}>{item.num}</span>
                <h4 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: "18px", color: COLORS.textPrimary, margin: "0 0 16px", fontWeight: 500 }}>{item.title}</h4>
                <GoldLine width="40px" />
                <p style={{ fontFamily: "'Noto Serif JP', serif", fontSize: "14px", color: COLORS.textSecondary, lineHeight: 1.8, margin: 0 }}>{item.desc}</p>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}

/* ===== Music ===== */

function MusicSection() {
  return (
    <section id="music" style={{ padding: "clamp(60px, 10vw, 120px) clamp(20px, 5vw, 80px)", background: COLORS.elevated, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.04 }}>
        <img src={PROFILE2_IMG} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(1) blur(2px)" }} />
      </div>
      <FadeIn>
        <div style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <SectionTitle sub="音楽配信">LISTEN NOW</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginTop: "32px" }}>
            {MUSIC_LINKS.map(function (m, i) {
              return (
                <FadeIn key={m.name} delay={i * 0.08}>
                  <a href={m.url} target="_blank" rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "20px 16px", background: COLORS.surface, border: "1px solid " + COLORS.border, color: COLORS.textPrimary, textDecoration: "none", fontFamily: "'Noto Serif JP', serif", fontSize: "13px", transition: "all 0.3s" }}
                    onMouseEnter={function (e) { e.currentTarget.style.borderColor = m.color; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={function (e) { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.transform = "translateY(0)"; }}>
                    <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: m.color, flexShrink: 0 }} />{m.name}
                  </a>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

/* ===== News ===== */

function News() {
  const [filter, setFilter] = useState("ALL");
  var cats = ["ALL", "LIVE", "RELEASE", "MEDIA", "OTHER"];
  var filtered = filter === "ALL" ? NEWS_LIST : NEWS_LIST.filter(function (n) { return n.category === filter; });
  return (
    <section id="news" style={{ padding: "clamp(60px, 10vw, 120px) clamp(20px, 5vw, 80px)" }}>
      <FadeIn><SectionTitle sub="最新情報">NEWS</SectionTitle></FadeIn>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <FadeIn delay={0.1}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "32px", flexWrap: "wrap" }}>
            {cats.map(function (c) {
              return (
                <button key={c} onClick={function () { setFilter(c); }}
                  style={{ fontFamily: "'Cinzel', serif", fontSize: "11px", letterSpacing: "0.1em", padding: "8px 16px", background: filter === c ? COLORS.accentMuted : "transparent", color: filter === c ? COLORS.accent : COLORS.textTertiary, border: "1px solid " + (filter === c ? COLORS.borderAccent : COLORS.border), cursor: "pointer", transition: "all 0.3s" }}>{c}</button>
              );
            })}
          </div>
        </FadeIn>
        <div>
          {filtered.map(function (n, i) {
            return (
              <FadeIn key={n.id} delay={i * 0.05}>
                <div style={{ display: "flex", alignItems: "center", gap: "clamp(12px, 2vw, 24px)", padding: "20px 0", borderBottom: "1px solid " + COLORS.border, cursor: "pointer", transition: "all 0.3s" }}
                  onMouseEnter={function (e) { e.currentTarget.style.paddingLeft = "8px"; e.currentTarget.style.borderBottomColor = COLORS.borderAccent; }}
                  onMouseLeave={function (e) { e.currentTarget.style.paddingLeft = "0"; e.currentTarget.style.borderBottomColor = COLORS.border; }}>
                  <span style={{ fontFamily: "'Cinzel', serif", fontSize: "12px", color: COLORS.textTertiary, flexShrink: 0, minWidth: "90px" }}>{n.date}</span>
                  <span style={{ fontFamily: "'Cinzel', serif", fontSize: "10px", letterSpacing: "0.1em", padding: "4px 10px", border: "1px solid " + COLORS.borderAccent, color: COLORS.accent, flexShrink: 0 }}>{n.category}</span>
                  <span style={{ fontFamily: "'Noto Serif JP', serif", fontSize: "14px", color: COLORS.textPrimary }}>{n.title}</span>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ===== About ===== */

function About() {
  var companyRows = [
    ["会社名", "株式会社SGRIT"],
    ["代表者", "内海 雄麻"],
    ["所在地", "〒170-0013 東京都豊島区東池袋1-36-7 アルテール池袋808"],
    ["資本金", "300万円"],
    ["電話番号", "03-6820-6291"],
    ["事業内容", "芸能キャスティング事業 / タレント・芸能人マネジメント / SNS・ライブ配信サポート"],
  ];
  var values = [
    { letter: "S", word: "Shine", sub: "光り輝く", desc: "すべての人が持つ可能性を信じ、その輝きを最大限に引き出すこと。それが私たちの使命です。" },
    { letter: "GRIT", word: "Passion & Perseverance", sub: "やり抜く力", desc: "困難に直面しても諦めない。目標に向かって粘り強く挑戦し続ける力こそが、成功への道を切り拓きます。" },
  ];
  return (
    <section id="about" style={{ padding: "clamp(60px, 10vw, 120px) clamp(20px, 5vw, 80px)", background: COLORS.elevated }}>
      <FadeIn><SectionTitle sub="運営会社">ABOUT</SectionTitle></FadeIn>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <FadeIn delay={0.1}>
          <div style={{ textAlign: "center", marginBottom: "64px", maxWidth: "700px", marginLeft: "auto", marginRight: "auto" }}>
            <img src={SGRIT_LOGO} alt="SGRIT" style={{ height: "100px", width: "auto", margin: "0 auto 24px", display: "block" }} />
            <p style={{ fontFamily: "'Noto Serif JP', serif", fontSize: "15px", color: COLORS.textSecondary, lineHeight: 2.0, margin: 0 }}>私たちは、信頼・透明性・長期的パートナーシップを最も重視しています。単なるキャスティング会社ではなく、クライアント様の成果創出に真摯に向き合い、共に成長していくパートナーでありたいと考えています。</p>
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginBottom: "64px" }}>
          {values.map(function (v, i) {
            return (
              <FadeIn key={v.letter} delay={0.15 + i * 0.1}>
                <div style={{ padding: "40px 32px", border: "1px solid " + COLORS.border, position: "relative", transition: "all 0.3s", height: "100%" }}
                  onMouseEnter={function (e) { e.currentTarget.style.borderColor = COLORS.borderAccent; }}
                  onMouseLeave={function (e) { e.currentTarget.style.borderColor = COLORS.border; }}>
                  <span style={{ fontFamily: "'Cinzel', serif", fontSize: "48px", color: COLORS.accentMuted, position: "absolute", top: "12px", right: "20px", lineHeight: 1 }}>{v.letter}</span>
                  <p style={{ fontFamily: "'Cinzel', serif", fontSize: "13px", letterSpacing: "0.1em", color: COLORS.accent, margin: "0 0 4px" }}>{v.word}</p>
                  <p style={{ fontFamily: "'Noto Serif JP', serif", fontSize: "18px", color: COLORS.textPrimary, margin: "0 0 16px", fontWeight: 500 }}>{v.sub}</p>
                  <GoldLine width="40px" />
                  <p style={{ fontFamily: "'Noto Serif JP', serif", fontSize: "14px", color: COLORS.textSecondary, lineHeight: 1.8, margin: 0 }}>{v.desc}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
        <FadeIn delay={0.3}>
          <div style={{ background: COLORS.surface, border: "1px solid " + COLORS.border, padding: "clamp(24px, 4vw, 40px)" }}>
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: "11px", letterSpacing: "0.25em", color: COLORS.accent, margin: "0 0 24px" }}>COMPANY INFO</p>
            {companyRows.map(function (row, i) {
              return (
                <div key={row[0]} style={{ display: "flex", gap: "clamp(16px, 3vw, 32px)", padding: "16px 0", borderBottom: i < companyRows.length - 1 ? "1px solid " + COLORS.border : "none", flexWrap: "wrap" }}>
                  <span style={{ fontFamily: "'Noto Serif JP', serif", fontSize: "13px", color: COLORS.textTertiary, minWidth: "100px", flexShrink: 0 }}>{row[0]}</span>
                  <span style={{ fontFamily: "'Noto Serif JP', serif", fontSize: "14px", color: COLORS.textPrimary, lineHeight: 1.6 }}>{row[1]}</span>
                </div>
              );
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ===== Contact ===== */

function Contact() {
  const [step, setStep] = useState("category");
  const [form, setForm] = useState({ category: "", name: "", email: "", organization: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  var categories = [
    { value: "booking", label: "出演依頼" }, { value: "media", label: "取材・メディア" },
    { value: "fan", label: "ファンレター" }, { value: "other", label: "その他" },
  ];
  function validate() {
    var e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "お名前を入力してください";
    if (!form.email.trim()) e.email = "メールアドレスを入力してください";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "正しいメールアドレスを入力してください";
    if (!form.message.trim()) e.message = "メッセージを入力してください";
    setErrors(e); return Object.keys(e).length === 0;
  }
  var inputStyle: React.CSSProperties = { width: "100%", padding: "14px 16px", background: COLORS.surface, border: "1px solid " + COLORS.border, color: COLORS.textPrimary, fontFamily: "'Noto Serif JP', serif", fontSize: "14px", outline: "none", transition: "border-color 0.2s", boxSizing: "border-box" };
  function getCatLabel() { var found = categories.find(function (c) { return c.value === form.category; }); return found ? found.label : ""; }

  return (
    <section id="contact" style={{ padding: "clamp(60px, 10vw, 120px) clamp(20px, 5vw, 80px)" }}>
      <FadeIn><SectionTitle sub="お問い合わせ">CONTACT</SectionTitle></FadeIn>
      <div style={{ maxWidth: "560px", margin: "0 auto" }}>
        {step === "category" && (
          <FadeIn>
            <p style={{ fontFamily: "'Noto Serif JP', serif", fontSize: "14px", color: COLORS.textSecondary, marginBottom: "24px" }}>お問い合わせの種類をお選びください。</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {categories.map(function (c) {
                return (
                  <button key={c.value} onClick={function () { setForm({ ...form, category: c.value }); setStep("details"); }}
                    style={{ padding: "20px", background: COLORS.surface, border: "1px solid " + COLORS.border, color: COLORS.textPrimary, fontFamily: "'Noto Serif JP', serif", fontSize: "14px", cursor: "pointer", transition: "all 0.3s", textAlign: "center" }}
                    onMouseEnter={function (e) { e.currentTarget.style.borderColor = COLORS.accent; e.currentTarget.style.color = COLORS.accent; }}
                    onMouseLeave={function (e) { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.color = COLORS.textPrimary; }}>{c.label}</button>
                );
              })}
            </div>
          </FadeIn>
        )}
        {step === "details" && (
          <FadeIn>
            <div style={{ display: "flex", gap: "8px", marginBottom: "24px", alignItems: "center" }}>
              <button onClick={function () { setStep("category"); }} style={{ background: "none", border: "none", color: COLORS.textTertiary, cursor: "pointer", fontSize: "20px", padding: 0 }}>&#8592;</button>
              <span style={{ fontFamily: "'Cinzel', serif", fontSize: "11px", letterSpacing: "0.1em", padding: "4px 12px", border: "1px solid " + COLORS.borderAccent, color: COLORS.accent }}>{getCatLabel()}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <input placeholder="お名前 *" value={form.name} onChange={function (e) { setForm({ ...form, name: e.target.value }); }} style={{ ...inputStyle, borderColor: errors.name ? "#E53935" : COLORS.border }} onFocus={function (e) { e.target.style.borderColor = COLORS.accent; }} onBlur={function (e) { e.target.style.borderColor = errors.name ? "#E53935" : COLORS.border; }} />
                {errors.name && <p style={{ fontSize: "12px", color: "#E53935", margin: "4px 0 0" }}>{errors.name}</p>}
              </div>
              <div>
                <input placeholder="メールアドレス *" value={form.email} onChange={function (e) { setForm({ ...form, email: e.target.value }); }} style={{ ...inputStyle, borderColor: errors.email ? "#E53935" : COLORS.border }} onFocus={function (e) { e.target.style.borderColor = COLORS.accent; }} onBlur={function (e) { e.target.style.borderColor = errors.email ? "#E53935" : COLORS.border; }} />
                {errors.email && <p style={{ fontSize: "12px", color: "#E53935", margin: "4px 0 0" }}>{errors.email}</p>}
              </div>
              {(form.category === "booking" || form.category === "media") && (
                <input placeholder="所属・団体名" value={form.organization} onChange={function (e) { setForm({ ...form, organization: e.target.value }); }} style={inputStyle} onFocus={function (e) { e.target.style.borderColor = COLORS.accent; }} onBlur={function (e) { e.target.style.borderColor = COLORS.border; }} />
              )}
              <div>
                <textarea placeholder="メッセージ *" rows={5} value={form.message} onChange={function (e) { setForm({ ...form, message: e.target.value }); }} style={{ ...inputStyle, resize: "vertical", borderColor: errors.message ? "#E53935" : COLORS.border }} onFocus={function (e) { e.target.style.borderColor = COLORS.accent; }} onBlur={function (e) { e.target.style.borderColor = errors.message ? "#E53935" : COLORS.border; }} />
                {errors.message && <p style={{ fontSize: "12px", color: "#E53935", margin: "4px 0 0" }}>{errors.message}</p>}
              </div>
              <button onClick={function () { if (validate()) setStep("confirm"); }}
                style={{ padding: "16px", background: COLORS.accent, color: "#0B0B0B", border: "none", fontFamily: "'Cinzel', serif", fontSize: "13px", letterSpacing: "0.15em", cursor: "pointer", fontWeight: 600, transition: "all 0.3s" }}
                onMouseEnter={function (e) { e.currentTarget.style.background = COLORS.accentHover; }}
                onMouseLeave={function (e) { e.currentTarget.style.background = COLORS.accent; }}>確認画面へ</button>
            </div>
          </FadeIn>
        )}
        {step === "confirm" && (
          <FadeIn>
            <p style={{ fontFamily: "'Noto Serif JP', serif", fontSize: "14px", color: COLORS.textSecondary, marginBottom: "24px" }}>以下の内容で送信します。</p>
            <div style={{ padding: "24px", background: COLORS.surface, border: "1px solid " + COLORS.border, marginBottom: "24px" }}>
              {[["種類", getCatLabel()], ["お名前", form.name], ["メール", form.email], ...(form.organization ? [["所属", form.organization]] : []), ["メッセージ", form.message]].map(function (pair) {
                return (
                  <div key={pair[0]} style={{ padding: "12px 0", borderBottom: "1px solid " + COLORS.border, display: "flex", gap: "16px" }}>
                    <span style={{ fontSize: "12px", color: COLORS.textTertiary, minWidth: "80px" }}>{pair[0]}</span>
                    <span style={{ fontSize: "14px", color: COLORS.textPrimary, whiteSpace: "pre-wrap" }}>{pair[1]}</span>
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <button onClick={function () { setStep("details"); }} style={{ flex: 1, padding: "14px", background: "transparent", color: COLORS.textSecondary, border: "1px solid " + COLORS.border, fontSize: "13px", cursor: "pointer" }}>戻る</button>
              <button onClick={function () { setStep("success"); }} style={{ flex: 1, padding: "14px", background: COLORS.accent, color: "#0B0B0B", border: "none", fontFamily: "'Cinzel', serif", fontSize: "13px", letterSpacing: "0.1em", cursor: "pointer", fontWeight: 600 }}>送信する</button>
            </div>
          </FadeIn>
        )}
        {step === "success" && (
          <FadeIn>
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "50%", border: "2px solid " + COLORS.accent, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <h4 style={{ fontSize: "18px", color: COLORS.textPrimary, margin: "0 0 12px" }}>送信が完了しました</h4>
              <p style={{ fontSize: "14px", color: COLORS.textSecondary, lineHeight: 1.7 }}>3〜5営業日以内にご返信いたします。</p>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}

/* ===== FAQ ===== */

function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <section style={{ padding: "clamp(60px, 10vw, 100px) clamp(20px, 5vw, 80px)", background: COLORS.elevated }}>
      <FadeIn><SectionTitle sub="よくあるご質問">FAQ</SectionTitle></FadeIn>
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        {FAQ_LIST.map(function (f, i) {
          return (
            <FadeIn key={i} delay={i * 0.04}>
              <div style={{ borderBottom: "1px solid " + COLORS.border }}>
                <button onClick={function () { setOpenIdx(openIdx === i ? null : i); }}
                  style={{ width: "100%", padding: "20px 0", background: "none", border: "none", color: COLORS.textPrimary, fontFamily: "'Noto Serif JP', serif", fontSize: "14px", textAlign: "left", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
                  <span>{f.q}</span>
                  <span style={{ color: COLORS.accent, fontSize: "18px", flexShrink: 0, transform: openIdx === i ? "rotate(45deg)" : "rotate(0)", transition: "transform 0.3s" }}>+</span>
                </button>
                <div style={{ maxHeight: openIdx === i ? "200px" : "0", overflow: "hidden", transition: "max-height 0.4s ease" }}>
                  <p style={{ fontSize: "13px", color: COLORS.textSecondary, lineHeight: 1.8, padding: "0 0 20px", margin: 0 }}>{f.a}</p>
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}

/* ===== Footer ===== */

function Footer() {
  return (
    <footer style={{ padding: "48px clamp(20px, 5vw, 80px) 32px", borderTop: "1px solid " + COLORS.border }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "32px", marginBottom: "32px" }}>
          <div>
            <img src={SGRIT_LOGO} alt="SGRIT" style={{ height: "50px", width: "auto", marginBottom: "12px", display: "block" }} />
            <div style={{ fontSize: "16px", color: COLORS.textPrimary, letterSpacing: "0.08em", marginBottom: "4px", fontWeight: 700 }}>爆撃竜馬</div>
            <p style={{ fontSize: "12px", color: COLORS.textTertiary, margin: "0 0 16px" }}>株式会社SGRIT</p>
            <SNSBar />
          </div>
          <div style={{ fontSize: "12px", color: COLORS.textTertiary, lineHeight: 1.8, textAlign: "right" }}>
            <p style={{ margin: 0 }}>〒170-0013</p>
            <p style={{ margin: 0 }}>東京都豊島区東池袋1-36-7</p>
            <p style={{ margin: 0 }}>アルテール池袋808</p>
            <p style={{ margin: "4px 0 0", color: COLORS.textSecondary }}>TEL: 03-6820-6291</p>
          </div>
        </div>
        <div style={{ borderTop: "1px solid " + COLORS.border, paddingTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
          <p style={{ fontSize: "10px", color: COLORS.textTertiary, margin: 0 }}>&copy; 2026 SGRIT Inc. All rights reserved.</p>
          <p style={{ fontSize: "10px", color: COLORS.textTertiary, margin: 0 }}>BAKUGEKI RYOMA Official Site</p>
        </div>
      </div>
    </footer>
  );
}

/* ===== Main App ===== */

export default function Home() {
  const [showDetail, setShowDetail] = useState(false);

  function scrollTo(id: string) {
    var el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh", color: COLORS.textPrimary, overflow: "hidden" }}>
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .profile-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
      <Header onNav={scrollTo} />
      <Hero onNav={scrollTo} />
      <Profile showDetail={showDetail} setShowDetail={setShowDetail} />
      <Features />
      <MusicSection />
      <News />
      <About />
      <Contact />
      <FAQSection />
      <Footer />
    </div>
  );
}
