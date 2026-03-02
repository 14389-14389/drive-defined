import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/context/AdminContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Car,
  Users,
  TrendingUp,
  DollarSign,
  PlusCircle,
  Eye,
  Loader2,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { fetchVehicles, Vehicle } from "@/services/api";

const AdminDashboard: React.FC = () => {
  const { currentUser } = useAdmin();
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    setLoading(true);
    const data = await fetchVehicles();
    setVehicles(data);
    setLoading(false);
  };

  const stats = {
    totalVehicles: vehicles.length,
    availableVehicles: vehicles.filter(v => v.status === 'available').length,
    soldVehicles: vehicles.filter(v => v.status === 'sold').length,
    featuredVehicles: vehicles.filter(v => v.isFeatured).length
  };

  const recentVehicles = vehicles.slice(0, 5);

  const StatCard = ({ title, value, icon: Icon, trend, trendValue }: any) => (
    <Card className="h-full">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs sm:text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-xl sm:text-2xl font-bold mt-1 sm:mt-2">{value}</h3>
            {trend && (
              <div className="flex items-center gap-1 mt-1 sm:mt-2">
                {trend === "up" ? (
                  <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 sm:h-4 sm:w-4 text-red-600" />
                )}
                <span className={cn("text-xs", trend === "up" ? "text-green-600" : "text-red-600")}>
                  {trendValue}
                </span>
              </div>
            )}
          </div>
          <div className="p-2 sm:p-3 bg-blue-100 rounded-lg">
            <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-900" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-900" />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Welcome back, {currentUser?.name || 'Admin'}</h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Here's what's happening with your dealership today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard title="Total Vehicles" value={stats.totalVehicles} icon={Car} trend="up" trendValue="12%" />
        <StatCard title="Available" value={stats.availableVehicles} icon={TrendingUp} />
        <StatCard title="Sold" value={stats.soldVehicles} icon={DollarSign} trend="up" trendValue="8%" />
        <StatCard title="Featured" value={stats.featuredVehicles} icon={Eye} />
      </div>

      {/* Quick Actions and Recent Vehicles */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 sm:gap-6">
        {/* Quick Actions */}
        <Card className="lg:col-span-2">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">Quick Actions</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0 space-y-2">
            <Button variant="outline" className="w-full justify-start text-sm" onClick={() => navigate("/admin/vehicles/add")}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Vehicle
            </Button>
            <Button variant="outline" className="w-full justify-start text-sm" onClick={() => navigate("/admin/vehicles")}>
              <Car className="mr-2 h-4 w-4" />
              Manage Inventory
            </Button>
            <Button variant="outline" className="w-full justify-start text-sm" onClick={() => navigate("/admin/users")}>
              <Users className="mr-2 h-4 w-4" />
              Manage Users
            </Button>
          </CardContent>
        </Card>

        {/* Recent Vehicles */}
        <Card className="lg:col-span-5">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">Recent Vehicles</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Latest additions to your inventory</CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
            {/* Horizontal scroll on small screens */}
            <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap">Vehicle</TableHead>
                    <TableHead className="whitespace-nowrap">Stock #</TableHead>
                    <TableHead className="whitespace-nowrap">Price</TableHead>
                    <TableHead className="whitespace-nowrap">Status</TableHead>
                    <TableHead className="text-right whitespace-nowrap">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentVehicles.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        No vehicles found. Click "Add New Vehicle" to get started.
                      </TableCell>
                    </TableRow>
                  ) : (
                    recentVehicles.map((vehicle) => (
                      <TableRow key={vehicle._id}>
                        <TableCell className="font-medium whitespace-nowrap">
                          {vehicle.year} {vehicle.make} {vehicle.model}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">{vehicle.stockNumber}</TableCell>
                        <TableCell className="whitespace-nowrap">KSh {vehicle.price.toLocaleString()}</TableCell>
                        <TableCell className="whitespace-nowrap">
                          <Badge variant={vehicle.status === "sold" ? "destructive" : "default"}>
                            {vehicle.status || "available"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right whitespace-nowrap">
                          <Button variant="ghost" size="sm" onClick={() => navigate(`/admin/vehicles/edit/${vehicle._id}`)}>
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;