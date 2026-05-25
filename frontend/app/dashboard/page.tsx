'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FileText, Clock, CheckCircle, XCircle, Plus, ArrowRight } from 'lucide-react';
import { useAuth } from '../../lib/auth';
import { applicationsApi } from '../../lib/api';

const statusConfig: Record<string, { label: string; cls: string }> = {
  pending:      { label: 'Pending',      cls: 'status-pending' },
  under_review: { label: 'Under Review', cls: 'status-under_review' },
  approved:     { label: 'Approved',     cls: 'status-approved' },
  rejected:     { label: 'Rejected',     cls: 'status-rejected' },
};

export default function DashboardPage() {
  const { user } = useAuth();
  const [applications, setApplications] = useState<any[]>([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([applicationsApi.list(), applicationsApi.stats()])
      .then(([apps, s]) => {
        setApplications(apps.data.slice(0, 5));
        setStats(s.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Good day, {user?.fullName?.split(' ')[0]} 👋
        </h1>
        <p className="text-slate-500 mt-1 text-sm">Here's your service activity overview.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Applications', value: stats.total, icon: FileText, color: 'text-blue-600 bg-blue-50' },
          { label: 'Pending',            value: stats.pending, icon: Clock,    color: 'text-amber-600 bg-amber-50' },
          { label: 'Approved',           value: stats.approved, icon: CheckCircle, color: 'text-green-600 bg-green-50' },
          { label: 'Rejected',           value: stats.rejected, icon: XCircle, color: 'text-red-600 bg-red-50' },
        ].map((s) => (
          <div key={s.label} className="card p-5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
              <s.icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-slate-900">{loading ? '—' : s.value}</p>
            <p className="text-xs text-slate-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-blue-700 rounded-xl p-6 mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white mb-1">Need a document?</h2>
          <p className="text-blue-200 text-sm">Submit a new document request online.</p>
        </div>
        <Link
          href="/dashboard/document-request"
          className="inline-flex items-center gap-2 bg-white text-blue-700 font-medium text-sm px-4 py-2.5 rounded-lg hover:bg-blue-50 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Request
        </Link>
      </div>

      {/* Recent Applications */}
      <div className="card overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-semibold text-slate-900">Recent Applications</h2>
          <span className="text-xs text-slate-400">{applications.length} records</span>
        </div>

        {loading ? (
          <div className="px-6 py-12 text-center text-sm text-slate-400">Loading...</div>
        ) : applications.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <FileText className="w-10 h-10 text-slate-200 mx-auto mb-3" />
            <p className="text-slate-500 text-sm font-medium">No applications yet</p>
            <p className="text-slate-400 text-xs mt-1">Submit your first document request to get started.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {applications.map((app) => {
              const s = statusConfig[app.status] || { label: app.status, cls: '' };
              return (
                <div key={app.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{app.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5">Ref: {app.referenceNumber}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${s.cls}`}>
                      {s.label}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-300" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
