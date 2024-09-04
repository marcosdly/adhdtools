import './page-layout.scss';

export default function PageLayout({ children }) {
  return (
    <div id="page-layout-container">
      <div id="page-layout">{children}</div>
    </div>
  );
}
