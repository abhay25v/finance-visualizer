import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Database, ExternalLink, Terminal } from 'lucide-react';

export function MongoDBSetupGuide() {
  return (
    <Card className="border-blue-200 bg-blue-50/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-700">
          <Database className="h-5 w-5" />
          MongoDB Setup Guide
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-blue-700">
          Currently running in demo mode with in-memory storage. To enable persistent storage with MongoDB:
        </p>
        
        <div className="space-y-3">
          <div className="bg-white p-3 rounded border">
            <h4 className="font-medium text-sm flex items-center gap-2 mb-2">
              <span className="bg-blue-100 text-blue-700 rounded-full px-2 py-1 text-xs">1</span>
              Install MongoDB locally or use MongoDB Atlas
            </h4>
            <p className="text-xs text-gray-600 ml-6">
              For local: Download from{' '}
              <a href="https://www.mongodb.com/try/download/community" target="_blank" rel="noopener noreferrer" 
                 className="text-blue-600 hover:underline inline-flex items-center gap-1">
                mongodb.com <ExternalLink className="h-3 w-3" />
              </a>
            </p>
          </div>
          
          <div className="bg-white p-3 rounded border">
            <h4 className="font-medium text-sm flex items-center gap-2 mb-2">
              <span className="bg-blue-100 text-blue-700 rounded-full px-2 py-1 text-xs">2</span>
              Update your .env.local file
            </h4>
            <div className="bg-gray-100 p-2 rounded text-xs font-mono ml-6">
              <div className="flex items-center gap-2 mb-1">
                <Terminal className="h-3 w-3" />
                .env.local
              </div>
              <code>MONGODB_URI=mongodb://localhost:27017/finance-tracker</code>
            </div>
          </div>
          
          <div className="bg-white p-3 rounded border">
            <h4 className="font-medium text-sm flex items-center gap-2 mb-2">
              <span className="bg-blue-100 text-blue-700 rounded-full px-2 py-1 text-xs">3</span>
              Restart the development server
            </h4>
            <div className="bg-gray-100 p-2 rounded text-xs font-mono ml-6">
              <div className="flex items-center gap-2 mb-1">
                <Terminal className="h-3 w-3" />
                Terminal
              </div>
              <code>npm run dev</code>
            </div>
          </div>
        </div>
        
        <p className="text-xs text-blue-600 bg-blue-100 p-2 rounded">
          💡 Your current data will be migrated automatically when MongoDB is connected!
        </p>
      </CardContent>
    </Card>
  );
}
