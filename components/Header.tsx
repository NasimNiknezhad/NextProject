import { TbAtom } from 'react-icons/tb';
import MainNavigation from './MainNavigation';

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header__title">
        <TbAtom /> Next
      </div>
      <MainNavigation />
    </header>
  );
}
