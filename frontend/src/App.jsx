import { useAnalyze } from "./hooks/useAnalyze.js";
import ImageDropzone from "./components/ImageDropzone.jsx";
import AnalysisCard from "./components/AnalysisCard.jsx";
import styles from "./App.module.css";

export default function App() {
  const { result, loading, error, preview, analyze, reset } = useAnalyze();

  return (
    <div className={styles.app}>
      {/* Decorative vertical lines */}
      <div className={styles.lineBg} aria-hidden="true" />

      <main className={styles.main}>
        {/* Masthead */}
        <header className={styles.masthead}>
          <div className={styles.mastheadTop}>
            <span className={styles.vol}>Vol. I</span>
            <span className={styles.mastheadTitle}>PORTRAIT INTELLIGENCE</span>
            <span className={styles.vol}>Est. 2025</span>
          </div>
          <div className={styles.mastheadRule} />
          <h1 className={styles.headline}>
            Age &amp; Style
            <br />
            <em>Estimator</em>
          </h1>
          <p className={styles.deck}>
            Upload a portrait. Receive a full editorial analysis — age range, emotional
            mood, art style lineage, colour palette, and your visual twin in art history.
          </p>
          <div className={styles.mastheadRule} />
        </header>

        {/* Upload zone — shown when no result and not loading */}
        {!result && (
          <section className={styles.uploadSection}>
            <ImageDropzone onFile={analyze} loading={loading} />

            {error && (
              <div className={styles.errorBox}>
                <span className={styles.errorIcon}>⚠</span>
                <span>{error}</span>
              </div>
            )}

            {!loading && (
              <p className={styles.disclaimer}>
                Images are analyzed in memory and never stored on our servers.
              </p>
            )}
          </section>
        )}

        {/* Result */}
        {result && preview && (
          <section className={styles.resultSection}>
            <AnalysisCard result={result} preview={preview} onReset={reset} />
          </section>
        )}
      </main>

      <footer className={styles.footer}>
        <span>Age &amp; Style Estimator</span>
        <span className={styles.footerSep}>·</span>
        <span>Powered by Claude Vision</span>
        <span className={styles.footerSep}>·</span>
        <span>AI may be imprecise — for entertainment only</span>
      </footer>
    </div>
  );
}
