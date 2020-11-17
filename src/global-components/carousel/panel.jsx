export default function Panel({ meta, children }) {
  return (
    <div className={`panel ${meta.side}`} onClick={meta.fn}>
      {children}
    </div>
  );
}
