import { v4 as uuidv4 } from 'uuid';
import { useRoute } from 'preact-iso';
import './navbar.scss';

/**
 * @typedef Link
 * @property {string} icon Icon identifier
 * @property {string} desc Descriptive single word/sentence
 * @property {string} href URL to go
 */

/**
 * @typedef {Object} NavbarProps
 * @property {Link[]} links
 */

/**
 * @param {NavbarProps}
 */
export default function Navbar({ links }) {
  const routePath = useRoute().path;

  return (
    <nav className="navbar">
      {links.map(({ icon, desc, href }) => (
        <a
          key={uuidv4()}
          href={href}
          className={`link ${routePath === href ? 'active' : ''}`}
        >
          <i class={`fi ${icon}`}></i>
          <p>{desc}</p>
        </a>
      ))}
    </nav>
  );
}
