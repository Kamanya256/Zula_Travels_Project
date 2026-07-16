import StatCard from "./StatCard";


interface Stats {

  total_users: number;

  active_users: number;

  customers: number;

  vendors: number;

  admins: number;

}



interface Props {

  stats: Stats;

}



export default function DashboardOverview({
  stats
}: Props) {


  return (

    <div className="grid md:grid-cols-5 gap-6">


      <StatCard

        title="Total Users"

        value={stats.total_users}

      />



      <StatCard

        title="Active Users"

        value={stats.active_users}

      />



      <StatCard

        title="Customers"

        value={stats.customers}

      />



      <StatCard

        title="Vendors"

        value={stats.vendors}

      />



      <StatCard

        title="Admins"

        value={stats.admins}

      />



    </div>


  );


}