import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaGitAlt,
  FaAward,
  FaVuejs,
  FaAngular,
  FaDocker,
  FaAws,
  FaFigma,
} from "react-icons/fa";
import {
  SiJavascript,
  SiTypescript,
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  SiNextdotjs,
  SiRedux,
  SiFirebase,
  SiPostman,
  SiGraphql,
  SiPostgresql,
  SiMysql,
  SiPrisma,
  SiSupabase,
  SiVercel,
  SiVite,
  SiVitest,
  SiJest,
  SiWebpack,
  SiNestjs,
  SiDjango,
  SiFastapi,
} from "react-icons/si";
import {
  FiCode,
  FiLayout,
  FiServer,
  FiZap,
  FiDatabase,
  FiCloud,
} from "react-icons/fi";
import {
  TbBrandReact,
  TbBrandNodejs,
  TbBrandDocker,
  TbBrandAws,
} from "react-icons/tb";

/**
 * Central icon registry.
 * Keys are the string names stored in the database.
 * Values are the actual React components.
 *
 * To add more: import the icon above and add an entry here.
 */
const SKILL_ICON_MAP = {
  // React family
  FaReact,
  TbBrandReact,

  // Node / Backend
  FaNodeJs,
  TbBrandNodejs,
  SiExpress,
  SiNestjs,

  // Languages
  SiJavascript,
  SiTypescript,
  FaPython,
  SiDjango,
  SiFastapi,

  // Databases
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiFirebase,
  SiPrisma,
  SiSupabase,
  FiDatabase,

  // CSS / Styling
  SiTailwindcss,

  // Frontend frameworks
  SiNextdotjs,
  FaVuejs,
  FaAngular,

  // State management
  SiRedux,

  // Tooling
  FaGitAlt,
  SiPostman,
  SiGraphql,
  SiVite,
  SiVitest,
  SiJest,
  SiWebpack,
  FaFigma,

  // Infra / Cloud
  FaDocker,
  TbBrandDocker,
  FaAws,
  TbBrandAws,
  SiVercel,
  FiCloud,

  // Awards
  FaAward,

  // Fallbacks
  FiCode,
  FiLayout,
  FiServer,
  FiZap,
};

/**
 * Resolve an icon string (from DB) → React component.
 * Falls back to FiCode if the name isn't registered.
 */
export const resolveIcon = (name) => SKILL_ICON_MAP[name] ?? FiCode;

export default SKILL_ICON_MAP;
