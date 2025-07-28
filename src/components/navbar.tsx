import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useStore } from '../store/Store';
import { Home, Users, Heart, Menu, X } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';
import { useState } from 'react';

function NavigationBar() {
  const { favorites, favoritePosts } = useStore();
  const totalFavorites = favorites.length + favoritePosts.length;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <nav className="bg-background border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
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
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Button variant="ghost" asChild className="w-full justify-start">
                <Link to="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                  <Home size={18} />
                  Home
                </Link>
              </Button>
              
              <Button variant="ghost" asChild className="w-full justify-start">
                <Link to="/users" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                  <Users size={18} />
                  Users
                </Link>
              </Button>
              
              <Button variant="ghost" asChild className="w-full justify-start">
                <Link to="/favorites" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
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
        )}
      </div>
    </nav>
  );
}

export default NavigationBar; 