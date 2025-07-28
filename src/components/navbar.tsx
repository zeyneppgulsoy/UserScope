import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useStore } from '../store/Store';
import { Home, Users, Heart } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';

function NavigationBar() {
  const { favorites, favoritePosts } = useStore();
  const totalFavorites = favorites.length + favoritePosts.length;
  
  return (
    <nav className="bg-background border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
                         <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
               UserScope
             </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Button variant="ghost" asChild>
                <Link to="/" className="flex items-center gap-2">
                  <Home size={18} />
                  Home
                </Link>
              </Button>
              
              <Button variant="ghost" asChild>
                <Link to="/users" className="flex items-center gap-2">
                  <Users size={18} />
                  Users
                </Link>
              </Button>
              
              <Button variant="ghost" asChild>
                <Link to="/favorites" className="flex items-center gap-2">
                  <Heart size={18} />
                                     Favorites {totalFavorites > 0 && (
                     <span className="bg-destructive text-destructive-foreground text-xs rounded-full px-2 py-1 ml-1">
                       {totalFavorites}
                     </span>
                   )}
                </Link>
              </Button>
            </div>
          </div>

          {/* Right side items */}
          <div className="flex items-center gap-2">
            {/* Dark mode toggle */}
            <ModeToggle />
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar; 