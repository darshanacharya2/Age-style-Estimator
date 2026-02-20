import { useState, useRef, useCallback } from "react";
import styles from "./ImageDropzone.module.css";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE_MB = 5;

export default function ImageDropzone({ onFile, loading }) {
  const [dragging, setDragging] = useState(false);
  const [validationError, setValidationError] = useState(null);
  const inputRef = useRef(null);

  const validate = (file) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return "Unsupported format. Please use JPEG, PNG, WebP, or GIF.";
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      return `File too large. Maximum size is ${MAX_SIZE_MB}MB.`;
    }
    return null;
  };

  const handleFile = useCallback(
    (file) => {
      const err = validate(file);
      if (err) {
        setValidationError(err);
        return;
      }
      setValidationError(null);
      onFile(file);
    },
    [onFile]
  );

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const onDragOver = (e) => { e.preventDefault(); setDragging(true); };
  const onDragLeave = () => setDragging(false);
  const onInputChange = (e) => { if (e.target.files[0]) handleFile(e.target.files[0]); };
  const onClick = () => { if (!loading) inputRef.current?.click(); };

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.zone} ${dragging ? styles.dragging : ""} ${loading ? styles.loading : ""}`}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onClick={onClick}
        role="button"
        tabIndex={0}
        aria-label="Upload portrait image"
        onKeyDown={(e) => e.key === "Enter" && onClick()}
      >
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_TYPES.join(",")}
          onChange={onInputChange}
          className={styles.hiddenInput}
          disabled={loading}
        />

        {loading ? (
          <div className={styles.loadingState}>
            <div className={styles.spinner} />
            <p className={styles.loadingText}>Reading the portrait...</p>
            <p className={styles.loadingSubtext}>Analyzing age, mood & style</p>
          </div>
        ) : (
          <div className={styles.idle}>
            <div className={styles.iconFrame}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="28" height="28" rx="2" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2"/>
                <circle cx="16" cy="13" r="4" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M6 26c0-4 4.5-7 10-7s10 3 10 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <p className={styles.mainText}>Drop a portrait here</p>
            <p className={styles.subText}>or <span className={styles.link}>browse files</span></p>
            <p className={styles.hint}>JPEG · PNG · WebP · GIF · max 5MB</p>
          </div>
        )}
      </div>

      {validationError && (
        <p className={styles.error}>{validationError}</p>
      )}
    </div>
  );
}
