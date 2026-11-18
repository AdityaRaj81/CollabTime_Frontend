import { useEffect, useState } from 'react';
import { apiRequest } from '../services/apiClient.js';
import Alert from '../components/ui/Alert.jsx';

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    apiRequest('/dashboard')
      .then((response) => setDashboard(response.data))
      .catch((requestError) => setError(requestError.message));
  }, []);

  if (error) return <Alert>{error}</Alert>;
  if (!dashboard) return <p className="text-neutral-600">Loading your dashboard...</p>;

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-lg">
      <h1 className="text-2xl font-bold">{dashboard.welcomeMessage}</h1>
      <dl className="mt-6 space-y-3 text-sm">
        <div><dt className="font-semibold text-neutral-500">Account type</dt><dd>{dashboard.role}</dd></div>
        <div><dt className="font-semibold text-neutral-500">Account status</dt><dd>{dashboard.accountStatus}</dd></div>
      </dl>
    </section>
  );
}
