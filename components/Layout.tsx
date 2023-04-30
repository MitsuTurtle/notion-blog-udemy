import { ReactNode } from 'react';
import Navbar from './Navbar/Navbar';
interface Props {
  children?: ReactNode; // any props that come into the component
}
const Layout = ({ children }: Props) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
