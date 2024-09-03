import './page-layout.scss';

export default function PageLayout({ children }) {
  return (
    <div id="page-layout-container" className="color-comforting">
      <div id="page-layout">{children}</div>
    </div>
  );
}
