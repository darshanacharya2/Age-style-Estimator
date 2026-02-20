import styles from "./AnalysisCard.module.css";

export default function AnalysisCard({ result, preview, onReset }) {
  const {
    ageRange,
    mood,
    moodDescription,
    vibes,
    artStyles,
    palette,
    paletteNames,
    visualTwin,
    era,
    oneLiner,
    lightingMood,
    confidence,
  } = result;

  const confidencePct = Math.round((confidence || 0.85) * 100);

  return (
    <article className={styles.card}>
      {/* Top strip with issue label */}
      <div className={styles.issueStrip}>
        <span className={styles.issueLabel}>PORTRAIT ANALYSIS</span>
        <span className={styles.issueSep}>—</span>
        <span className={styles.issueDate}>AI EDITION</span>
        <span className={styles.confidencePill}>
          {confidencePct}% confidence
        </span>
      </div>

      {/* Main layout: image + primary data */}
      <div className={styles.main}>
        {/* Portrait */}
        <div className={styles.portraitWrap}>
          <img src={preview} alt="Analyzed portrait" className={styles.portrait} />
          {/* Colour palette overlay at bottom of image */}
          {palette && (
            <div className={styles.paletteStrip}>
              {palette.map((hex, i) => (
                <div
                  key={i}
                  className={styles.paletteBlock}
                  style={{ background: hex }}
                  title={paletteNames?.[i] || hex}
                />
              ))}
            </div>
          )}
        </div>

        {/* Primary facts */}
        <div className={styles.facts}>
          {/* One-liner headline */}
          <p className={styles.oneLiner}>&ldquo;{oneLiner}&rdquo;</p>

          {/* Age + mood row */}
          <div className={styles.statRow}>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Age Range</span>
              <span className={styles.statValue}>{ageRange}</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statLabel}>Mood</span>
              <span className={styles.statValue}>{mood}</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statLabel}>Lighting</span>
              <span className={styles.statValue}>{lightingMood}</span>
            </div>
          </div>

          {/* Mood description */}
          <p className={styles.moodDesc}>{moodDescription}</p>

          {/* Vibe tags */}
          <div className={styles.section}>
            <span className={styles.sectionLabel}>Energy Tags</span>
            <div className={styles.tags}>
              {vibes?.map((v, i) => (
                <span key={i} className={styles.tag}>{v}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className={styles.rule} />

      {/* Lower section */}
      <div className={styles.lower}>
        {/* Art styles */}
        <div className={styles.lowerBlock}>
          <span className={styles.sectionLabel}>Art Styles</span>
          <ul className={styles.styleList}>
            {artStyles?.map((s, i) => (
              <li key={i} className={styles.styleItem}>
                <span className={styles.styleBullet}>◆</span> {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Divider */}
        <div className={styles.vertRule} />

        {/* Visual twin + era */}
        <div className={styles.lowerBlock}>
          <div className={styles.twinBlock}>
            <span className={styles.sectionLabel}>Visual Twin</span>
            <p className={styles.twinValue}>{visualTwin}</p>
          </div>
          <div className={styles.eraBlock}>
            <span className={styles.sectionLabel}>Era Energy</span>
            <p className={styles.eraValue}>{era}</p>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.vertRule} />

        {/* Colour palette */}
        <div className={styles.lowerBlock}>
          <span className={styles.sectionLabel}>Colour Palette</span>
          <div className={styles.paletteList}>
            {palette?.map((hex, i) => (
              <div key={i} className={styles.paletteRow}>
                <div className={styles.swatch} style={{ background: hex }} />
                <div className={styles.swatchInfo}>
                  <span className={styles.swatchName}>{paletteNames?.[i] || "—"}</span>
                  <span className={styles.swatchHex}>{hex}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <button className={styles.resetBtn} onClick={onReset}>
          ← Analyze another portrait
        </button>
        <span className={styles.footerNote}>Powered by Claude Vision AI</span>
      </div>
    </article>
  );
}
