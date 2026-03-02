
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
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-2">{value}</h3>
            {trend && (
              <div className="flex items-center gap-1 mt-2">
                {trend === "up" ? (
                  <ArrowUpRight className="h-4 w-4 text-green-600" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-600" />
                )}
                <span
                  className={cn(
                    "text-xs",
                    trend === "up" ? "text-green-600" : "text-red-600"
                  )}
                >
                  {trendValue} from last month
                </span>
              </div>
            )}
          </div>
          <div className="p-3 bg-blue-100 rounded-lg">
            <Icon className="h-6 w-6 text-blue-900" />
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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {currentUser?.name || 'Admin'}</h1>
        <p className="text-muted-foreground mt-1">
          Here's what's happening with your dealership today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Vehicles"
          value={stats.totalVehicles}
          icon={Car}
          trend="up"
          trendValue="12%"
        />
        <StatCard
          title="Available"
          value={stats.availableVehicles}
          icon={TrendingUp}
        />
        <StatCard
          title="Sold"
          value={stats.soldVehicles}
          icon={DollarSign}
          trend="up"
          trendValue="8%"
        />
        <StatCard
          title="Featured"
          value={stats.featuredVehicles}
          icon={Eye}
        />
      </div>

      {/* Quick Actions and Recent Vehicles */}
      <div className="grid gap-6 md:grid-cols-7">
        {/* Quick Actions */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => navigate("/admin/vehicles/add")}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Vehicle
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => navigate("/admin/vehicles")}
            >
              <Car className="mr-2 h-4 w-4" />
              Manage Inventory
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => navigate("/admin/users")}
            >
              <Users className="mr-2 h-4 w-4" />
              Manage Users
            </Button>
          </CardContent>
        </Card>

        {/* Recent Vehicles */}
        <Card className="md:col-span-5">
          <CardHeader>
            <CardTitle>Recent Vehicles</CardTitle>
            <CardDescription>
              Latest additions to your inventory
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Stock #</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
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
                      <TableCell className="font-medium">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </TableCell>
                      <TableCell>{vehicle.stockNumber}</TableCell>
                      <TableCell>R {vehicle.price.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge
                          variant={vehicle.status === "sold" ? "destructive" : "default"}
                        >
                          {vehicle.status || "available"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/admin/vehicles/edit/${vehicle._id}`)}
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
