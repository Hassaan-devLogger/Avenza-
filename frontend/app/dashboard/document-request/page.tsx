'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { applicationsApi } from '../../../lib/api';

const DOCUMENT_TYPES = [
  'Birth Certificate',
  'Death Certificate',
  'Marriage Certificate',
  'Domicile Certificate',
  'Character Certificate',
  'CNIC Attestation',
  'Affidavit',
  'Other',
];

export default function DocumentRequestPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    documentType: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.documentType) { setError('Please select a document type.'); return; }
    setError('');
    setLoading(true);
    try {
      const res = await applicationsApi.create({
        type: 'document_request',
        title: `${form.documentType} Request`,
        description: form.description,
        documentType: form.documentType,
      });
      setSuccess(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="p-8 max-w-2xl mx-auto">
        <div className="card p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Request Submitted!</h2>
          <p className="text-slate-500 text-sm mb-6">
            Your document request has been received. You'll be notified of any updates.
          </p>
          <div className="bg-slate-50 rounded-xl p-5 mb-6 text-left space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Reference Number</span>
              <span className="font-semibold text-slate-900 font-mono">{success.referenceNumber}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Document Type</span>
              <span className="font-medium text-slate-900">{success.documentType}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Status</span>
              <span className="text-amber-600 font-medium">Pending Review</span>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => { setSuccess(null); setForm({ documentType: '', description: '' }); }}
              className="btn-secondary flex-1"
            >
              New Request
            </button>
            <button onClick={() => router.push('/dashboard')} className="btn-primary flex-1">
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-slate-900">Document Request</h1>
        <p className="text-slate-500 text-sm mt-1">
          Submit a request for an official government document.
        </p>
      </div>

      <div className="card p-6">
        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-5 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Document Type <span className="text-red-500">*</span>
            </label>
            <select
              value={form.documentType}
              onChange={(e) => setForm((f) => ({ ...f, documentType: e.target.value }))}
              className="input-field"
              required
            >
              <option value="">Select document type...</option>
              {DOCUMENT_TYPES.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Additional Details
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Provide any additional context or requirements..."
              rows={4}
              className="input-field resize-none"
            />
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
            <FileText className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div className="text-sm text-blue-700">
              <p className="font-medium mb-1">Processing Information</p>
              <ul className="text-blue-600 space-y-0.5 text-xs">
                <li>• Standard processing time: 3–5 working days</li>
                <li>• You'll receive a reference number upon submission</li>
                <li>• Track status from your dashboard</li>
              </ul>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => router.push('/dashboard')}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary flex-1" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
