import { Card, CardContent } from '@/components/ui/card';

export function LoadingCard({ title = "Loading..." }) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
        <p className="text-muted-foreground">{title}</p>
      </CardContent>
    </Card>
  );
}

export function LoadingStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {[...Array(4)].map((_, i) => (
        <Card key={i}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <div className="h-4 bg-muted rounded w-20 animate-pulse"></div>
              <div className="h-4 w-4 bg-muted rounded animate-pulse"></div>
            </div>
            <div className="h-8 bg-muted rounded w-24 animate-pulse mb-2"></div>
            <div className="h-3 bg-muted rounded w-16 animate-pulse"></div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function LoadingChartAndList() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <LoadingCard title="Loading chart..." />
      <LoadingCard title="Loading transactions..." />
    </div>
  );
}
