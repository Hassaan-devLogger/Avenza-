import Link from 'next/link';
import { FileText, Shield, Clock, ChevronRight, Building2 } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-slate-100 bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 leading-none">Citizen Portal</p>
              <p className="text-xs text-slate-500 mt-0.5">DESC Mardan</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-slate-600 hover:text-blue-700 font-medium transition-colors">
              Sign In
            </Link>
            <Link href="/register" className="btn-primary text-sm py-2 px-4">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white pt-20 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
            <Shield className="w-3.5 h-3.5" />
            Digital Innovation Center — Mardan
          </div>
          <h1 className="text-5xl font-bold text-slate-900 leading-tight mb-6">
            Government Services,<br />
            <span className="text-blue-700">Simplified.</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-10">
            Access Mardan's citizen services online. Submit document requests,
            track your applications, and stay informed — all in one place.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/register" className="btn-primary inline-flex items-center gap-2">
              Create Account
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link href="/login" className="btn-secondary">
              Already registered? Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-3">Available Services</h2>
        <p className="text-slate-500 text-center mb-12">Apply online, track progress, receive updates.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <FileText className="w-6 h-6 text-blue-600" />,
              title: 'Document Requests',
              desc: 'Birth certificates, CNIC attestations, domicile certificates, and more.',
              color: 'bg-blue-50',
            },
            {
              icon: <Building2 className="w-6 h-6 text-green-600" />,
              title: 'Permits & Licenses',
              desc: 'Business registrations, construction permits, and trade licenses.',
              color: 'bg-green-50',
            },
            {
              icon: <Shield className="w-6 h-6 text-purple-600" />,
              title: 'Complaints & Feedback',
              desc: 'Submit public grievances and track resolution status.',
              color: 'bg-purple-50',
            },
          ].map((s) => (
            <div key={s.title} className="card p-6 hover:shadow-md transition-shadow">
              <div className={`w-12 h-12 ${s.color} rounded-xl flex items-center justify-center mb-4`}>
                {s.icon}
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">{s.title}</h3>
              <p className="text-sm text-slate-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats banner */}
      <section className="bg-blue-700 py-14 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          {[
            { num: '50,000+', label: 'Citizens Served' },
            { num: '99.9%', label: 'Uptime SLA' },
            { num: '<24h', label: 'Avg. Processing Time' },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-bold text-white mb-1">{s.num}</p>
              <p className="text-blue-200 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400">
            © 2025 DESC Mardan. Digital Innovation Center.
          </p>
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            Office hours: Mon–Fri, 9:00 AM – 5:00 PM PKT
          </div>
        </div>
      </footer>
    </div>
  );
}
