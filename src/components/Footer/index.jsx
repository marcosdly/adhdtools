import { useEffect, useReducer, useState } from 'preact/hooks';
import { v4 as uuidv4 } from 'uuid';
import './footer.scss';

const colors = ['comforting', 'calm', 'peaceful', 'confident'];

/**
 * @typedef ColorButtonProps
 * @property {string} name
 */

function ColorSwap() {
  const [color, setColor] = useState('comforting');

  useEffect(() => (document.body.className = `color-${color}`), [color]);

  return (
    <nav className="colorscheme-swap">
      {colors.map((scheme) => (
        <button
          key={uuidv4()}
          type="button"
          className={color === scheme ? 'active' : ''}
          onClick={(ev) => {
            ev.preventDefault();
            setColor(scheme);
          }}
        >
          {scheme}
        </button>
      ))}
    </nav>
  );
}

function Donate() {
  return (
    <button type="button">
      <i class="fi fi-rr-heart-partner-handshake"></i> donate
    </button>
  );
}

function AllowAds() {
  const [active, toggle] = useReducer((state) => !state, false);
  // thumbs up, thumbs down
  const icon = active ? 'fi-rr-social-network' : 'fi-rr-hand';

  return (
    <button className={`${active ? 'active' : ''}`} onClick={toggle} type="button">
      <i className={`fi ${icon}`}></i>
      <span>ads</span>
    </button>
  );
}

export default function Footer() {
  return (
    <div id="page-footer">
      <p className="care-notice">
        <span>Made with</span>
        <i className="fi fi-rr-heart"></i>
        <span>by</span>
        <a href="https://github.com/marcosdly/adhdtools">marcosdly</a>
      </p>
      <nav className="help-buttons">
        <Donate />
        <AllowAds />
      </nav>
      <ColorSwap />
    </div>
  );
}
