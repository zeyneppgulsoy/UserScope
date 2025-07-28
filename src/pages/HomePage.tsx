import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { Users, Heart, Database, ArrowRight } from "lucide-react"

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:via-slate-900 dark:to-blue-900 transition-colors duration-300">
      {/* Hero Section */}
             <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent mb-6">
            UserScope
          </h1>
          <p className="text-xl text-gray-600 dark:text-blue-200 mb-2 max-w-2xl mx-auto">
            Advanced JSON Placeholder API Interface
          </p>
          <p className="text-gray-500 dark:text-blue-300 mb-8 max-w-xl mx-auto">
            Explore users, manage favorites, and interact with posts, albums, and todos in a beautiful, modern interface.
          </p>
          
                     <div className="flex gap-4 justify-center">
             <Button size="lg" asChild className="dark:bg-blue-600 dark:hover:bg-blue-700">
               <Link to="/users" className="flex items-center gap-2">
                 <Users size={20} />
                 Explore Users
                 <ArrowRight size={16} />
               </Link>
             </Button>
             <Button variant="outline" size="lg" asChild className="dark:bg-blue-600 dark:text-white dark:border-blue-600 dark:hover:bg-blue-700">
               <Link to="/favorites" className="flex items-center gap-2">
                 <Heart size={20} />
                 View Favorites
               </Link>
             </Button>
           </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm dark:border dark:border-blue-700/50">
            <CardHeader className="text-center">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
                             <CardTitle className="text-xl dark:text-blue-100">User Management</CardTitle>
               <CardDescription className="dark:text-blue-200">
                 Browse through user profiles, view their posts, albums, and todos with detailed information.
               </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm dark:border dark:border-blue-700/50">
            <CardHeader className="text-center">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 dark:from-purple-400 dark:to-purple-500 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Heart className="h-8 w-8 text-white" />
              </div>
                             <CardTitle className="text-xl dark:text-blue-100">Favorites System</CardTitle>
               <CardDescription className="dark:text-blue-200">
                 Save your favorite posts and photos to access them quickly later with our intuitive favorites system.
               </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm dark:border dark:border-blue-700/50">
            <CardHeader className="text-center">
              <div className="p-3 bg-gradient-to-r from-indigo-500 to-indigo-600 dark:from-indigo-400 dark:to-indigo-500 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Database className="h-8 w-8 text-white" />
              </div>
                             <CardTitle className="text-xl dark:text-blue-100">Rich Data</CardTitle>
               <CardDescription className="dark:text-blue-200">
                 Access comprehensive data including posts, albums, photos, and todos from the JSON Placeholder API.
               </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
