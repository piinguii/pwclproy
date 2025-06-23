import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children, onSearch }) => (
  <div className="flex min-h-screen bg-gray-50">
    <Sidebar />
    <div className="flex-1 flex flex-col ml-64">
      <Navbar onSearch={onSearch} />
      <main className="flex-1 p-6">{children}</main>
      <Footer />
    </div>
  </div>
);

export default Layout;
